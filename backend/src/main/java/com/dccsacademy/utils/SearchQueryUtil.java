package com.dccsacademy.utils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.util.List;

public class SearchQueryUtil {

    public static <T> void addCaseInsensitiveLikePredicate(List<Predicate> predicates, CriteriaBuilder cb, Root<T> root, String field, String value) {
        if (value != null && !value.trim().isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get(field)), "%" + value.trim().toLowerCase() + "%"));
        }
    }

    public static <T> void addNestedCaseInsensitiveLikePredicate(List<Predicate> predicates, CriteriaBuilder cb, Root<T> root, String nestedField, String value) {
        if (value != null && !value.trim().isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get(nestedField)), "%" + value.trim().toLowerCase() + "%"));
        }
    }

    public static <T> T findByField(Class<T> entityClass, String field, String value, EntityManager entityManager) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> query = cb.createQuery(entityClass);
        Root<T> root = query.from(entityClass);

        if (value != null && !value.trim().isEmpty()) {
            query.where(cb.equal(cb.lower(root.get(field)), value.trim().toLowerCase()));
        } else {
            return null;
        }

        return entityManager.createQuery(query).getSingleResult();
    }
}
