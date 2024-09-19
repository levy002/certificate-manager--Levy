package com.dccsacademy.seeds;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.logging.Logger;

@ApplicationScoped
@Transactional
public class DataInitializer {

    private static final Logger logger = Logger.getLogger(DataInitializer.class.getName());

    @Inject
    DepartmentSeeder departmentSeeder;

    @PostConstruct
    public void initializeSeeders() {
        try {
            departmentSeeder.seed();
            logger.info("Seeding completed successfully.");
        } catch (Exception e) {
            logger.severe("Error during seeding: " + e.getMessage());
        }
    }
}
