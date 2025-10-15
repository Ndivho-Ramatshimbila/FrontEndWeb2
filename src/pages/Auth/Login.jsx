import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/abstracts-auth/Login.scss'; // Import your SCSS

export default function Login() {
  const navigate = useNavigate();

  // Separate states for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulated backend response with user role
    const mockUserData = {
      email: email,
      role: 'organizer', // Change this to 'admin' or 'organizer' to test other dashboards
    };

    setTimeout(() => {
      setLoading(false);
if (mockUserData.role === 'admin') {
  navigate('/Dashboard');
} else if (mockUserData.role === 'organizer') {
  navigate('/Dashboard');
} else if (mockUserData.role === 'attendee') {
  navigate('/Dashboard');
} else {
  setError('Unknown user role');
}

    }, 1000);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p>Login to your account to continue</p>

        {error && <p className="error">{error}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

       
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="login-links">
          <p>
            Don’t have an account?{' '}
            <span onClick={() => navigate('/register')}>Register</span>
          </p>
          <p>
            Forgot password?{' '}
            <span onClick={() => navigate('/forgot-password')}>Reset</span>
          </p>
        </div>
      </form>
    </div>
  );
}
