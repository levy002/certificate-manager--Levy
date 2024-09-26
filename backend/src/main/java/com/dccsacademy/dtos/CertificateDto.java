package com.dccsacademy.dtos;

import com.dccsacademy.utils.enums.CertificateType;

import java.time.LocalDate;
import java.util.List;

public class CertificateDto {
    private Long id;
    private CertificateType certificateType;
    private LocalDate validFrom;
    private LocalDate validTo;
    private String pdfFile;
    private Long supplierId;
    private List<UserDto> assignedUsers;
    private List<CommentDto> comments;

  // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CertificateType getCertificateType() {
        return certificateType;
    }

    public void setCertificateType(CertificateType certificateType) {
        this.certificateType = certificateType;
    }

    public LocalDate getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(LocalDate validFrom) {
        this.validFrom = validFrom;
    }

    public String getPdfFile() {
        return pdfFile;
    }

    public void setPdfFile(String pdfFile) {
        this.pdfFile = pdfFile;
    }

    public LocalDate getValidTo() {
        return validTo;
    }

    public void setValidTo(LocalDate validTo) {
        this.validTo = validTo;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    public List<UserDto> getAssignedUsers() {
        return assignedUsers;
    }

    public void setAssignedUsers(List<UserDto> assignedUsers) {
        this.assignedUsers = assignedUsers;
    }

    public List<CommentDto> getComments() {
        return comments;
    }

    public void setComments(List<CommentDto> comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "CertificateDto{" +
                "id=" + id +
                ", certificateType=" + certificateType +
                ", validFrom=" + validFrom +
                ", validTo=" + validTo +
                ", pdfFile='" + pdfFile + '\'' +
                ", supplierId=" + supplierId +
                ", assignedUsers=" + assignedUsers +
                ", comments=" + comments +
                '}';
    }
}
