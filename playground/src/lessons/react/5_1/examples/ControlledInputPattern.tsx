// @ts-nocheck
const [value, setValue] = useState('');

<input value={value} onChange={(e) => setValue(e.target.value)} />;

// Value always available:
console.log(value);
