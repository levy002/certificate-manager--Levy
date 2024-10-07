package com.dccsacademy.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "departments", schema = "certificates")
public class DepartmentEntity extends BaseEntity {

  @Column(nullable = false, unique = true)
  private String name;

  // Getters and setters
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
