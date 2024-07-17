type certificateType = {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
};

export type machineLearningExampleType = {
  name: string;
  certificates?: certificateType[];
};