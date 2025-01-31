import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    id: null,
    name: null,
    balance: null,
  });

  useEffect(() => {
    // Load initial state from local storage or any other persistent storage
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    if (storedAuth) {
      setAuthState(storedAuth);
    }
  }, []);

  const login = (token, id, name, balance) => {
    setAuthState({ isAuthenticated: true, token, id, name, balance });
    localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, token, id, name, balance }));
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, token: null, id: null, name: null, balance: null });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
