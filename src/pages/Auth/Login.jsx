import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/abstracts-auth/Login.scss'; // Import your SCSS

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Define mock users with roles and passwords
  const mockUsers = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'organizer@example.com', password: 'organizer123', role: 'organizer' },
    { email: 'attendee@example.com', password: 'attendee123', role: 'attendee' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate a fake "backend delay"
    setTimeout(() => {
      const foundUser = mockUsers.find(
        (user) => user.email === email && user.password === password
      );

      setLoading(false);

      if (foundUser) {
        // ✅ Redirect based on user role
        if (foundUser.role === 'admin') {
          navigate('/admin');
        } else if (foundUser.role === 'organizer') {
          navigate('/dashboard');
        } else if (foundUser.role === 'attendee') {
          navigate('/attendee');
        }
      } else {
        // Invalid credentials
        setError('Invalid email or password');
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
