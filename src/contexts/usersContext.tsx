import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';

import { getAllUsers, initDB, addInitialUsers } from '../data/db';
import { initialUsers } from '../data/dummy-data';
import { User } from '../types/types';

interface UsersContextType {
  users: User[];
  loading: boolean;
  error: string | null;
}

interface UsersProviderProps {
  children: React.ReactNode;
}

export const UsersContext = React.createContext<UsersContextType | null>(null);

const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dbInitialized = useRef<boolean>(false);

  const fetchUsers = useCallback(async (): Promise<void> => {
    try {
      if (!dbInitialized.current) {
        const dbSuccess = await initDB();
        dbInitialized.current = true;
        if (dbSuccess) {
          await addInitialUsers(initialUsers);
        }
      }

      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const contextValues = useMemo(
    () => ({
      users,
      loading,
      error,
    }),
    [users, loading, error],
  );

  return (
    <UsersContext.Provider value={contextValues}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
