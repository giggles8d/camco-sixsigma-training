import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import ModuleView from './pages/ModuleView';
import Quiz from './pages/Quiz';
import Glossary from './pages/Glossary';
import './App.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/admin/login" />;
  if (user.role !== 'admin') return <Navigate to="/" />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={user && user.role !== 'admin' ? <Navigate to="/" /> : <Login />} />
      <Route path="/admin/login" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <AdminLogin />} />
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/module/:id" element={<ProtectedRoute><ModuleView /></ProtectedRoute>} />
      <Route path="/module/:id/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      <Route path="/glossary" element={<ProtectedRoute><Glossary /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <AppRoutes />
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
