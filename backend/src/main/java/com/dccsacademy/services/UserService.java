package com.dccsacademy.services;

import static com.dccsacademy.utils.mappers.UserMapper.toEntity;

import com.dccsacademy.dtos.UserDto;
import com.dccsacademy.entities.DepartmentEntity;
import com.dccsacademy.entities.UserEntity;
import com.dccsacademy.repositories.DepartmentRepository;
import com.dccsacademy.repositories.UserRepository;
import com.dccsacademy.utils.mappers.UserMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class UserService {

  @Inject UserRepository userRepository;

  @Inject DepartmentRepository departmentRepository;

  public void createUser(UserDto userDto) {
    DepartmentEntity departmentEntity =
        departmentRepository.findByName(userDto.getDepartmentName());
    if (departmentEntity == null) {
      throw new EntityNotFoundException(userDto.getDepartmentName() + " department not found");
    }
    if (userRepository.findByUserId(userDto.getUserId()) != null) {
      throw new IllegalArgumentException("User with the same userId already exists");
    }
    if (userRepository.findByEmail(userDto.getEmail()) != null) {
      throw new IllegalArgumentException("User with the same email already exists");
    }

    UserEntity userEntity = toEntity(userDto);
    userEntity.setDepartment(departmentEntity);
    userRepository.persist(userEntity);
    userDto.setUserId(userEntity.getUserId());
  }

  public List<UserDto> searchUsers(
      String userId, String firstName, String lastName, String departmentName, String plant) {
    return userRepository.searchUsers(userId, firstName, lastName, departmentName, plant).stream()
        .map(UserMapper::toDto)
        .collect(Collectors.toList());
  }
}
