package com.dccsacademy.utils.mappers;

import com.dccsacademy.dtos.UserDto;
import com.dccsacademy.entities.UserEntity;

public class UserMapper {

    public static UserDto toDto(UserEntity userEntity) {
        if (userEntity == null) {
            return null;
        }
        UserDto userDto = new UserDto();
        userDto.setUserId(userEntity.getUserId());
        userDto.setFirstName(userEntity.getFirstName());
        userDto.setLastName(userEntity.getLastName());
        userDto.setDepartmentId(userEntity.getDepartment().getId());
        userDto.setPlant(userEntity.getPlant());
        userDto.setEmail(userEntity.getEmail());
        return userDto;
    }

    public static UserEntity toEntity(UserDto userDto) {
        if (userDto == null) {
            return null;
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(userDto.getUserId());
        userEntity.setFirstName(userDto.getFirstName());
        userEntity.setLastName(userDto.getLastName());
        userEntity.setPlant(userDto.getPlant());
        userEntity.setEmail(userDto.getEmail());
        return userEntity;
    }
}
