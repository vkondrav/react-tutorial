// @ts-nocheck
// Generic hook - type is inferred from initial value
const [name, setName] = useLocalStorage<string>('user-name', '');
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
const [count, setCount] = useLocalStorage<number>('counter', 0);
