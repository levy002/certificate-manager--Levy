import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import { getAllUsers } from '../data/DB';
import { User } from '../types/Types';

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  activeUser: User;
  setActiveUser: (user: User) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeUser, setActiveUser] = useState<User>(users[0]);

  const fetchUsers = useCallback(async (): Promise<void> => {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
      setActiveUser(allUsers[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSetActiveUser = useCallback((user: User) => {
    setActiveUser(user);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  const contextValues = useMemo(
    () => ({
      users,
      loading,
      error,
      activeUser,
      setActiveUser: handleSetActiveUser,
    }),
    [users, loading, error, activeUser, handleSetActiveUser],
  );

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
