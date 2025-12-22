// @ts-nocheck
interface WindowSize {
  width: number;
  height: number;
}

function MyComponent(): React.ReactElement {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 20+ lines just for window size!
  return <div>Width: {size.width}</div>;
}
