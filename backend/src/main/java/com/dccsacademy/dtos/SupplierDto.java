package com.dccsacademy.dtos;

public class SupplierDto {
  private Long id;
  private String name;
  private String city;

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

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public SupplierDto() {}

  public SupplierDto(String name, String city) {
    this.name = name;
    this.city = city;
  }

  @Override
  public String toString() {
    return "SupplierDTO{" + "id=" + id + ", name='" + name + '\'' + ", city='" + city + '\'' + '}';
  }
}
