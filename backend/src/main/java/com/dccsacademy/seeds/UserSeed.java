package com.dccsacademy.seeds;

import com.dccsacademy.dtos.UserDto;
import com.dccsacademy.repositories.UserRepository;
import com.dccsacademy.services.UserService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
@Transactional
public class UserSeed {

    @Inject
    UserRepository userRepository;

    @Inject
    UserService userService;

    private static final List<UserDto> USERS = List.of(
            new UserDto("John", "Doe",  1L, "Plant 1", "john.doe@example.com"),
            new UserDto("Jane", "Smith", 2L, "Plant 2", "jane.smith@example.com"),
            new UserDto("Alice", "Johnson", 3L, "Plant 3", "alice.johnson@example.com"),
            new UserDto("Bob", "Brown", 4L, "Plant 4", "bob.brown@example.com"),
            new UserDto("Charlie", "Davis", 1L, "Plant 5", "charlie.davis@example.com"),
            new UserDto("David", "Wilson", 2L, "Plant 6", "david.wilson@example.com"),
            new UserDto("Eve", "Moore", 3L, "Plant 7", "eve.moore@example.com"),
            new UserDto("Frank", "Clark", 4L, "Plant 8", "frank.clark@example.com"),
            new UserDto("Grace", "Lee", 1L, "Plant 9", "grace.lee@example.com"),
            new UserDto("Henry", "Martin", 3L, "Plant 10", "henry.martin@example.com")
    );

    @PostConstruct
    public void seed() {
        if (userRepository.listAll().isEmpty()) {
            seedUsers();
        }
    }

    private void seedUsers() {
        USERS.forEach(userService::createUser);
    }
}
