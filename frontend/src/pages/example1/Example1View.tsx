import { useCallback, useEffect, useState } from 'react';

import CertificatesTable from '../../components/certificates/CertificateTable';
import MenuNavLink from '../../components/sidebar/MenuNavLink';
import { useI18n } from '../../contexts/LanguageContext';
import { getAllCertificates } from '../../data/DB';
import { Certificate } from '../../types/Types';

const Example1View: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { translate } = useI18n();

  const fetchCertificates = useCallback(async (): Promise<void> => {
    try {
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
      <h2>{translate('example1')}</h2>
      <div className="table__new-certificate">
        <MenuNavLink
          to="/frontend/machineLearning/example1/certificates/new"
          desc={translate('new_certificate')}
        />
      </div>
      {loading && <p>{translate('loading')}...</p>}
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
