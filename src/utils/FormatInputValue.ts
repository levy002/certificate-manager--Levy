const formatValue = (
  type: 'text' | 'date',
  value: string | Date | null,
): string => {
  if (type === 'date' && value instanceof Date) {
    return value.toISOString().split('T')[0];
  }
  if (value !== null) {
    return String(value);
  }
  return '';
};

export default formatValue;
