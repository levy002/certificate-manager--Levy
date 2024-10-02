import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CertificateForm from './CertificateForm';
import { useI18n } from '../../contexts/LanguageContext';
import { FormMode } from '../../types/Types';
import { CertificateDto } from '../../generated-sources/typesAndServices';
import apiClient from '../../api/clientApi';

const EditCertificate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<CertificateDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { translate } = useI18n();

  useEffect(() => {
    const fetchCertificate = async (): Promise<void> => {
      try {
        if (id) {
          const certificate = await apiClient.getCertificateById(parseInt(id));
          setCertificate(certificate.data.data);
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
    return <p>{translate('no_certificate_found')}</p>;
  }

  return (
    <CertificateForm
      initialFormState={certificate}
      mode={FormMode.EDIT}
    />
  );
};

export default EditCertificate;
