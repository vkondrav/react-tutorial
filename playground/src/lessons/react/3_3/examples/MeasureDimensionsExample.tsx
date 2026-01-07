// @ts-nocheck
const boxRef = useRef(null);

const rect = boxRef.current.getBoundingClientRect();
console.log(rect.width, rect.height);
