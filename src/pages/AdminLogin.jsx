import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { adminLogin } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = adminLogin(password);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Quality Training Portal Administration</p>
        </div>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Admin Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full">Sign In</button>
        </form>
        <div className="admin-back-link">
          <Link to="/login">Employee Login</Link>
        </div>
      </div>
    </div>
  );
}
