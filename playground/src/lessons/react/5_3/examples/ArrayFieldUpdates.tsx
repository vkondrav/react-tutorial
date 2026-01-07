// @ts-nocheck
// State with array field
const [form, setForm] = useState<{ name: string; skills: string[] }>({
  name: '',
  skills: ['React', 'TypeScript'],
});

// Add to array: spread existing + new item
const addSkill = (newSkill: string) => {
  setForm((prev) => ({
    ...prev,
    skills: [...prev.skills, newSkill],
  }));
};

// Remove from array: filter out by index
const removeSkill = (index: number) => {
  setForm((prev) => ({
    ...prev,
    skills: prev.skills.filter((_, i) => i !== index),
  }));
};
