package com.dccsacademy.utils.mappers;

import com.dccsacademy.dtos.CommentDto;
import com.dccsacademy.entities.CertificateEntity;
import com.dccsacademy.entities.CommentEntity;
import com.dccsacademy.entities.UserEntity;

public class CommentMapper {
  public static CommentEntity toEntity(
      CommentDto dto, CertificateEntity certificate, UserEntity user) {
    if (dto == null) {
      return null;
    }

    CommentEntity commentEntity = new CommentEntity();
    commentEntity.setComment(dto.getComment());
    commentEntity.setCertificate(certificate);
    commentEntity.setUser(user);

    return commentEntity;
  }

  public static CommentDto toDto(CommentEntity entity) {
    if (entity == null) {
      return null;
    }

    CommentDto commentDto = new CommentDto();
    commentDto.setComment(entity.getComment());
    commentDto.setUserId(entity.getUser().getId());

    return commentDto;
  }
}
