// @ts-nocheck
const [bio, setBio] = useState('');

// Same pattern as text input!
<textarea value={bio} onChange={(e) => setBio(e.target.value)} />;
