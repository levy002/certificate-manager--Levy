package com.dccsacademy.services;

import com.dccsacademy.dtos.DepartmentDto;
import com.dccsacademy.entities.DepartmentEntity;
import com.dccsacademy.utils.mappers.DepartmentMapper;
import com.dccsacademy.repositories.DepartmentRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.dccsacademy.utils.mappers.DepartmentMapper.toEntity;

@ApplicationScoped
@Transactional
public class DepartmentService {

    @Inject
    DepartmentRepository departmentRepository;

    public List<DepartmentDto> getDepartments() {
        List<DepartmentEntity> departmentEntities = departmentRepository.listAll();
        return departmentEntities.stream()
                .map(DepartmentMapper::toDto)
                .collect(Collectors.toList());
    }

    public void createDepartment(DepartmentDto departmentDto) {
        if (departmentRepository.findByName(departmentDto.getName()) != null) {
            throw new IllegalArgumentException(departmentDto.getName() + " department already exists");
        }
        DepartmentEntity departmentEntity = toEntity(departmentDto);
        departmentRepository.persist(departmentEntity);
        departmentDto.setId(departmentEntity.getId());
    }
}
