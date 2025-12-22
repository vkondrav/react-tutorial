// @ts-nocheck
interface PhoneEntry {
  id: string;
  type: string;
  number: string;
}

// State: array of objects with unique IDs
const [phones, setPhones] = useState<PhoneEntry[]>([
  { id: crypto.randomUUID(), type: 'mobile', number: '' },
]);

// Add: append new item with unique ID
const addPhone = () => {
  setPhones((prev) => [...prev, { id: crypto.randomUUID(), type: 'mobile', number: '' }]);
};

// Remove: filter out by ID
const removePhone = (id: string) => {
  setPhones((prev) => prev.filter((p) => p.id !== id));
};

// Update: map and update matching ID
const updatePhone = (id: string, field: keyof PhoneEntry, value: string) => {
  setPhones((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
};

// Render with ID as key (NOT index!)
{
  phones.map((phone) => <div key={phone.id}>...</div>);
}
