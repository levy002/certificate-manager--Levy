package com.dccsacademy.utils.mappers;

import com.dccsacademy.dtos.DepartmentDto;
import com.dccsacademy.entities.DepartmentEntity;

public class DepartmentMapper {

  public static DepartmentDto toDto(DepartmentEntity departmentEntity) {
    if (departmentEntity == null) {
      return null;
    }
    DepartmentDto departmentDto = new DepartmentDto();
    departmentDto.setId(departmentEntity.getId());
    departmentDto.setName(departmentEntity.getName());
    return departmentDto;
  }

  public static DepartmentEntity toEntity(DepartmentDto departmentDto) {
    if (departmentDto == null) {
      return null;
    }
    DepartmentEntity departmentEntity = new DepartmentEntity();
    departmentEntity.setId(departmentDto.getId());
    departmentEntity.setName(departmentDto.getName());
    return departmentEntity;
  }
}
