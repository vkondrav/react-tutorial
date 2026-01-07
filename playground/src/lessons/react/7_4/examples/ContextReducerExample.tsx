// @ts-nocheck
// Context + Reducer - Global state for medium apps
const ThemeContext = createContext<ThemeState | null>(null);
const ThemeDispatch = createContext<Dispatch<ThemeAction> | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  return (
    <ThemeContext.Provider value={state}>
      <ThemeDispatch.Provider value={dispatch}>{children}</ThemeDispatch.Provider>
    </ThemeContext.Provider>
  );
}

// Clean custom hooks
export const useTheme = () => useContext(ThemeContext)!;
export const useThemeDispatch = () => useContext(ThemeDispatch)!;
