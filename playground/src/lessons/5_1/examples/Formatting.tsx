// @ts-nocheck
const formatPhone = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  // ... formatting logic
};

<input value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} />;
