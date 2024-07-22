export enum CertificateType {
  PermissionOfPrinting = 'Permission of Printing',
  OHSAS18001 = 'OHSAS 18001',
}

export type Certificate = {
  id: number;
  supplier: string;
  certificateType: CertificateType;
  validFrom: string;
  validTo: string;
};

export enum TableHeaders {
  SUPPLIER = 'Supplier',
  CERTIFICATE_TYPE = 'Certificate Type',
  VALID_FROM = 'Valid From',
  VALID_TO = 'Valid To',
}
