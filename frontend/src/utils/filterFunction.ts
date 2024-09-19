const dataFiltering = <T, C extends object>(item: T, criteria: C): boolean => {
  return Object.keys(criteria).every((key) => {
    const itemValue = String(item[key as keyof T])
      .toLowerCase()
      .replace(/\s+/g, '');
    const criteriaValue = String(criteria[key as keyof C])
      .toLowerCase()
      .replace(/\s+/g, '');

    if (!criteriaValue) {
      return true;
    }

    return itemValue.includes(criteriaValue);
  });
};

export default dataFiltering;
