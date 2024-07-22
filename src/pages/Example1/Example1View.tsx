import { useState, useEffect, useRef } from 'react';

import CertificatesTable from '../../components/certificates/CertificateTable';
import MenuNavLink from '../../components/Sidebar/MenuNavLink';
import { initDB, getAllCertificates } from '../../data/db';
import { Certificate } from '../../types/types';

const Example1View: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dbInitialized = useRef<boolean>(false);

  useEffect(() => {
    const fetchCertificates = async (): Promise<void> => {
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
    };
    fetchCertificates();
  }, []);

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
      {!loading && !error && <CertificatesTable certificates={certificates} />}
    </section>
  );
};

export default Example1View;
