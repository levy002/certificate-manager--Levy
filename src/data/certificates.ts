import { Certificate, CertificateType } from '../types/types';

type CertificatesExampleType = {
  name: string;
  certificates?: Certificate[];
};

const certificatesExamples: CertificatesExampleType[] = [
  {
    name: 'Example1',
    certificates: [
      {
        id: 1,
        supplier: 'DAIMLER AG, 1, Berlin',
        certificateType: CertificateType.PermissionOfPrinting,
        validFrom: '21.08.2017',
        validTo: '26.08.2017',
      },
      {
        id: 2,
        supplier: 'ANDEMIS GmbH, 1, Stuttgart',
        certificateType: CertificateType.OHSAS18001,
        validFrom: '18.08.2017',
        validTo: '24.08.2017',
      },
      {
        id: 3,
        supplier: 'ANDEMIS GmbH, 1, Stuttgart',
        certificateType: CertificateType.PermissionOfPrinting,
        validFrom: '04.10.2017',
        validTo: '10.10.2017',
      },
    ],
  },
  {
    name: 'Example2',
  },
  {
    name: 'Example3',
  },
];

export default certificatesExamples;
