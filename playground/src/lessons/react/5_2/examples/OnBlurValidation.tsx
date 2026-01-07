// @ts-nocheck
const handleBlur = () => {
  setTouched(true);
  setError(validate(email));
};

// Only show error if touched
{
  touched && error && <span>{error}</span>;
}
