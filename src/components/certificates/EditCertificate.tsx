import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CertificateForm from './CertificateForm';
import SuppliersProvider from '../../contexts/suppliersContext';
import { getCertificateById } from '../../data/db';
import { Certificate } from '../../types/types';

const EditCertificate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async (): Promise<void> => {
      try {
        if (id) {
          const cert = await getCertificateById(parseInt(id, 10));
          setCertificate(cert);
        }
      } catch (err) {
        setError(`Error fetching certificate: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!certificate) {
    return <p>No certificate found with id: {id}</p>;
  }

  return (
    <SuppliersProvider>
      <CertificateForm
        initialFormState={certificate}
        mode="edit"
      />
    </SuppliersProvider>
  );
};

export default EditCertificate;
