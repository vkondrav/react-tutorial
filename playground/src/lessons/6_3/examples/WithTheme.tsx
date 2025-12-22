// @ts-nocheck
function withTheme<P>(WrappedComponent: ComponentType<P & ThemeProps>) {
  return function WithThemeComponent(props: P) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

    // Inject theme props into wrapped component
    return <WrappedComponent {...props} theme={theme} toggleTheme={toggleTheme} />;
  };
}

// Usage
const ThemedCard = withTheme(Card);

<ThemedCard />; // Card now has theme and toggleTheme props!
