import CertificateForm from './CertificateForm';
import { LookupProvider } from '../../contexts/LookupContext';
import { Certificate, CertificateType } from '../../types/types';

const AddCertificate: React.FC = () => {
  const initialFormState: Certificate = {
    supplier: '',
    certificateType: CertificateType.OHSAS18001,
    validFrom: null,
    validTo: null,
    PDFUrl: '',
    id: Date.now(),
  };

  return (
    <LookupProvider>
      <CertificateForm
        mode="create"
        initialFormState={initialFormState}
      />
    </LookupProvider>
  );
};

export default AddCertificate;
