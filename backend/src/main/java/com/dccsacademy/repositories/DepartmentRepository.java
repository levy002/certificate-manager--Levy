package com.dccsacademy.repositories;

import com.dccsacademy.entities.DepartmentEntity;
import com.dccsacademy.utils.SearchQueryUtil;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DepartmentRepository implements PanacheRepository<DepartmentEntity> {
    public DepartmentEntity findByName(String name) {
        return SearchQueryUtil.findByField(DepartmentEntity.class, "name", name, getEntityManager());
    }
}
