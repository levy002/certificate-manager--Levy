import CertificateForm from './CertificateForm';
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
    <CertificateForm
      mode="create"
      initialFormState={initialFormState}
    />
  );
};

export default AddCertificate;
