// ============================================
// Compound Components Basics Demo
// ============================================

import { useState } from 'react';
import { HiCheck, HiX, HiOutlineLightBulb, HiChevronDown, HiChevronRight } from 'react-icons/hi';
import { CodeSnippet } from '../components';

// -------------------------------------------
// Traditional Props Approach (The Problem)
// -------------------------------------------
interface TraditionalTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
}

function TraditionalTabs({ tabs }: TraditionalTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div>
      <div className="flex border-b border-base-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            disabled={tab.disabled}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : tab.disabled
                ? 'text-base-content/30 cursor-not-allowed'
                : 'text-base-content/60 hover:text-base-content'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}

const traditionalCode = `// ❌ Traditional approach: config object
<Tabs
  tabs={[
    { id: 'home', label: 'Home', content: <HomePanel /> },
    { id: 'profile', label: 'Profile', content: <ProfilePanel /> },
    { id: 'settings', label: 'Settings', content: <SettingsPanel />, disabled: true }
  ]}
/>

// Problems:
// 1. Complex, nested configuration
// 2. Hard to add custom rendering
// 3. Limited flexibility in layout
// 4. JSX mixed with config objects`;

// -------------------------------------------
// Compound Components Approach (The Solution)
// -------------------------------------------
import React, { createContext, useContext, ReactNode } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within <Tabs>');
  }
  return context;
}

// Parent component
interface TabsProps {
  children: ReactNode;
  defaultTab: string;
}

function Tabs({ children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

// Tab list container
interface TabListProps {
  children: ReactNode;
}

function TabList({ children }: TabListProps) {
  return <div className="flex border-b border-base-300">{children}</div>;
}

// Individual tab
interface TabProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

function Tab({ id, children, disabled }: TabProps) {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <button
      onClick={() => !disabled && setActiveTab(id)}
      disabled={disabled}
      className={`px-4 py-2 font-medium transition-colors ${
        activeTab === id
          ? 'text-primary border-b-2 border-primary'
          : disabled
          ? 'text-base-content/30 cursor-not-allowed'
          : 'text-base-content/60 hover:text-base-content'
      }`}
    >
      {children}
    </button>
  );
}

// Tab panel
interface TabPanelProps {
  id: string;
  children: ReactNode;
}

function TabPanel({ id, children }: TabPanelProps) {
  const { activeTab } = useTabsContext();
  if (activeTab !== id) return null;
  return <div className="p-4">{children}</div>;
}

// Attach sub-components as static properties
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

const compoundCode = `// ✅ Compound components approach
<Tabs defaultTab="home">
  <Tabs.List>
    <Tabs.Tab id="home">🏠 Home</Tabs.Tab>
    <Tabs.Tab id="profile">👤 Profile</Tabs.Tab>
    <Tabs.Tab id="settings" disabled>⚙️ Settings</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel id="home">
    <h3>Welcome Home!</h3>
    <p>This is your dashboard.</p>
  </Tabs.Panel>
  <Tabs.Panel id="profile">
    <ProfileForm />
  </Tabs.Panel>
  <Tabs.Panel id="settings">
    <SettingsPanel />
  </Tabs.Panel>
</Tabs>

// Benefits:
// 1. Natural JSX structure
// 2. Full control over rendering
// 3. Easy to add icons, badges, etc.
// 4. Type-safe and discoverable API`;

export default function CompoundBasicsDemo(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Explanation */}
      <div className="card bg-base-200 p-4">
        <div className="flex items-start gap-3">
          <HiOutlineLightBulb className="text-warning mt-1 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-warning mb-1">Think of HTML's native elements</p>
            <p className="text-base-content/70 text-sm">
              Just like <code className="text-accent">&lt;select&gt;</code> and{' '}
              <code className="text-accent">&lt;option&gt;</code> work together,
              compound components are designed to be used as a <strong>family</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Traditional Approach */}
        <div className="card bg-base-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <HiX className="text-error" size={18} />
            <h4 className="font-semibold text-error">Traditional: Config Object</h4>
          </div>
          <div className="bg-base-300 rounded-lg p-4">
            <TraditionalTabs
              tabs={[
                { id: 'home', label: '🏠 Home', content: <p>Welcome to the home tab!</p> },
                { id: 'profile', label: '👤 Profile', content: <p>Your profile info here.</p> },
                { id: 'settings', label: '⚙️ Settings', content: <p>Settings content.</p>, disabled: true },
              ]}
            />
          </div>
          <p className="text-xs text-base-content/50 mt-2">
            Everything crammed into one prop array
          </p>
        </div>

        {/* Compound Approach */}
        <div className="card bg-base-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <HiCheck className="text-success" size={18} />
            <h4 className="font-semibold text-success">Compound: Natural JSX</h4>
          </div>
          <div className="bg-base-300 rounded-lg p-4">
            <Tabs defaultTab="home">
              <Tabs.List>
                <Tabs.Tab id="home">🏠 Home</Tabs.Tab>
                <Tabs.Tab id="profile">👤 Profile</Tabs.Tab>
                <Tabs.Tab id="settings" disabled>⚙️ Settings</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel id="home">
                <p>Welcome to the home tab!</p>
              </Tabs.Panel>
              <Tabs.Panel id="profile">
                <p>Your profile info here.</p>
              </Tabs.Panel>
              <Tabs.Panel id="settings">
                <p>Settings content.</p>
              </Tabs.Panel>
            </Tabs>
          </div>
          <p className="text-xs text-base-content/50 mt-2">
            Clean, declarative JSX structure
          </p>
        </div>
      </div>

      {/* Code Toggle */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="btn btn-sm btn-ghost gap-2"
      >
        {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showCode ? 'Hide' : 'Show'} Code Comparison
      </button>

      {showCode && (
        <div className="grid md:grid-cols-2 gap-4">
          <CodeSnippet
            title="Traditional Approach"
            language="tsx"
            code={traditionalCode}
          />
          <CodeSnippet
            title="Compound Components"
            language="tsx"
            code={compoundCode}
          />
        </div>
      )}

      {/* Key Points */}
      <div className="card bg-linear-to-r from-primary/10 to-secondary/10 p-4">
        <h4 className="font-semibold mb-3 text-primary">Why Compound Components?</h4>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span><strong>Flexible:</strong> Users control the structure</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span><strong>Readable:</strong> Natural JSX hierarchy</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span><strong>Encapsulated:</strong> Logic stays in parent</span>
          </div>
        </div>
      </div>
    </div>
  );
}

