package com.dccsacademy.seeds;

import com.dccsacademy.dtos.DepartmentDto;
import com.dccsacademy.services.DepartmentService;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional
public class DepartmentSeeder {

    @Inject
    DepartmentService departmentService;

    private static final String[] DEPARTMENT_NAMES = {
            "ITM",
            "HR",
            "Sales",
            "Engineering"
    };

    @PostConstruct
    public void seed() {
        if (departmentService.getDepartments().isEmpty()) {
            seedDepartments();
        }
    }

    private void seedDepartments() {
        for (String name : DEPARTMENT_NAMES) {
            DepartmentDto departmentDto = createDepartmentDto(name);
            departmentService.createDepartment(departmentDto);
        }
    }

    private DepartmentDto createDepartmentDto(String name) {
        DepartmentDto departmentDto = new DepartmentDto();
        departmentDto.setName(name);
        return departmentDto;
    }
}
