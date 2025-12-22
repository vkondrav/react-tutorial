// @ts-nocheck
const handleSubmit = (e) => {
  e.preventDefault();
  const error = validate(form.email);
  setError(error);
  if (!error) {
    // Submit form...
  }
};
