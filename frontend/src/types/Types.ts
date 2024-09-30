import { CommentDto } from ".";

export enum CertificateType {
  PermissionOfPrinting = 'Permission of Printing',
  OHSAS18001 = 'OHSAS 18001',
}

export interface Supplier {
  name: string;
  index: string;
  city: string;
}

export enum Department {
  ITM = 'ITM',
  HR = 'HR',
  Sales = 'Sales',
  Engineering = 'Engineering',
}

export interface User {
  id: number;
  name: string;
  firstName: string;
  userId: string;
  department: Department;
  plant: string;
  email: string;
}

export type Certificate = {
  id: number;
  supplier: Supplier | null;
  certificateType: CertificateType;
  validFrom: Date | null;
  validTo: Date | null;
  PDFUrl: string | null;
  assignedUsers: User[];
  comments: CommentDto[];
};

export enum FormMode {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
}
