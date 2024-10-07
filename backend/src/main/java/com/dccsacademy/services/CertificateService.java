package com.dccsacademy.services;

import com.dccsacademy.dtos.CertificateDto;
import com.dccsacademy.dtos.CommentDto;
import com.dccsacademy.dtos.UserDto;
import com.dccsacademy.entities.CertificateEntity;
import com.dccsacademy.entities.CommentEntity;
import com.dccsacademy.entities.SupplierEntity;
import com.dccsacademy.entities.UserEntity;
import com.dccsacademy.repositories.CertificateRepository;
import com.dccsacademy.repositories.CommentRepository;
import com.dccsacademy.repositories.SupplierRepository;
import com.dccsacademy.repositories.UserRepository;
import com.dccsacademy.utils.PdfUtil;
import com.dccsacademy.utils.mappers.CertificateMapper;
import com.dccsacademy.utils.mappers.CommentMapper;
import com.dccsacademy.utils.mappers.UserMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class CertificateService {

  @Inject CertificateRepository certificateRepository;

  @Inject SupplierRepository supplierRepository;

  @Inject UserRepository userRepository;

  @Inject CommentRepository commentRepository;

  public void createCertificate(CertificateDto certificateDto) {
    SupplierEntity supplier = supplierRepository.findById(certificateDto.getSupplier().getId());
    if (supplier == null) {
      throw new EntityNotFoundException(
          "Supplier with ID " + certificateDto.getSupplier() + " does not exists");
    }
    List<UserEntity> assignedUsers = getAssignedUsers(certificateDto.getAssignedUsers());
    CertificateEntity newCertificate = CertificateMapper.toEntity(certificateDto, supplier);
    newCertificate.setPdfFile(PdfUtil.decode(certificateDto.getPdfFile()));
    newCertificate.setAssignedUsers(assignedUsers);
    certificateRepository.persist(newCertificate);

    persistComments(certificateDto.getComments(), newCertificate);
  }

  public CertificateDto getCertificateById(Long id) {
    CertificateEntity certificateEntity = certificateRepository.findById(id);
    if (certificateEntity == null) {
      throw new EntityNotFoundException("Certificate with ID " + id + " does not exists");
    }
    CertificateDto certificate = CertificateMapper.toDto(certificateEntity);
    certificate.setPdfFile(PdfUtil.encode(certificateEntity.getPdfFile()));

    List<Long> assignedUsers = getUserDtos(certificateEntity.getAssignedUsers());
    List<CommentDto> comments = getCommentDtos(certificateEntity.getComments());

    certificate.setAssignedUsers(assignedUsers);
    certificate.setComments(comments);
    return certificate;
  }

  public List<CertificateDto> getAllCertificates() {
    List<CertificateEntity> certificates = certificateRepository.listAll();
    return certificates.stream().map(CertificateMapper::toDto).collect(Collectors.toList());
  }

  public CertificateDto updateCertificate(Long id, CertificateDto certificateDto) {
    CertificateEntity certificate = certificateRepository.findById(id);
    if (certificate == null) {
      throw new EntityNotFoundException("Certificate with ID " + id + " does not exist");
    }

    SupplierEntity supplier = supplierRepository.findById(certificateDto.getSupplier().getId());
    if (supplier == null) {
      throw new EntityNotFoundException(
          "Supplier with ID " + certificateDto.getSupplier() + " does not exists");
    }

    certificate.setSupplier(supplier);
    certificate.setId(certificateDto.getId());
    certificate.setCertificateType(certificateDto.getCertificateType());
    certificate.setValidFrom(certificateDto.getValidFrom());
    certificate.setValidTo(certificateDto.getValidTo());
    certificate.setPdfFile(PdfUtil.decode(certificateDto.getPdfFile()));

    List<UserEntity> assignedUsers = getAssignedUsers(certificateDto.getAssignedUsers());
    List<CommentEntity> currentComments = certificate.getComments();

    List<CommentEntity> newComments = createComments(certificateDto.getComments(), certificate);
    currentComments.clear();
    currentComments.addAll(newComments);
    certificate.setAssignedUsers(assignedUsers);

    certificateRepository.persist(certificate);

    return CertificateMapper.toDto(certificate);
  }

  public void deleteCertificate(Long id) {
    CertificateEntity certificate = certificateRepository.findById(id);
    if (certificate == null) {
      throw new EntityNotFoundException("Certificate with ID " + id + " does not exists");
    }
    certificateRepository.delete(certificate);
  }

  private List<UserEntity> getAssignedUsers(List<Long> userDtos) {
    return userDtos.stream()
        .map(
            userId -> {
              UserEntity user = userRepository.findById(userId);
              if (user == null) {
                throw new EntityNotFoundException("User with ID " + userId + " does not exists");
              }
              return user;
            })
        .collect(Collectors.toList());
  }

  private List<CommentDto> getCommentDtos(List<CommentEntity> commentEntities) {
    return commentEntities.stream()
        .map(
            commentEntity -> {
              CommentEntity comment = commentRepository.findById(commentEntity.getId());
              if (comment == null) {
                throw new EntityNotFoundException(
                    "Comment with ID " + commentEntity.getId() + " does not exist");
              }
              return CommentMapper.toDto(comment);
            })
        .collect(Collectors.toList());
  }

  private List<Long> getUserDtos(List<UserEntity> userEntities) {
    return userEntities.stream()
        .map(
            userEntity -> {
              UserDto currentUser = UserMapper.toDto(userEntity);
              currentUser.setId(userEntity.getId());
              return currentUser.getId();
            })
        .collect(Collectors.toList());
  }

  private void persistComments(List<CommentDto> commentDtos, CertificateEntity certificate) {
    if (commentDtos != null) {
      List<CommentEntity> comments = createComments(commentDtos, certificate);
      comments.forEach(commentRepository::persist);
    }
  }

  private List<CommentEntity> createComments(
      List<CommentDto> commentDtos, CertificateEntity certificate) {
    return commentDtos.stream()
        .map(
            commentDto -> {
              UserEntity commentUser = userRepository.findById(commentDto.getUserId());
              if (commentUser == null) {
                throw new EntityNotFoundException(
                    "User with ID " + commentDto.getUserId() + " does not exist");
              }
              return CommentMapper.toEntity(commentDto, certificate, commentUser);
            })
        .collect(Collectors.toList());
  }
}
