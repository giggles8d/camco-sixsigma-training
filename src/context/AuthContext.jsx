import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

const STORAGE_KEY = 'training_portal_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check URL for hub auto-login parameter first
    const params = new URLSearchParams(window.location.search);
    const hubName = params.get('name');
    if (hubName) {
      // Clear any existing session so hub name takes precedence
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    // Otherwise restore from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hubName = params.get('name');

    if (hubName) {
      // Auto-login from hub — look up employee by name, don't upsert
      const autoLogin = async () => {
        const name = decodeURIComponent(hubName);
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .eq('name', name)
          .single();

        if (error || !data) {
          // Not found in DB — still let them in with name only
          console.warn('Auto-login: employee not found in DB, using name only:', name);
          setUser({ name, role: 'employee', loginTime: new Date().toISOString() });
        } else {
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            department: data.department,
            role: 'employee',
            loginTime: new Date().toISOString()
          });
        }
        // Clean the URL so name param doesn't persist on refresh
        window.history.replaceState({}, '', window.location.pathname);
        setReady(true);
      };
      autoLogin();
    } else {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (name) => {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('name', name)
      .single();

    if (error || !data) {
      console.error('Supabase login error:', error);
      setUser({ name, role: 'employee', loginTime: new Date().toISOString() });
      return;
    }

    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      department: data.department,
      role: 'employee',
      loginTime: new Date().toISOString()
    });
  };

  const adminLogin = (password) => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (password !== adminPassword) {
      return { error: 'Invalid admin password' };
    }
    setUser({ name: 'Admin', role: 'admin', loginTime: new Date().toISOString() });
    return { error: null };
  };

  const logout = () => setUser(null);

  // Don't render children until auto-login check is complete
  if (!ready) return null;

  return (
    <AuthContext.Provider value={{ user, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
