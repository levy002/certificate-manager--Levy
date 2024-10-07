/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-10-07 10:10:18.

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

export interface HttpClient<O> {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; options?: O; }): RestResponse<R>;
}

export class RestApplicationClient<O> {

    constructor(protected httpClient: HttpClient<O>) {
    }

    /**
     * HTTP POST /api/v1/certificates
     * Java method: com.dccsacademy.resources.CertificateResource.createCertificate
     */
    createCertificate(certificate: CertificateDto, options?: O): RestResponse<any> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/v1/certificates`, data: certificate, options: options });
    }

    /**
     * HTTP GET /api/v1/certificates
     * Java method: com.dccsacademy.resources.CertificateResource.getAllCertificates
     */
    getAllCertificates(options?: O): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/certificates`, options: options });
    }

    /**
     * HTTP DELETE /api/v1/certificates/{id}
     * Java method: com.dccsacademy.resources.CertificateResource.deleteCertificateById
     */
    deleteCertificateById(id: number, options?: O): RestResponse<any> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/v1/certificates/${id}`, options: options });
    }

    /**
     * HTTP GET /api/v1/certificates/{id}
     * Java method: com.dccsacademy.resources.CertificateResource.getCertificateById
     */
    getCertificateById(id: number, options?: O): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/certificates/${id}`, options: options });
    }

    /**
     * HTTP PUT /api/v1/certificates/{id}
     * Java method: com.dccsacademy.resources.CertificateResource.updateCertificate
     */
    updateCertificate(id: number, certificateDto: CertificateDto, options?: O): RestResponse<any> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/v1/certificates/${id}`, data: certificateDto, options: options });
    }

    /**
     * HTTP GET /api/v1/departments
     * Java method: com.dccsacademy.resources.DepartmentResource.getDepartments
     */
    getDepartments(options?: O): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/departments`, options: options });
    }

    /**
     * HTTP GET /api/v1/suppliers
     * Java method: com.dccsacademy.resources.SupplierResource.searchSuppliers
     */
    searchSuppliers(queryParams?: { id?: string; name?: string; city?: string; }, options?: O): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/suppliers`, queryParams: queryParams, options: options });
    }

    /**
     * HTTP GET /api/v1/users
     * Java method: com.dccsacademy.resources.UserResource.searchUsers
     */
    searchUsers(queryParams?: { userId?: string; firstName?: string; lastName?: string; departmentName?: string; plant?: string; }, options?: O): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/users`, queryParams: queryParams, options: options });
    }
}

export type RestResponse<R> = Promise<Axios.GenericAxiosResponse<R>>;

export enum CertificateType {
    PERMISSION_OF_PRINTING = "PERMISSION_OF_PRINTING",
    OHSAS_18001 = "OHSAS_18001",
}

function uriEncoding(template: TemplateStringsArray, ...substitutions: any[]): string {
    let result = "";
    for (let i = 0; i < substitutions.length; i++) {
        result += template[i];
        result += encodeURIComponent(substitutions[i]);
    }
    result += template[template.length - 1];
    return result;
}


// Added by 'AxiosClientExtension' extension

import axios from "axios";
import * as Axios from "axios";

declare module "axios" {
    export interface GenericAxiosResponse<R> extends Axios.AxiosResponse {
        data: R;
    }
}

class AxiosHttpClient implements HttpClient<Axios.AxiosRequestConfig> {

    constructor(private axios: Axios.AxiosInstance) {
    }

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; options?: Axios.AxiosRequestConfig; }): RestResponse<R> {
        function assign(target: any, source?: any) {
            if (source != undefined) {
                for (const key in source) {
                    if (source.hasOwnProperty(key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        }

        const config: Axios.AxiosRequestConfig = {};
        config.method = requestConfig.method as typeof config.method;  // `string` in axios 0.16.0, `Method` in axios 0.19.0
        config.url = requestConfig.url;
        config.params = requestConfig.queryParams;
        config.data = requestConfig.data;
        assign(config, requestConfig.options);
        const copyFn = requestConfig.copyFn;

        const axiosResponse = this.axios.request(config);
        return axiosResponse.then(axiosResponse => {
            if (copyFn && axiosResponse.data) {
                (axiosResponse as any).originalData = axiosResponse.data;
                axiosResponse.data = copyFn(axiosResponse.data);
            }
            return axiosResponse;
        });
    }
}

export class AxiosRestApplicationClient extends RestApplicationClient<Axios.AxiosRequestConfig> {

    constructor(baseURL: string, axiosInstance: Axios.AxiosInstance = axios.create()) {
        axiosInstance.defaults.baseURL = baseURL;
        super(new AxiosHttpClient(axiosInstance));
    }
}
