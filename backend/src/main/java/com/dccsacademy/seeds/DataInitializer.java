package com.dccsacademy.seeds;

import jakarta.enterprise.event.Observes;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Startup;
import jakarta.inject.Inject;

@ApplicationScoped
public class DataInitializer {

    @Inject
    DepartmentSeed departmentSeed;

    @Inject
    SupplierSeed supplierSeed;

    @Inject
    UserSeed userSeed;

    public void onStart(@Observes Startup event) {
        departmentSeed.seed();
        supplierSeed.seed();
        userSeed.seed();
    }
}
