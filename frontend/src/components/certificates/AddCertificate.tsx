import CertificateForm from './CertificateForm';
import { FormMode } from '../../types/Types';
import { CertificateDto, CertificateType } from '../../generated-sources/typesAndServices';

const AddCertificate: React.FC = () => {
  const initialFormState: CertificateDto = {
    supplier: {id: 0, name: "", city: ""},
    certificateType: CertificateType.PERMISSION_OF_PRINTING,
    validFrom: new Date(),
    validTo: new Date(),
    pdfFile: '',
    id: Date.now(),
    assignedUsers: [],
    comments: [],
  };

  return (
    <CertificateForm
      mode={FormMode.CREATE}
      initialFormState={initialFormState}
    />
  );
};

export default AddCertificate;
