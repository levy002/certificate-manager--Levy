import React from 'react';
import Routes from './routes/Routes';
import { LanguageProvider } from './contexts/LanguageContext';
import UserProvider from './contexts/UserContext';

const App: React.FC = () => {
  return (
    <>
        <LanguageProvider>
          <UserProvider>
            <Routes />
          </UserProvider>
        </LanguageProvider>
    </>
  );
};

export default App;
