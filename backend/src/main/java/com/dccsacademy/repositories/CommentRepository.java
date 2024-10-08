package com.dccsacademy.repositories;

import com.dccsacademy.entities.CommentEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CommentRepository implements PanacheRepository<CommentEntity> {}
