// ============================================
// Demo: Using Multiple Contexts
// ============================================

import { createContext, useContext, useState } from 'react';
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiUser,
  HiOutlineLogout,
  HiOutlineLogin,
  HiOutlineLightBulb,
} from 'react-icons/hi';

// Theme Context
const ThemeContext = createContext('light');

// Auth Context
const AuthContext = createContext(null);

// Consumer components
function Header() {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);

  return (
    <div
      className={`flex justify-between items-center p-3 rounded-t-lg border-b ${
        theme === 'dark'
          ? 'bg-slate-800 border-slate-700 text-white'
          : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      <div className="font-semibold text-sm">MyApp</div>
      <div className="flex items-center gap-2">
        {theme === 'dark' ? (
          <HiOutlineMoon size={16} className="text-yellow-400" />
        ) : (
          <HiOutlineSun size={16} className="text-orange-400" />
        )}
        {auth.user ? (
          <span className="text-xs px-2 py-1 rounded bg-success/20 text-success">
            {auth.user.name}
          </span>
        ) : (
          <span className="text-xs px-2 py-1 rounded bg-base-content/10">Guest</span>
        )}
      </div>
    </div>
  );
}

function Sidebar() {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);

  return (
    <div
      className={`w-24 p-2 border-r ${
        theme === 'dark'
          ? 'bg-slate-800 border-slate-700 text-white'
          : 'bg-gray-50 border-gray-200 text-gray-900'
      }`}
    >
      <div className="text-xs text-base-content/50 mb-2">Sidebar</div>
      <div className="space-y-1">
        <div
          className={`text-xs p-1 rounded ${
            theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'
          }`}
        >
          Home
        </div>
        {auth.user && (
          <div
            className={`text-xs p-1 rounded ${
              theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'
            }`}
          >
            Dashboard
          </div>
        )}
        <div
          className={`text-xs p-1 rounded ${
            theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'
          }`}
        >
          About
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);

  return (
    <div
      className={`flex-1 p-3 ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="text-xs text-base-content/50 mb-2">Main Content</div>
      {auth.user ? (
        <div>
          <p className="text-sm mb-2">Welcome back, {auth.user.name}!</p>
          <button onClick={auth.logout} className="btn btn-xs btn-error gap-1">
            <HiOutlineLogout size={12} />
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="text-sm mb-2">Please log in to continue</p>
          <button onClick={auth.login} className="btn btn-xs btn-primary gap-1">
            <HiOutlineLogin size={12} />
            Login
          </button>
        </div>
      )}
    </div>
  );
}

function MiniApp() {
  return (
    <div className="rounded-lg overflow-hidden border border-base-content/20">
      <Header />
      <div className="flex h-32">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default function MultipleContextsDemo() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  const authValue = {
    user,
    login: () => setUser({ name: 'Jordan', role: 'User' }),
    logout: () => setUser(null),
  };

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Two Contexts, One App
      </h3>

      {/* Controls */}
      <div className="flex gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">Theme:</span>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`btn btn-sm gap-1 ${theme === 'dark' ? 'btn-warning' : 'btn-ghost'}`}
          >
            {theme === 'dark' ? (
              <>
                <HiOutlineMoon size={14} /> Dark
              </>
            ) : (
              <>
                <HiOutlineSun size={14} /> Light
              </>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">Auth:</span>
          <span className={`badge ${user ? 'badge-success' : 'badge-ghost'}`}>
            {user ? (
              <>
                <HiUser size={12} className="mr-1" /> {user.name}
              </>
            ) : (
              'Logged out'
            )}
          </span>
        </div>
      </div>

      {/* Nested Providers */}
      <div className="border border-primary/30 rounded-lg p-3 bg-primary/5 mb-4">
        <div className="text-xs text-primary font-semibold mb-2">
          ThemeContext.Provider value="{theme}"
        </div>
        <div className="border border-secondary/30 rounded-lg p-3 bg-secondary/5">
          <div className="text-xs text-secondary font-semibold mb-2">
            AuthContext.Provider value={'{user, login, logout}'}
          </div>
          <ThemeContext.Provider value={theme}>
            <AuthContext.Provider value={authValue}>
              <MiniApp />
            </AuthContext.Provider>
          </ThemeContext.Provider>
        </div>
      </div>

      {/* Explanation */}
      <div className="p-3 rounded-lg bg-base-300">
        <div className="text-xs font-semibold mb-2">How Components Use Both:</div>
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            <span className="text-secondary">function</span>{' '}
            <span className="text-primary">Header</span>
            {'() {'}
            {'\n'}
            {'  '}
            <span className="text-secondary">const</span>
            {' theme = '}
            <span className="text-primary">useContext</span>
            {'(ThemeContext);'}
            {'  '}
            <span className="text-base-content/60">// "dark" or "light"</span>
            {'\n'}
            {'  '}
            <span className="text-secondary">const</span>
            {' auth  = '}
            <span className="text-primary">useContext</span>
            {'(AuthContext);'}
            {'   '}
            <span className="text-base-content/60">// {'{ user, login, logout }'}</span>
            {'\n'}
            {'  '}
            <span className="text-base-content/60">// ...</span>
            {'\n'}
            {'}'}
          </code>
        </pre>
      </div>
    </div>
  );
}
