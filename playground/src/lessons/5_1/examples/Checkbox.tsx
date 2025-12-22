// @ts-nocheck
const [agreed, setAgreed] = useState(false);

// Use "checked" not "value"!
<input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />;
