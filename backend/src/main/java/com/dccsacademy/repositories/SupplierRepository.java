package com.dccsacademy.repositories;

import com.dccsacademy.entities.SupplierEntity;
import com.dccsacademy.utils.SearchQueryUtil;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class SupplierRepository implements PanacheRepository<SupplierEntity> {

  public List<SupplierEntity> searchSuppliers(String id, String name, String city) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<SupplierEntity> query = cb.createQuery(SupplierEntity.class);
    Root<SupplierEntity> supplier = query.from(SupplierEntity.class);
    List<Predicate> predicates = new ArrayList<>();

    SearchQueryUtil.addCaseInsensitiveLikePredicate(predicates, cb, supplier, "name", name);
    SearchQueryUtil.addCaseInsensitiveLikePredicate(predicates, cb, supplier, "city", city);

    Long index = (id != null && !id.isEmpty()) ? Long.parseLong(id) : null;
    if (index != null) {
      predicates.add(cb.equal(supplier.get("id"), index));
    }

    query.where(predicates.toArray(new Predicate[0]));

    return getEntityManager().createQuery(query).getResultList();
  }
}
