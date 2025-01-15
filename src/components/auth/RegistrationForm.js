import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../../config';

const RegistrationForm = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
      });

      if (response.data.status.toLowerCase() === 'success') {
        navigate('/login');
      } else if (response.data.status.toLowerCase() === 'failed' || response.user === null) {
        setError(response.data.message);
      } else {
        setError("Unexpected error occurred ");
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      {/* <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-4 w-full"
      /> */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white p-2 w-full"
      >
        Register
      </button>
      {error && (
          <div className="my-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      <p className="text-center">
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
