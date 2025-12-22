// @ts-nocheck
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (value: string) => {
  if (!emailPattern.test(value)) {
    return 'Invalid email format';
  }
  return '';
};
