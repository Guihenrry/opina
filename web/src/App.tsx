import React from 'react';

import AppProvider from './contexts';
import GlobalStyles from './styles/global';

const App: React.FC = () => {
  return (
    <AppProvider>
      <GlobalStyles />
    </AppProvider>
  );
};

export default App;
