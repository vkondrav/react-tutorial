// @ts-nocheck
const [text, setText] = useState('');

<input type="text" value={text} onChange={(e) => setText(e.target.value)} />;
