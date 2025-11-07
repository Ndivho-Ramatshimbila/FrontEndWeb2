import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // 👁 single, clean import
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
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordHint, setPasswordHint] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!minLength || !hasUpper || !hasLower || !hasNumber) {
      setPasswordHint(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.'
      );
    } else {
      setPasswordHint('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'password') validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      setLoading(false);
      setError('Password does not meet requirements.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setLoading(false);
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        verify_password: form.confirmPassword,
        cellphone_number: form.phone,
        role: form.role.toUpperCase(),
      });

      setLoading(false);
      setSuccess('Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setLoading(false);
      console.error('Registration error:', err);

      let msg = 'Registration failed';
      const errorData = err.response?.data?.error || err.response?.data;

      if (errorData?.details?.length > 0) msg = errorData.details[0].message;
      else if (errorData?.message) msg = errorData.message;
      else if (typeof errorData === 'string') msg = errorData;

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
        <div className="password-wrapper">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {passwordHint && <small className="password-hint">{passwordHint}</small>}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="password-wrapper">
          <input
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
          <span
            className="toggle-password"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

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
