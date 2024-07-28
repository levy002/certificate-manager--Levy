import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';

import { getAllSuppliers, initDB, addInitialSuppliers } from '../data/db';
import { initialSuppliers } from '../data/dummy-data';
import { Supplier } from '../types/types';

interface SuppliersContextType {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
}

interface SuppliersProviderProps {
  children: React.ReactNode;
}

export const SuppliersContext =
  React.createContext<SuppliersContextType | null>(null);

const SuppliersProvider: React.FC<SuppliersProviderProps> = ({ children }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dbInitialized = useRef<boolean>(false);

  const fetchSuppliers = useCallback(async (): Promise<void> => {
    try {
      if (!dbInitialized.current) {
        const dbSuccess = await initDB();
        dbInitialized.current = true;
        if (dbSuccess) {
          await addInitialSuppliers(initialSuppliers);
        }
      }

      const allSuppliers = await getAllSuppliers();
      setSuppliers(allSuppliers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const contextValues = useMemo(
    () => ({
      suppliers,
      loading,
      error,
    }),
    [suppliers, loading, error],
  );

  return (
    <SuppliersContext.Provider value={contextValues}>
      {children}
    </SuppliersContext.Provider>
  );
};

export default SuppliersProvider;
