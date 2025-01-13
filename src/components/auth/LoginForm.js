import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

import API_URL from '../../config';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const authResponse = await axios.post(`${API_URL}/auth/login`, {
          username,
          password,
        });
      if (authResponse.data.status === 'success') {
        const { token, username } = authResponse.data;

        console.log("Sending request to retrieve user information")
        console.log(`Token: ${token}`);


        const userInfoResponse = await axios.get(`${API_URL}/user/get_user_info`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });

        if (userInfoResponse.data.status.toLowerCase() === 'success') {
          const { id, balance } = userInfoResponse.data.user;
          login(token, id, username, balance);
          navigate('/');
        } else {
          setError(userInfoResponse.data.message || 'Failed to retrieve user information');
        }
      } else {
        setError(authResponse.data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 w-full"
      >
        Login
      </button>
      {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      <p className="text-center">
        Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
