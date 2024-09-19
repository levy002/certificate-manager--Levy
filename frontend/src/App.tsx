import React, { useEffect } from 'react';

import { initDB, addInitialSuppliers, addInitialUsers } from './data/DB';
import { initialSuppliers, initialUsers } from './data/Dummydata';
import Routes from './routes/Routes';

const App: React.FC = () => {
  useEffect(() => {
    const initializeDatabase = async (): Promise<void> => {
      await initDB();
      await addInitialSuppliers(initialSuppliers);
      await addInitialUsers(initialUsers);
    };

    initializeDatabase();
  }, []);

  return <Routes />;
};

export default App;
