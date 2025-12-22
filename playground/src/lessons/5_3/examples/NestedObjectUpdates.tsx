// @ts-nocheck
// Spread at BOTH levels for nested updates
const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev, // Keep other top-level fields
    address: {
      ...prev.address, // Keep other address fields
      [name]: value, // Update specific field
    },
  }));
};
