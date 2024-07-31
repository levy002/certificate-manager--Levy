import { useCallback, useEffect, useRef, useState } from 'react';

import CertificatesTable from '../../components/certificates/CertificateTable';
import MenuNavLink from '../../components/sidebar/MenuNavLink';
import { getAllCertificates, initDB } from '../../data/DB';
import { Certificate } from '../../types/Types';

const Example1View: React.FC = () => {
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

  return (
    <section>
      <h2>Example 1</h2>
      <div className="table__new-certificate">
        <MenuNavLink
          to="/machineLearning/example1/certificates/new"
          desc="New Certificate"
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <CertificatesTable
          certificates={certificates}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default Example1View;
