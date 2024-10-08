package com.dccsacademy.dtos;

public class CommentDto {
  private String comment;
  private Long userId;

  // Getter and setter

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  @Override
  public String toString() {
    return "CommentDto{" + ", comment='" + comment + '\'' + ", userId=" + userId + '}';
  }
}
