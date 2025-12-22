// ============================================
// Playground: Build an App with Context
// ============================================

import { createContext, useContext, useState } from 'react';
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineLogin,
  HiOutlineHome,
  HiOutlineCollection,
  HiOutlineChartBar,
  HiOutlineChat,
} from 'react-icons/hi';

// =====================
// Context Definitions
// =====================

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

const NotificationContext = createContext({
  notifications: [],
  addNotification: () => {},
  clearNotifications: () => {},
});

// Custom hooks for cleaner consumption
function useTheme() {
  return useContext(ThemeContext);
}

function useUser() {
  return useContext(UserContext);
}

function useNotifications() {
  return useContext(NotificationContext);
}

// =====================
// UI Components
// =====================

function NavItem({ label, active = false }) {
  const { theme } = useTheme();

  return (
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full text-left text-sm transition-colors ${
        active
          ? theme === 'dark'
            ? 'bg-primary text-white'
            : 'bg-primary text-white'
          : theme === 'dark'
            ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

function Sidebar() {
  const { theme } = useTheme();
  const { user } = useUser();

  return (
    <aside
      className={`w-48 p-3 border-r ${
        theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
      }`}
    >
      <div
        className={`font-bold text-lg mb-4 px-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        Dashboard
      </div>
      <nav className="space-y-1">
        <NavItem icon={HiOutlineHome} label="Home" active />
        <NavItem icon={HiOutlineChartBar} label="Analytics" />
        <NavItem icon={HiOutlineCollection} label="Projects" />
        {user && <NavItem icon={HiOutlineChat} label="Messages" />}
        <NavItem icon={HiOutlineCog} label="Settings" />
      </nav>
    </aside>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, login } = useUser();
  const { notifications, clearNotifications } = useNotifications();

  return (
    <header
      className={`flex items-center justify-between px-4 py-3 border-b ${
        theme === 'dark'
          ? 'bg-slate-800 border-slate-700 text-white'
          : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      <div className="text-sm text-base-content/60">Welcome {user ? user.name : 'Guest'}!</div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'hover:bg-slate-700 text-yellow-400'
              : 'hover:bg-gray-100 text-orange-400'
          }`}
          title="Toggle theme"
        >
          {theme === 'dark' ? <HiOutlineMoon size={20} /> : <HiOutlineSun size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={clearNotifications}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
            }`}
            title={notifications.length > 0 ? 'Clear notifications' : 'No notifications'}
          >
            <HiOutlineBell size={20} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
        </div>

        {/* User Menu */}
        {user ? (
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-primary' : 'bg-primary'
              }`}
            >
              <HiOutlineUser className="text-white" size={16} />
            </div>
            <button
              onClick={logout}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-slate-700 text-red-400'
                  : 'hover:bg-gray-100 text-red-500'
              }`}
              title="Logout"
            >
              <HiOutlineLogout size={20} />
            </button>
          </div>
        ) : (
          <button onClick={login} className="btn btn-primary btn-sm gap-1">
            <HiOutlineLogin size={16} />
            Login
          </button>
        )}
      </div>
    </header>
  );
}

function StatsCard({ title, value, change, positive }) {
  const { theme } = useTheme();

  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'}`}>
      <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
        {title}
      </div>
      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </div>
      <div className={`text-xs ${positive ? 'text-success' : 'text-error'}`}>
        {positive ? '↑' : '↓'} {change}
      </div>
    </div>
  );
}

function MainContent() {
  const { theme } = useTheme();
  const { user } = useUser();
  const { addNotification } = useNotifications();

  return (
    <main className={`flex-1 p-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {user ? (
        <div className="space-y-4">
          <h2
            className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            Your Dashboard
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <StatsCard title="Revenue" value="$12,450" change="12%" positive />
            <StatsCard title="Users" value="1,234" change="8%" positive />
            <StatsCard title="Bounce Rate" value="24%" change="3%" positive={false} />
          </div>
          <button
            onClick={() => addNotification({ id: Date.now(), message: 'New data available!' })}
            className="btn btn-sm btn-primary"
          >
            Simulate Notification
          </button>
        </div>
      ) : (
        <div
          className={`h-full flex flex-col items-center justify-center ${
            theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
          }`}
        >
          <HiOutlineUser size={48} className="mb-2 opacity-50" />
          <p>Please log in to see your dashboard</p>
        </div>
      )}
    </main>
  );
}

// =====================
// Main Playground
// =====================

export default function ContextPlayground() {
  // Theme state
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  // User state
  const [user, setUser] = useState(null);
  const login = () => setUser({ name: 'Alex', email: 'alex@example.com' });
  const logout = () => setUser(null);

  // Notification state
  const [notifications, setNotifications] = useState([]);
  const addNotification = (n) => setNotifications((prev) => [...prev, n]);
  const clearNotifications = () => setNotifications([]);

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4">Interactive Dashboard Demo</h3>

      {/* Context structure visualization */}
      <div className="text-xs text-base-content/60 mb-2">Context Providers wrapping the app:</div>
      <div className="flex gap-2 flex-wrap mb-4">
        <span className="badge badge-primary">ThemeContext</span>
        <span className="badge badge-secondary">UserContext</span>
        <span className="badge badge-accent">NotificationContext</span>
      </div>

      {/* Wrap everything in providers */}
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <UserContext.Provider value={{ user, login, logout }}>
          <NotificationContext.Provider
            value={{ notifications, addNotification, clearNotifications }}
          >
            <div className="rounded-lg overflow-hidden border border-base-content/20">
              <div className="flex flex-col h-80">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <MainContent />
                </div>
              </div>
            </div>
          </NotificationContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>

      {/* Current state display */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="card bg-base-300 p-3">
          <div className="text-xs text-primary font-semibold mb-1">Theme</div>
          <div className="text-sm">{theme}</div>
        </div>
        <div className="card bg-base-300 p-3">
          <div className="text-xs text-secondary font-semibold mb-1">User</div>
          <div className="text-sm">{user ? user.name : 'null'}</div>
        </div>
        <div className="card bg-base-300 p-3">
          <div className="text-xs text-accent font-semibold mb-1">Notifications</div>
          <div className="text-sm">{notifications.length}</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
        <div className="text-sm">
          <strong className="text-primary">Try it out:</strong>{' '}
          <span className="text-base-content/70">
            Toggle the theme, log in/out, and trigger notifications. Notice how deeply nested
            components (Sidebar, Header, MainContent) all react to context changes without any prop
            drilling!
          </span>
        </div>
      </div>
    </div>
  );
}
