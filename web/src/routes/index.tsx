import React from 'react';
import { Routes } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import useAuth from '../hooks/useAuth';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={Home} />
      <Route path="/signin" element={SignIn} redirect={!!user} />
      <Route path="/signup" element={SignUp} redirect={!!user} />
    </Routes>
  );
};

export default AppRoutes;
