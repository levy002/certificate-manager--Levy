import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CertificateForm from './CertificateForm';
import { CertificatesContext } from '../../contexts/certificatesContext';
import { Certificate } from '../../types/types';

const EditCertificate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { certificates, loading, error } = useContext(CertificatesContext)!;
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    if (certificates && id) {
      const foundCertificate = certificates.find(
        (cert: Certificate) => cert.id === parseInt(id, 10),
      );
      setCertificate(foundCertificate || null);
    }
  }, [certificates, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!certificate) {
    return <p>No certificate found with id: {id}</p>;
  }

  return <CertificateForm certificate={certificate} />;
};

export default EditCertificate;
