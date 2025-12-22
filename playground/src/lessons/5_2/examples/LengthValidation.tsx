// @ts-nocheck
const validate = (value: string) => {
  if (value.length < 3) return 'Minimum 3 characters';
  if (value.length > 20) return 'Maximum 20 characters';
  return '';
};
