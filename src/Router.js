import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Login from './pages/Login';
import Account from './pages/Accoount';
import History from './pages/History';
import Registration from './pages/Registration';
import PrivateRoute from './components/PrivateRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/lobby/:lobbyId" element={<PrivateRoute><Lobby/></PrivateRoute>} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path="/history/:matchId" element={<PrivateRoute><History /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
