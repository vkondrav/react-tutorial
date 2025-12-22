// @ts-nocheck
// Store interval ID in a ref
const intervalRef = useRef(null);

const start = () => {
  intervalRef.current = setInterval(() => {
    setSeconds((s) => s + 1);
  }, 1000);
};

const pause = () => {
  clearInterval(intervalRef.current);
};
