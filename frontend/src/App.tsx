import React, { useEffect, useState } from 'react';
import { initDB, addInitialSuppliers, addInitialUsers } from './data/DB';
import { initialSuppliers, initialUsers } from './data/Dummydata';
import Routes from './routes/Routes';
import { LanguageProvider } from './contexts/LanguageContext';
import UserProvider from './contexts/UserContext';

const App: React.FC = () => {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initializeDatabase = async (): Promise<void> => {
      try {
        await initDB();
        await addInitialSuppliers(initialSuppliers);
        await addInitialUsers(initialUsers);
        setDbInitialized(true);
      } catch (err) {
        console.error("Error initializing database:", err);
      }
    };

    initializeDatabase();
  }, []);

  return (
    <>
      {dbInitialized ? (
        <LanguageProvider>
          <UserProvider>
            <Routes />
          </UserProvider>
        </LanguageProvider>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default App;
