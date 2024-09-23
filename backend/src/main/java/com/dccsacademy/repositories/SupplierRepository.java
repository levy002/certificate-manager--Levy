package com.dccsacademy.repositories;

import com.dccsacademy.entities.SupplierEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class SupplierRepository implements PanacheRepository<SupplierEntity> {

    public List<SupplierEntity> searchSuppliers(String id, String name, String city) {
        name = (name != null) ? name.trim().toLowerCase() : "";
        city = (city != null) ? city.trim().toLowerCase() : "";
        Long index = (id != null && !id.isEmpty()) ? Long.parseLong(id) : null;

        String query = "lower(name) like ?1 and lower(city) like ?2";
        List<Object> params = new ArrayList<>();
        params.add("%" + name + "%");
        params.add("%" + city + "%");

        if (index != null) {
            query += " and id = ?3";
            params.add(index);
        }

        return find(query, params.toArray()).list();
    }

}
