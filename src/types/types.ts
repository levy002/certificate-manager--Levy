type certificateType = {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
};

export type certificatesExampleType = {
  name: string;
  certificates?: certificateType[];
};