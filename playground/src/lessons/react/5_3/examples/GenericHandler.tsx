// @ts-nocheck
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;
  const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

  setForm((prev) => ({ ...prev, [name]: newValue }));
};

<>
  // Works for ALL input types!
  <input type="text" name="email" onChange={handleChange} />
  <input type="checkbox" name="subscribe" onChange={handleChange} />
  <select name="plan" onChange={handleChange}>
    ...
  </select>
</>;
