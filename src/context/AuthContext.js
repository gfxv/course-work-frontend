import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    role: null,
  });

  useEffect(() => {
    // Load initial state from local storage or any other persistent storage
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    if (storedAuth) {
      setAuthState(storedAuth);
    }
  }, []);

  const login = (token, role) => {
    setAuthState({ isAuthenticated: true, token, role });
    localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, token, role }));
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, token: null, role: null });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
