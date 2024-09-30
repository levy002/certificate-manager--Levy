import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import { UserDto } from '../generated-sources/typesAndServices';
import apiClient from '../api/clientApi';

interface UserContextType {
  users: UserDto[];
  loading: boolean;
  error: string | null;
  activeUser: UserDto | null;
  setActiveUser: (user: UserDto) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeUser, setActiveUser] = useState<UserDto | null>(null);

  const fetchUsers = useCallback(async (): Promise<void> => {
    try {
      const allUsers = await apiClient.searchUsers();
      setUsers(allUsers.data.data);
      setActiveUser(allUsers.data.data[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSetActiveUser = useCallback((user: UserDto) => {
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
