// @ts-nocheck
const handleChange = (e) => {
  const value = e.target.value;
  setEmail(value);
  setError(validate(value)); // Validate immediately
};
