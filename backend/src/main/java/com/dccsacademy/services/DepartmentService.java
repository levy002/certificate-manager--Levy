package com.dccsacademy.services;

import com.dccsacademy.dtos.DepartmentDto;
import com.dccsacademy.entities.DepartmentEntity;
import com.dccsacademy.repositories.DepartmentRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class DepartmentService {

    @Inject
    DepartmentRepository departmentRepository;

    public List<DepartmentDto> getDepartments() {
        List<DepartmentEntity> departmentEntities = departmentRepository.listAll();
        return departmentEntities.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public DepartmentDto getDepartmentById(Long id) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id);
        if (departmentEntity == null) {
            throw new EntityNotFoundException("Department with id " + id + " does not exist");
        }
        return convertToDto(departmentEntity);
    }

    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        if (departmentRepository.findByName(departmentDto.getName()) != null) {
            throw new IllegalArgumentException(departmentDto.getName() + " department already exists");
        }
        DepartmentEntity departmentEntity = convertToEntity(departmentDto);
        departmentRepository.persist(departmentEntity);
        departmentDto.setId(departmentEntity.getId());
        return departmentDto;
    }

    public DepartmentDto updateDepartment(Long id, DepartmentDto departmentDto) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id);
        if (departmentEntity == null) {
            throw new EntityNotFoundException("Department with id " + id + " does not exist");
        }

        if (departmentRepository.findByName(departmentDto.getName()) != null) {
            throw new IllegalArgumentException(departmentDto.getName() + " department with already exists");
        }

        departmentEntity.setName(departmentDto.getName());
        departmentRepository.persist(departmentEntity);
        return convertToDto(departmentEntity);
    }

    public void deleteDepartment(Long id) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id);
        if (departmentEntity == null) {
            throw new EntityNotFoundException("Department with id " + id + " does not exist");
        }
        departmentRepository.delete(departmentEntity);
    }

    private DepartmentDto convertToDto(DepartmentEntity departmentEntity) {
        DepartmentDto departmentDto = new DepartmentDto();
        departmentDto.setId(departmentEntity.getId());
        departmentDto.setName(departmentEntity.getName());
        return departmentDto;
    }

    private DepartmentEntity convertToEntity(DepartmentDto departmentDto) {
        DepartmentEntity departmentEntity = new DepartmentEntity();
        departmentEntity.setName(departmentDto.getName());
        return departmentEntity;
    }
}

