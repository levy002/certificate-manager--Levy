package com.dccsacademy.dtos;

public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String departmentName;
    private String plant;
    private String email;
    private String userId;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserDto() {
    }

    public UserDto(String userId, String firstName, String lastName, String departmentName, String plant, String email) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.departmentName = departmentName;
        this.plant = plant;
        this.email = email;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", departmentName=" + departmentName +
                ", plant='" + plant + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
