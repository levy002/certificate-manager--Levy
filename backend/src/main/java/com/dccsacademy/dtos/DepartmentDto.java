package com.dccsacademy.dtos;

public class DepartmentDto {
  private Long id;
  private String name;

  // Getters and setters

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public DepartmentDto() {}

  public DepartmentDto(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "DepartmentDTO{" + "id=" + id + ", name='" + name + '\'' + '}';
  }
}
