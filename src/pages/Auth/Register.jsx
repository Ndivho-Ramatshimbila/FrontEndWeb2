import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/abstracts-auth/Login.scss'; // keep your existing styles

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'attendee',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // ✅ Check password match first
    if (form.password !== form.confirmPassword) {
      setLoading(false);
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        verify_password: form.confirmPassword,
        cellphone_number: form.phone,
        role: form.role.toUpperCase(),
      });

      setLoading(false);
      setSuccess('Registered successfully! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
  setLoading(false);
  console.error('Registration error:', err);

  let msg = 'Registration failed';

  if (err.response?.data?.error) {
    const errorData = err.response.data.error;

    // Prefer detailed message if available
    if (errorData.details && errorData.details.length > 0) {
      msg = errorData.details[0].message;
    } else if (errorData.message) {
      msg = errorData.message;
    }
  } else if (err.response?.data?.message) {
    msg = err.response.data.message;
  }

  setError(msg);
}

  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p>Fill in your details to register</p>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

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

        <label htmlFor="phone">Phone Number</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
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
        <select name="role" value={form.role} onChange={handleChange}>
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
