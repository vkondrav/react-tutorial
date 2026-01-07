// @ts-nocheck
const [plan, setPlan] = useState('');

// Check if this radio's value matches state
<>
  <input
    type="radio"
    name="plan"
    value="free"
    checked={plan === 'free'}
    onChange={(e) => setPlan(e.target.value)}
  />
  <input
    type="radio"
    name="plan"
    value="pro"
    checked={plan === 'pro'}
    onChange={(e) => setPlan(e.target.value)}
  />
</>;
