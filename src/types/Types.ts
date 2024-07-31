export enum CertificateType {
  PermissionOfPrinting = 'Permission of Printing',
  OHSAS18001 = 'OHSAS 18001',
}

export interface Supplier {
  name: string;
  index: string;
  city: string;
}

export type Certificate = {
  id: number;
  supplier: Supplier | null;
  certificateType: CertificateType;
  validFrom: Date | null;
  validTo: Date | null;
  PDFUrl: string | null;
};

export enum FormMode {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
}
