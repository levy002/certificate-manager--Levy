import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';

import { getAllCertificates, initDB } from '../data/db';
import { Certificate } from '../types/types';

interface CertificateContextType {
  certificates: Certificate[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface CertificatesProviderProps {
  children: React.ReactNode;
}

export const CertificatesContext =
  React.createContext<CertificateContextType | null>(null);

const CertificatesProvider: React.FC<CertificatesProviderProps> = ({
  children,
}) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dbInitialized = useRef<boolean>(false);

  const fetchCertificates = useCallback(async (): Promise<void> => {
    try {
      if (!dbInitialized.current) {
        await initDB();
        dbInitialized.current = true;
      }
      const allCertificates = await getAllCertificates();
      setCertificates(allCertificates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchCertificates();
  }, [fetchCertificates]);

  const contextValues = useMemo(
    () => ({
      certificates,
      loading,
      error,
      refetch,
    }),
    [certificates, loading, error, refetch],
  );

  return (
    <CertificatesContext.Provider value={contextValues}>
      {children}
    </CertificatesContext.Provider>
  );
};

export default CertificatesProvider;
