package com.dccsacademy.seeds;

import com.dccsacademy.dtos.UserDto;
import com.dccsacademy.repositories.UserRepository;
import com.dccsacademy.services.UserService;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
@Transactional
public class UserSeed {

  @Inject UserRepository userRepository;

  @Inject UserService userService;

  private static final List<UserDto> USERS =
      List.of(
          new UserDto("JHNDOE", "John", "Doe", "ITM", "Plant 1", "john.doe@example.com"),
          new UserDto("JNSMTH", "Jane", "Smith", "HR", "Plant 2", "jane.smith@example.com"),
          new UserDto(
              "ALCJHN", "Alice", "Johnson", "Sales", "Plant 3", "alice.johnson@example.com"),
          new UserDto("BOBBRN", "Bob", "Brown", "Engineering", "Plant 4", "bob.brown@example.com"),
          new UserDto("CHLDVS", "Charlie", "Davis", "ITM", "Plant 5", "charlie.davis@example.com"),
          new UserDto("DVDWLS", "David", "Wilson", "HR", "Plant 6", "david.wilson@example.com"),
          new UserDto("EVMORE", "Eve", "Moore", "Sales", "Plant 7", "eve.moore@example.com"),
          new UserDto(
              "FRKCLK", "Frank", "Clark", "Engineering", "Plant 8", "frank.clark@example.com"),
          new UserDto("GRCLEE", "Grace", "Lee", "ITM", "Plant 9", "grace.lee@example.com"),
          new UserDto(
              "HNRMTN", "Henry", "Martin", "Sales", "Plant 10", "henry.martin@example.com"));

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
