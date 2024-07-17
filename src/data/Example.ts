import { machineLearningExampleType } from '../types/types';

const machineLearningExamples: machineLearningExampleType[] = [
  {
    name: 'Example1',
    certificates: [
      {
        supplier: 'DAIMLER AG, 1, Berlin',
        certificateType: 'Permission of Printing',
        validFrom: '21.08.2017',
        validTo: '26.08.2017',
      },
      {
        supplier: 'ANDEMIS GmbH, 1, Stuttgart',
        certificateType: 'OHSAS 18001',
        validFrom: '18.08.2017',
        validTo: '24.08.2017',
      },
      {
        supplier: 'ANDEMIS GmbH, 1, Stuttgart',
        certificateType: 'Permission of Printing',
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

export default machineLearningExamples;

