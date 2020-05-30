import React from 'react';
import useAuth from '../../hooks/useAuth';

const Home: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <button type="button" onClick={signOut}>
      Sair
    </button>
  );
};

export default Home;
