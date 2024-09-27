package com.dccsacademy.repositories;

import com.dccsacademy.entities.CertificateEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CertificateRepository implements PanacheRepository<CertificateEntity> {
}
