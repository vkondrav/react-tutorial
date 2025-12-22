// ============================================
// Common HOCs Demo
// Shows practical HOC patterns
// ============================================

import { useState, ComponentType } from 'react';
import { HiOutlineLockClosed, HiOutlineRefresh, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { CodeSnippet } from '../components';

// ============================================
// withAuth HOC
// ============================================

interface WithAuthProps {
  isAuthenticated?: boolean;
}

function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithAuthComponent(props: P & WithAuthProps) {
    const { isAuthenticated = false, ...restProps } = props;

    if (!isAuthenticated) {
      return (
        <div className="card bg-base-300 p-6 text-center">
          <HiOutlineLockClosed className="text-4xl text-error mx-auto mb-2" />
          <h4 className="font-semibold text-error mb-1">Access Denied</h4>
          <p className="text-sm text-base-content/60">Please log in to view this content.</p>
        </div>
      );
    }

    return <WrappedComponent {...(restProps as P)} />;
  };
}

// ============================================
// withLoading HOC
// ============================================

interface WithLoadingProps {
  isLoading?: boolean;
}

function withLoading<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithLoadingComponent(props: P & WithLoadingProps) {
    const { isLoading = false, ...restProps } = props;

    if (isLoading) {
      return (
        <div className="card bg-base-300 p-6 text-center">
          <div className="loading loading-spinner loading-lg text-primary mx-auto mb-2" />
          <p className="text-sm text-base-content/60">Loading...</p>
        </div>
      );
    }

    return <WrappedComponent {...(restProps as P)} />;
  };
}

// ============================================
// withTheme HOC
// ============================================

interface ThemeProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

function withTheme<P extends object>(WrappedComponent: ComponentType<P & ThemeProps>) {
  return function WithThemeComponent(props: P) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

    return <WrappedComponent {...props} theme={theme} toggleTheme={toggleTheme} />;
  };
}

// ============================================
// Sample Components
// ============================================

function Dashboard() {
  return (
    <div className="card bg-base-300 p-4">
      <h4 className="font-semibold text-success mb-2">🎉 Dashboard</h4>
      <p className="text-sm text-base-content/70">
        Welcome! You have access to this protected content.
      </p>
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="bg-base-200 rounded p-2 text-center">
          <p className="text-lg font-bold">128</p>
          <p className="text-xs text-base-content/60">Users</p>
        </div>
        <div className="bg-base-200 rounded p-2 text-center">
          <p className="text-lg font-bold">$4.2k</p>
          <p className="text-xs text-base-content/60">Revenue</p>
        </div>
        <div className="bg-base-200 rounded p-2 text-center">
          <p className="text-lg font-bold">94%</p>
          <p className="text-xs text-base-content/60">Uptime</p>
        </div>
      </div>
    </div>
  );
}

interface UserListProps {
  users: { id: number; name: string }[];
}

function UserList({ users }: UserListProps) {
  return (
    <div className="card bg-base-300 p-4">
      <h4 className="font-semibold mb-2">User List</h4>
      <ul className="space-y-1">
        {users.map((user) => (
          <li key={user.id} className="text-sm flex items-center gap-2">
            <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-content text-xs">
              {user.name[0]}
            </span>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThemeableCard({ theme, toggleTheme }: ThemeProps) {
  return (
    <div
      className={`p-4 rounded-lg transition-colors ${
        theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">Themeable Card</h4>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}
        >
          {theme === 'dark' ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
        </button>
      </div>
      <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
        This component receives theme props from the HOC!
      </p>
      <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
        Current theme: <strong>{theme}</strong>
      </p>
    </div>
  );
}

// ---- Enhanced Components ----
const ProtectedDashboard = withAuth(Dashboard);
const LoadableUserList = withLoading(UserList);
const ThemedCard = withTheme(ThemeableCard);

const withAuthCode = `function withAuth<P>(WrappedComponent: ComponentType<P>) {
  return function WithAuthComponent(props: P & { isAuthenticated?: boolean }) {
    const { isAuthenticated = false, ...restProps } = props;

    if (!isAuthenticated) {
      return <AccessDenied />;
    }

    return <WrappedComponent {...restProps} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);

<ProtectedDashboard isAuthenticated={false} />  // Shows Access Denied
<ProtectedDashboard isAuthenticated={true} />   // Shows Dashboard`;

const withLoadingCode = `function withLoading<P>(WrappedComponent: ComponentType<P>) {
  return function WithLoadingComponent(props: P & { isLoading?: boolean }) {
    const { isLoading = false, ...restProps } = props;

    if (isLoading) {
      return <Spinner />;
    }

    return <WrappedComponent {...restProps} />;
  };
}

// Usage
const LoadableUserList = withLoading(UserList);

<LoadableUserList isLoading={true} users={[]} />   // Shows Spinner
<LoadableUserList isLoading={false} users={data} /> // Shows UserList`;

const withThemeCode = `function withTheme<P>(WrappedComponent: ComponentType<P & ThemeProps>) {
  return function WithThemeComponent(props: P) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

    // Inject theme props into wrapped component
    return <WrappedComponent {...props} theme={theme} toggleTheme={toggleTheme} />;
  };
}

// Usage
const ThemedCard = withTheme(Card);

<ThemedCard />  // Card now has theme and toggleTheme props!`;

export default function CommonHOCsDemo() {
  const [activeTab, setActiveTab] = useState<'auth' | 'loading' | 'theme'>('auth');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mockUsers = [
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Carol White' },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab('auth')}
          className={`btn btn-sm ${activeTab === 'auth' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineLockClosed size={16} />
          withAuth
        </button>
        <button
          onClick={() => setActiveTab('loading')}
          className={`btn btn-sm ${activeTab === 'loading' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineRefresh size={16} />
          withLoading
        </button>
        <button
          onClick={() => setActiveTab('theme')}
          className={`btn btn-sm ${activeTab === 'theme' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineMoon size={16} />
          withTheme
        </button>
      </div>

      {/* withAuth */}
      {activeTab === 'auth' && (
        <div className="space-y-4">
          <CodeSnippet title="withAuth HOC" language="tsx" code={withAuthCode} />

          <div className="card bg-base-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Live Demo</h4>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm">Authenticated:</span>
                <input
                  type="checkbox"
                  checked={isAuthenticated}
                  onChange={(e) => setIsAuthenticated(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
              </label>
            </div>

            <ProtectedDashboard isAuthenticated={isAuthenticated} />
          </div>
        </div>
      )}

      {/* withLoading */}
      {activeTab === 'loading' && (
        <div className="space-y-4">
          <CodeSnippet title="withLoading HOC" language="tsx" code={withLoadingCode} />

          <div className="card bg-base-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Live Demo</h4>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm">Loading:</span>
                <input
                  type="checkbox"
                  checked={isLoading}
                  onChange={(e) => setIsLoading(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
              </label>
            </div>

            <LoadableUserList isLoading={isLoading} users={mockUsers} />
          </div>
        </div>
      )}

      {/* withTheme */}
      {activeTab === 'theme' && (
        <div className="space-y-4">
          <CodeSnippet title="withTheme HOC" language="tsx" code={withThemeCode} />

          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-4">Live Demo</h4>
            <ThemedCard />
            <p className="text-xs text-base-content/60 mt-3">
              Click the sun/moon icon to toggle theme. The HOC manages the state!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
