// @ts-nocheck
// Simple required check
const validate = (value: string) => {
  if (!value.trim()) {
    return 'This field is required';
  }
  return '';
};
