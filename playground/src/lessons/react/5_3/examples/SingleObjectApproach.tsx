// @ts-nocheck
// One state object
const [form, setForm] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
});

// One handler for ALL inputs
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};

<>
  // All inputs use the same handler
  <input name="firstName" onChange={handleChange} />
  <input name="lastName" onChange={handleChange} />
</>;
