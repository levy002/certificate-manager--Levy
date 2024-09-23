package com.dccsacademy.repositories;

import com.dccsacademy.entities.UserEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class UserRepository implements PanacheRepository<UserEntity> {

    @Inject
    DepartmentRepository departmentRepository;

    public UserEntity findByEmail(String email) {
        return find("email", email).firstResult();
    }

    public List<UserEntity> searchUsers(String id, String firstName, String lastName, String departmentId, String plant) {
        firstName = (firstName != null) ? firstName.trim().toLowerCase() : "";
        lastName = (lastName != null) ? lastName.trim().toLowerCase() : "";
        plant = (plant != null) ? plant.trim().toLowerCase() : "";
        Long userId = (id != null && !id.isEmpty()) ? Long.parseLong(id) : null;
        Long deptId = (departmentId != null && !departmentId.isEmpty()) ? Long.parseLong(departmentId) : null;

        String query = "lower(firstName) like ?1 and lower(lastName) like ?2 and lower(plant) like ?3";
        List<Object> params = new ArrayList<>();
        params.add("%" + firstName + "%");
        params.add("%" + lastName + "%");
        params.add("%" + plant + "%");

        int nextIndex=4;
        if (userId != null) {
            query += " and id = ?" + nextIndex;
            params.add(userId);
            nextIndex++;
        }

        if (deptId != null) {
            var department = departmentRepository.findById(deptId);
            if(department != null) {
                query += " and department = ?" + nextIndex;
                params.add(department);
            }
        }

        return find(query, params.toArray()).list();
    }

}

