/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-09-30 16:28:57.

export interface CertificateDto {
    id: number;
    certificateType: CertificateType;
    validFrom: Date;
    validTo: Date;
    pdfFile: string;
    supplier: SupplierDto;
    assignedUsers: number[];
    comments: CommentDto[];
}

export interface CommentDto {
    comment: string;
    userId: number;
}

export interface DepartmentDto {
    id: number;
    name: string;
}

export interface SupplierDto {
    id: number;
    name: string;
    city: string;
}

export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    departmentName: string;
    plant: string;
    email: string;
    userId: string;
}

export enum CertificateType {
    PERMISSION_OF_PRINTING = "PERMISSION_OF_PRINTING",
    OHSAS_18001 = "OHSAS_18001",
}
