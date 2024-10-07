package com.dccsacademy.seeds;

import com.dccsacademy.dtos.DepartmentDto;
import com.dccsacademy.services.DepartmentService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@ApplicationScoped
public class DepartmentSeed extends BaseSeed<DepartmentDto> {

  @Inject DepartmentService departmentService;

  private static final String[] DEPARTMENTS = {"ITM", "HR", "Sales", "Engineering"};

  @Override
  protected boolean isEmpty() {
    return departmentService.getDepartments().isEmpty();
  }

  @Override
  protected List<DepartmentDto> getSeedData() {
    return Stream.of(DEPARTMENTS).map(DepartmentDto::new).collect(Collectors.toList());
  }

  @Override
  protected void createEntity(DepartmentDto departmentDto) {
    departmentService.createDepartment(departmentDto);
  }
}
