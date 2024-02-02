import React, { useContext, useState } from 'react';
import loginRequest from '../api/loginRequest';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../App';

export const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token } = await loginRequest(password);
      setToken(token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div style={{ color: 'red' }}>{error}</div>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};
