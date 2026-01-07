// @ts-nocheck
function ControlledInput() {
  // Step 1: Create state to hold the input value
  const [name, setName] = useState('');

  return (
    <div>
      {/* Step 2: Connect state to input */}
      <input
        type="text"
        value={name} // Controlled by state
        onChange={(e) => setName(e.target.value)} // Update state on change
      />

      {/* Step 3: Use the value anywhere! */}
      <p>Hello, {name}!</p>
      <p>Characters: {name.length}</p>
    </div>
  );
}
