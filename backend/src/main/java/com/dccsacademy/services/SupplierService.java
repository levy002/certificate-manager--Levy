package com.dccsacademy.services;

import com.dccsacademy.dtos.SupplierDto;
import com.dccsacademy.entities.SupplierEntity;
import com.dccsacademy.utils.mappers.SupplierMapper;
import com.dccsacademy.repositories.SupplierRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.dccsacademy.utils.mappers.SupplierMapper.toEntity;

@ApplicationScoped
@Transactional
public class SupplierService {

    @Inject
    SupplierRepository supplierRepository;

    public void createSupplier(SupplierDto supplierDto) {
        SupplierEntity supplierEntity = toEntity(supplierDto);
        supplierRepository.persist(supplierEntity);
        supplierDto.setId(supplierEntity.getId());
    }

    public List<SupplierDto> searchSuppliers(String id, String name, String city) {
        return supplierRepository.searchSuppliers(id, name, city).stream()
                .map(SupplierMapper::toDto)
                .collect(Collectors.toList());
    }
}
