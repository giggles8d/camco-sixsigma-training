import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-login if coming from the hub with a name parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hubName = params.get('name');
    if (hubName) {
      const autoLogin = async () => {
        setLoading(true);
        await login(decodeURIComponent(hubName));
        setLoading(false);
        navigate('/');
      };
      autoLogin();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      setLoading(true);
      await login(name.trim());
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <h1>Quality Manager Training Portal</h1>
            <p>Loading your training dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Quality Manager Training Portal</h1>
          <p>Manufacturing Quality Manager Comprehensive Training Program</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="admin-back-link">
          <Link to="/admin/login">Admin Login</Link>
        </div>
      </div>
    </div>
  );
}
