// @ts-nocheck
const rules = [
  { test: (v) => v.length >= 8, label: '8+ chars' },
  { test: (v) => /[A-Z]/.test(v), label: 'Uppercase' },
  { test: (v) => /[0-9]/.test(v), label: 'Number' },
  // ... more rules
];

// Check all rules
const errors = rules.filter((r) => !r.test(password)).map((r) => r.label);
