package com.dccsacademy.repositories;

import com.dccsacademy.entities.DepartmentEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DepartmentRepository implements PanacheRepository<DepartmentEntity> {

    public DepartmentEntity findByName(String name) {
        return find("name", name).firstResult();
    }
}
