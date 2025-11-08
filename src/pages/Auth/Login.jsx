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
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      setLoading(false);

      // Check if backend returned the expected user and token
      const user = res.data.user;
      const token = res.data.accessToken;

      if (!user || !user.role) throw new Error('User role missing');
      if (!token) throw new Error('Token missing from login response');

      console.log('Logged in user:', user);
      console.log('Token:', token);

      // Save token and role in localStorage
      localStorage.setItem('token', token);
      const role = user.role.toUpperCase();
      localStorage.setItem('role', role);

      // Redirect based on role
      switch (role) {
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'ORGANIZER':
          navigate('/dashboard');
          break;
        case 'ATTENDEE':
          navigate('/attendee');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setLoading(false);

      const msg =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please check your credentials.';

      setError(msg);
      console.error('Login error:', msg);
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
