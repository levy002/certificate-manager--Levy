package com.dccsacademy.utils.mappers;

import com.dccsacademy.dtos.CertificateDto;
import com.dccsacademy.entities.CertificateEntity;
import com.dccsacademy.entities.SupplierEntity;
import com.dccsacademy.utils.PdfUtil;

public class CertificateMapper {

  public static CertificateEntity toEntity(CertificateDto dto, SupplierEntity supplier) {
    CertificateEntity entity = new CertificateEntity();
    entity.setSupplier(supplier);
    entity.setCertificateType(dto.getCertificateType());
    entity.setValidFrom(dto.getValidFrom());
    entity.setValidTo(dto.getValidTo());
    entity.setPdfFile(PdfUtil.decode(dto.getPdfFile()));
    return entity;
  }

  public static CertificateDto toDto(CertificateEntity entity) {
    CertificateDto dto = new CertificateDto();
    dto.setId(entity.getId());
    dto.setCertificateType(entity.getCertificateType());
    dto.setValidFrom(entity.getValidFrom());
    dto.setValidTo(entity.getValidTo());
    dto.setSupplier(SupplierMapper.toDto(entity.getSupplier()));
    return dto;
  }
}
