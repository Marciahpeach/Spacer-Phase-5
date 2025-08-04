import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // IMPORTANT: Replace with your actual backend URL.
  // If your Flask app is running locally on default port 5000, this is likely correct.
  const API_BASE_URL = 'http://127.0.0.1:5000'; // Or 'http://localhost:5000'

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);   // Show loading indicator
    setMessage('');     // Clear previous success messages
    setError('');       // Clear previous error messages

    try {
      // Send a POST request to your Flask backend's /login endpoint
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Inform the server that we are sending JSON
        },
        // Convert the username and password state into a JSON string for the request body
        body: JSON.stringify({ username, password }),
      });

      // Parse the JSON response from the backend
      const data = await response.json();

      // Check if the HTTP response status is OK (200-299 range)
      if (response.ok) {
        // If login is successful, display a success message and log user data
        setMessage(`Login successful! Welcome ${data.user.username}. Role: ${data.user.role}`);
        console.log('Logged in user data:', data.user);
        // In a real application, you would typically store the user data or a token
        // (e.g., in local storage, session storage, or a global state management system)
        // and then redirect the user to a dashboard or protected route.
      } else {
        // If login fails (e.g., 401 Unauthorized), display the error message from the backend
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      // Catch any network errors or issues with the fetch request itself
      setError('An error occurred during login. Please ensure the backend is running and accessible.');
      console.error('Login error:', err);
    } finally {
      // Always stop the loading indicator, regardless of success or failure
      setLoading(false);
    }
  };

  return (
    // Main container for centering the login card
    <div className="login-container">
      {/* Login card container */}
      <div className="login-card">
        {/* Login title */}
        <h2 className="login-title">Login</h2>

        {/* Login form */}
        <form onSubmit={handleLogin} className="login-form">
          {/* Success message display */}
          {message && (
            <p className="message-box message-success">
              {message}
            </p>
          )}
          {error && (
            <p className="message-box message-error">
              {error}
            </p>
          )}

          {/* Username input group */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
              aria-label="Username" // Accessibility label
            />
          </div>

          {/* Password input group */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
              aria-label="Password" // Accessibility label
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className="btn btn-primary"
          >
            {loading ? 'Logging In...' : 'Login'} {/* Change text based on loading state */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
