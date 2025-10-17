import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/abstracts-auth/Login.scss';  // Reuse your existing styles

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',     
    confirmPassword: '',   // new field
    role: 'attendee',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Password confirmation validation
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert(`Registered successfully as ${form.role}! Please login.`);
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        {error && <p className="error">{error}</p>}

        <label htmlFor="name">Full Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />

        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />

         <label htmlFor="phone">phone number</label>
        <input
          type="phone"
          name="phone"
          placeholder="Enter your phone number"
          value={form.phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />


        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          placeholder="Confirm your password"
        />

        <label htmlFor="role">I want to register as:</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="attendee">Attendee</option>
          <option value="organizer">Organizer</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering…' : 'Register'}
        </button>

        <div className="login-links">
          <p>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </form>
    </div>
  );
}
