import CertificateForm from './CertificateForm';
import { Certificate, CertificateType, FormMode } from '../../types/Types';

const AddCertificate: React.FC = () => {
  const initialFormState: Certificate = {
    supplier: null,
    certificateType: CertificateType.OHSAS18001,
    validFrom: null,
    validTo: null,
    PDFUrl: '',
    id: Date.now(),
    assignedUsers: [],
  };

  return (
    <CertificateForm
      mode={FormMode.CREATE}
      initialFormState={initialFormState}
    />
  );
};

export default AddCertificate;
