import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/abstracts-auth/Login.scss'; // Keep existing styling

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Replace this URL with your backend login endpoint
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      setLoading(false);

      // Assuming your backend returns user info including role
      const user = res.data.user; // adjust according to your backend response
      const token = res.data.token; // optional: store JWT in localStorage/sessionStorage
      console.log('Logged in user:', user);
      console.log('Token:', token);
      if (token) localStorage.setItem('token', token);

      // Redirect based on role
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else if (user.role === 'ORGANIZER') {
        navigate('/dashboard');
      } else if (user.role === 'ATTENDEE') {
        navigate('/attendee');
      } else {
        navigate('/'); // fallback
      }
    } catch (err) {
      setLoading(false);
      // Show backend error message if available
      setError(
        err.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
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
