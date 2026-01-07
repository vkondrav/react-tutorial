// @ts-nocheck
const ref = useRef(null);

<input ref={ref} defaultValue="initial" />;

// Read value when needed:
const val = ref.current.value;
