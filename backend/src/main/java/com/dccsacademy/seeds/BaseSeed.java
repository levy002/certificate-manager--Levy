package com.dccsacademy.seeds;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import java.util.List;

@Transactional
public abstract class BaseSeed<T> {

  @PostConstruct
  public void seed() {
    if (isEmpty()) {
      seedData(getSeedData());
    }
  }

  protected abstract boolean isEmpty();

  protected abstract List<T> getSeedData();

  protected abstract void createEntity(T dto);

  private void seedData(List<T> data) {
    for (T dto : data) {
      createEntity(dto);
    }
  }
}
