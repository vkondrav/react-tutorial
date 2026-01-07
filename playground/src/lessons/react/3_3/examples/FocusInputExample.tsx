// @ts-nocheck
const inputRef = useRef(null);

<input ref={inputRef} />;

inputRef.current.focus(); // Focus the input
inputRef.current.select(); // Select all text
