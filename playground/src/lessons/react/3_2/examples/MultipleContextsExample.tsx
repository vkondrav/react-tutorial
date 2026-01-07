// @ts-nocheck
function Header() {
  const theme = useContext(ThemeContext); // "dark" or "light"
  const auth = useContext(AuthContext); // { user, login, logout }
  // ...
}
