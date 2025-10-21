import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/abstracts-auth/Login.scss';

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    // Simulated registration request
    try {
      // 👇 Simulate sending to backend API
      const response = await fakeRegisterAPI(form);

      setLoading(false);

      if (form.role === 'organizer') {
        alert(
          'Your organizer account request has been submitted for approval. You will be notified once approved.'
        );
      } else {
        alert('Registered successfully! Please login.');
      }

      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError('Registration failed. Please try again.');
    }
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

        <label htmlFor="phone">Phone Number</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          required
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

// 👉 Placeholder for API call (replace with real one)
async function fakeRegisterAPI(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // You would send the `formData` to your backend here
      console.log('Registering user:', formData);

      // Simulate success
      resolve({ status: 'ok' });

      // If simulating an error:
      // reject(new Error('Registration error'));
    }, 1000);
  });
}
