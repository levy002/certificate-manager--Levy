package com.dccsacademy.utils.mappers;

import com.dccsacademy.dtos.SupplierDto;
import com.dccsacademy.entities.SupplierEntity;

public class SupplierMapper {

    public static SupplierDto toDto(SupplierEntity supplierEntity) {
        if (supplierEntity == null) {
            return null;
        }
        SupplierDto supplierDto = new SupplierDto();
        supplierDto.setId(supplierEntity.getId());
        supplierDto.setName(supplierEntity.getName());
        supplierDto.setCity(supplierEntity.getCity());
        return supplierDto;
    }

    public static SupplierEntity toEntity(SupplierDto supplierDto) {
        if (supplierDto == null) {
            return null;
        }
        SupplierEntity supplierEntity = new SupplierEntity();
        supplierEntity.setId(supplierDto.getId());
        supplierEntity.setName(supplierDto.getName());
        supplierEntity.setCity(supplierDto.getCity());
        return supplierEntity;
    }
}
