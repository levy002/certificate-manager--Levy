const dataFiltering = <T, C extends Record<string, string> | null>(
  item: T,
  criteria: C,
): boolean => {
  const criteriaKeys = criteria ? Object.keys(criteria) : [];
  return criteriaKeys.every((key) => {
    const itemValue = String(item[key as keyof T])
      .toLowerCase()
      .replace(/\s+/g, '');
    const criteriaValue = String(criteria ? criteria[key] : '')
      .toLowerCase()
      .replace(/\s+/g, '');

    if (!criteriaValue) {
      return true;
    }

    return itemValue.includes(criteriaValue);
  });
};

export default dataFiltering;
