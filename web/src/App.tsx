import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './contexts';
import GlobalStyles from './styles/global';

import Routes from './routes';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <GlobalStyles />
        <Header />
        <Routes />
      </AppProvider>
    </Router>
  );
};

export default App;
