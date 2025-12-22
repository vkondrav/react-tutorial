// @ts-nocheck
interface ToggleProps {
  children: (isOn: boolean, toggle: () => void) => ReactNode;
  initialValue?: boolean;
}

function Toggle({ children, initialValue = false }: ToggleProps) {
  const [isOn, setIsOn] = useState(initialValue);
  const toggle = () => setIsOn((prev) => !prev);

  // Call children as a function!
  return <>{children(isOn, toggle)}</>;
}

// Usage - children IS the render function
<Toggle>{(isOn, toggle) => <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>}</Toggle>;
