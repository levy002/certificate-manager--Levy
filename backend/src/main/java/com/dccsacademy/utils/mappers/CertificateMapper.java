package com.dccsacademy.utils.mappers;

import com.dccsacademy.dtos.CertificateDto;
import com.dccsacademy.entities.CertificateEntity;
import com.dccsacademy.entities.SupplierEntity;

public class CertificateMapper {

    public static CertificateEntity toEntity(CertificateDto dto, SupplierEntity supplier) {
        CertificateEntity entity = new CertificateEntity();
        entity.setId(dto.getId());
        entity.setSupplier(supplier);
        entity.setCertificateType(dto.getCertificateType());
        entity.setValidFrom(dto.getValidFrom());
        entity.setValidTo(dto.getValidTo());
        entity.setPdfFile(dto.getPdfFile());
        return entity;
    }

    public static CertificateDto toDto(CertificateEntity entity) {
        CertificateDto dto = new CertificateDto();
        dto.setId(entity.getId());
        dto.setCertificateType(entity.getCertificateType());
        dto.setValidFrom(entity.getValidFrom());
        dto.setValidTo(entity.getValidTo());
        dto.setPdfFile(entity.getPdfFile());
        dto.setSupplier(SupplierMapper.toDto(entity.getSupplier()));
        return dto;
    }
}
