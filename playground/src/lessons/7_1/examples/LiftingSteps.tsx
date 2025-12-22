// @ts-nocheck
// Step 1: Identify what state needs to be shared
// Both components need to know the temperature

// Step 2: Find the closest common ancestor
// TemperatureCalculator is parent of both inputs

// Step 3: Move state UP to the parent
function TemperatureCalculator() {
  // State lives here now (lifted up!)
  const [celsius, setCelsius] = useState('');

  const fahrenheit = celsius ? ((parseFloat(celsius) * 9) / 5 + 32).toFixed(1) : '';

  return (
    <div>
      <TemperatureInput scale="celsius" value={celsius} onChange={setCelsius} />
      <TemperatureInput
        scale="fahrenheit"
        value={fahrenheit}
        onChange={(f) => {
          const c = ((parseFloat(f) - 32) * 5) / 9;
          setCelsius(isNaN(c) ? '' : c.toFixed(1));
        }}
      />
    </div>
  );
}

// Step 4: Children become "controlled" - they receive value & onChange
function TemperatureInput({ scale, value, onChange }) {
  return (
    <label>
      {scale === 'celsius' ? '°C' : '°F'}:
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
