import React from 'react';
import { Routes } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import useAuth from '../hooks/useAuth';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/Profile/Edit';
import ProfileAddPost from '../pages/Profile/AddPost';
import ProfilePosts from '../pages/Profile/Posts';
import ProfileOpinions from '../pages/Profile/Opinions';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={Home} />
      <Route path="/signin" element={SignIn} redirect={!!user} />
      <Route path="/signup" element={SignUp} redirect={!!user} />
      <Route
        path="/profile"
        element={Profile}
        redirect={!user}
        redirectTo="/signin"
      >
        <Route path="/edit" element={ProfileEdit} />
        <Route path="/add-post" element={ProfileAddPost} />
        <Route path="/posts" element={ProfilePosts} />
        <Route path="/opinions" element={ProfileOpinions} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
