// @ts-nocheck
const [framework, setFramework] = useState('');

// value goes on <select>, not <option>
<select value={framework} onChange={(e) => setFramework(e.target.value)}>
  <option value="">Choose...</option>
  <option value="react">React</option>
  <option value="vue">Vue</option>
</select>;
