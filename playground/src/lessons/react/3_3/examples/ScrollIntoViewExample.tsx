// @ts-nocheck
const bottomRef = useRef(null);

<div ref={bottomRef}>Bottom</div>;

bottomRef.current.scrollIntoView({ behavior: 'smooth' });
