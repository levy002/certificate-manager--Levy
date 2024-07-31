import CertificateForm from './CertificateForm';
import SuppliersProvider from '../../contexts/suppliersContext';
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
    <SuppliersProvider>
      <CertificateForm
        mode="create"
        initialFormState={initialFormState}
      />
    </SuppliersProvider>
  );
};

export default AddCertificate;
