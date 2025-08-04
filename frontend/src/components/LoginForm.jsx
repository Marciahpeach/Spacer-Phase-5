// frontend/src/components/LoginForm.jsx
import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // This is a placeholder for actual login logic.
    // In a real application, you would send these credentials to your backend for authentication.
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (username === 'admin' && password === 'password') {
        setMessage('Login successful! Welcome Admin.');
        // In a real app, you'd store a token and redirect
      } else if (username === 'user' && password === 'password') {
        setMessage('Login successful! Welcome User.');
      }
      else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleLogin} className="login-form">
          {message && <p className="message-box message-success">{message}</p>}
          {error && <p className="message-box message-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;