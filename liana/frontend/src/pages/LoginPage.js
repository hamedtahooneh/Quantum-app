import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('user', JSON.stringify(response.data)); // Store token
      setMessage('Login successful! Redirecting to home...');
      // TODO: Navigate to a protected dashboard or home page
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.msg) || // Corrected to use .msg for backend error
        error.message ||
        error.toString();
      setMessage(resMessage);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
