import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth-style/ForgotPassword.scss';  // Ensure this path is correct

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('email'); // 'email' -> 'otp' -> 'reset'
  const [inputOtp, setInputOtp] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setMessage(`An OTP has been sent to ${email}`);
    }, 1000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (inputOtp === '12345') {
      setStep('reset');
      setMessage('');
    } else {
      setMessage('Invalid OTP. Try again.');
    }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage('Your password has been reset successfully!');
      setStep('done');
    }, 1000);
  };

  return (
    <div className="forgot-page">
      <form className="forgot-form" onSubmit={
        step === 'email'
          ? handleEmailSubmit
          : step === 'otp'
          ? handleOtpSubmit
          : handleResetSubmit
      }>
        <h2>Forgot Password</h2>

        {message && <div className="message">{message}</div>}

        {step === 'email' && (
          <>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <label>Enter OTP</label>
            <input
              type="text"
              value={inputOtp}
              onChange={(e) => setInputOtp(e.target.value)}
              required
              placeholder="Enter the OTP (e.g. 12345)"
            />
            <button type="submit">Verify OTP</button>
          </>
        )}

        {step === 'reset' && (
          <>
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
            <button type="submit">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}

        {step === 'done' && (
          <p className="success-message">
            Password reset!{' '}
            <span onClick={() => navigate('/login')}>Go to Login</span>
          </p>
        )}

        {step !== 'done' && (
          <p className="login-link">
            Remembered your password?{' '}
            <span onClick={() => navigate('/login')}>Back to Login</span>
          </p>
        )}
      </form>
    </div>
  );
}
