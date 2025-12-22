// @ts-nocheck
interface ToggleActions {
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

function useToggle(initialValue: boolean = false): [boolean, ToggleActions] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, { toggle, setTrue, setFalse }];
}
