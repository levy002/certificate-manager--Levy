import CertificatesTable from '../../components/certificates/CertificateTable';
import { Certificate, CertificateType } from '../../types/types';

const certificates: Certificate[] = [
  {
    id: 1,
    supplier: 'DAIMLER AG, 1, Berlin',
    certificateType: CertificateType.PermissionOfPrinting,
    validFrom: new Date('2017-08-21'),
    validTo: new Date('2017-08-26'),
  },
  {
    id: 2,
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: CertificateType.OHSAS18001,
    validFrom: new Date('2017-08-18'),
    validTo: new Date('2017-08-24'),
  },
  {
    id: 3,
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: CertificateType.PermissionOfPrinting,
    validFrom: new Date('2017-10-14'),
    validTo: new Date('2017-10-20'),
  },
];

const Example1View: React.FC = () => {
  return (
    <section>
      <h2>Example 1</h2>
      <CertificatesTable certificates={certificates} />
    </section>
  );
};

export default Example1View;
