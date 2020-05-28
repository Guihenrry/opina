import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="*" element={<p>Not Found Route</p>} />
    </Routes>
  );
};

export default AppRoutes;
