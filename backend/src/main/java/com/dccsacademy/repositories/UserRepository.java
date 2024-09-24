package com.dccsacademy.repositories;

import com.dccsacademy.entities.UserEntity;
import com.dccsacademy.utils.SearchQueryUtil;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class UserRepository implements PanacheRepository<UserEntity> {
    @Inject
    DepartmentRepository departmentRepository;

    public UserEntity findByEmail(String email) {
        return SearchQueryUtil.findByField(UserEntity.class, "email", email, getEntityManager());
    }

    public UserEntity findByUserId(String userId) {
        return SearchQueryUtil.findByField(UserEntity.class, "userId", userId, getEntityManager());
    }

    public List<UserEntity> searchUsers(String userId, String firstName, String lastName, String departmentName, String plant) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<UserEntity> query = cb.createQuery(UserEntity.class);
        Root<UserEntity> user = query.from(UserEntity.class);
        List<Predicate> predicates = new ArrayList<>();

        SearchQueryUtil.addCaseInsensitiveLikePredicate(predicates, cb, user, "firstName", firstName);
        SearchQueryUtil.addCaseInsensitiveLikePredicate(predicates, cb, user, "lastName", lastName);
        SearchQueryUtil.addCaseInsensitiveLikePredicate(predicates, cb, user, "plant", plant);
        SearchQueryUtil.addCaseInsensitiveLikePredicate(predicates, cb, user, "userId", userId);

        if (departmentName != null && !departmentName.trim().isEmpty()) {
            var department = departmentRepository.findByName(departmentName);
            if(department != null) {
                predicates.add(cb.equal(cb.lower(user.get("department").get("name")), departmentName.trim().toLowerCase()));
            }
        }

        query.where(predicates.toArray(new Predicate[0]));

        return getEntityManager().createQuery(query).getResultList();
    }
}
