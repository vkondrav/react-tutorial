// ============================================
// Compound Components Playground
// ============================================

import { useState, createContext, useContext, ReactNode } from 'react';
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineBell,
  HiChevronDown,
  HiChevronRight,
  HiCheck,
  HiOutlineMenuAlt2,
  HiX,
} from 'react-icons/hi';

// ===========================================
// Demo 1: Tabs Component
// ===========================================

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs components must be used within <Tabs>');
  return context;
}

interface TabsProps {
  children: ReactNode;
  defaultTab: string;
  onChange?: (tabId: string) => void;
}

function Tabs({ children, defaultTab, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleSetActiveTab = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleSetActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  children: ReactNode;
  className?: string;
}

function TabList({ children, className = '' }: TabListProps) {
  return <div className={`flex border-b border-base-300 ${className}`}>{children}</div>;
}

interface TabProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

function Tab({ id, children, disabled }: TabProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => !disabled && setActiveTab(id)}
      disabled={disabled}
      className={`px-4 py-3 font-medium transition-all flex items-center gap-2 ${
        isActive
          ? 'text-primary border-b-2 border-primary -mb-px'
          : disabled
            ? 'text-base-content/30 cursor-not-allowed'
            : 'text-base-content/60 hover:text-base-content hover:bg-base-200'
      }`}
    >
      {children}
    </button>
  );
}

interface TabPanelProps {
  id: string;
  children: ReactNode;
}

function TabPanel({ id, children }: TabPanelProps) {
  const { activeTab } = useTabsContext();
  if (activeTab !== id) return null;
  return <div className="p-4">{children}</div>;
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// ===========================================
// Demo 2: Menu/Dropdown Component
// ===========================================

interface MenuContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const MenuContext = createContext<MenuContextType | null>(null);

function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) throw new Error('Menu components must be used within <Menu>');
  return context;
}

interface MenuProps {
  children: ReactNode;
}

function Menu({ children }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <MenuContext.Provider value={{ isOpen, toggle, close }}>
      <div className="relative inline-block">{children}</div>
    </MenuContext.Provider>
  );
}

interface MenuButtonProps {
  children: ReactNode;
  className?: string;
}

function MenuButton({ children, className = '' }: MenuButtonProps) {
  const { toggle, isOpen } = useMenuContext();

  return (
    <button onClick={toggle} className={`btn ${className}`}>
      {children}
      {isOpen ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
    </button>
  );
}

interface MenuListProps {
  children: ReactNode;
}

function MenuList({ children }: MenuListProps) {
  const { isOpen } = useMenuContext();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-base-200 rounded-lg shadow-xl border border-base-300 py-1 z-50">
      {children}
    </div>
  );
}

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

function MenuItem({ children, onClick, icon, danger }: MenuItemProps) {
  const { close } = useMenuContext();

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-base-300 transition-colors ${
        danger ? 'text-error hover:bg-error/10' : ''
      }`}
    >
      {icon && <span className="text-base-content/50">{icon}</span>}
      {children}
    </button>
  );
}

function MenuDivider() {
  return <div className="border-t border-base-300 my-1" />;
}

Menu.Button = MenuButton;
Menu.List = MenuList;
Menu.Item = MenuItem;
Menu.Divider = MenuDivider;

// ===========================================
// Demo 3: Select Component
// ===========================================

interface SelectContextType {
  isOpen: boolean;
  selectedValue: string | null;
  selectedLabel: string | null;
  toggle: () => void;
  close: () => void;
  select: (value: string, label: string) => void;
}

const SelectContext = createContext<SelectContextType | null>(null);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) throw new Error('Select components must be used within <Select>');
  return context;
}

interface SelectProps {
  children: ReactNode;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function Select({ children, defaultValue, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(defaultValue ?? null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  const select = (value: string, label: string) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    onChange?.(value);
    close();
  };

  return (
    <SelectContext.Provider value={{ isOpen, selectedValue, selectedLabel, toggle, close, select }}>
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps {
  className?: string;
  placeholder?: string;
}

function SelectTrigger({ className = '', placeholder = 'Select...' }: SelectTriggerProps) {
  const { toggle, isOpen, selectedLabel } = useSelectContext();

  return (
    <button
      onClick={toggle}
      className={`w-full px-4 py-2 text-left bg-base-200 border border-base-300 rounded-lg flex items-center justify-between hover:bg-base-300 transition-colors ${className}`}
    >
      <span className={selectedLabel ? '' : 'text-base-content/50'}>
        {selectedLabel || placeholder}
      </span>
      {isOpen ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
    </button>
  );
}

interface SelectContentProps {
  children: ReactNode;
}

function SelectContent({ children }: SelectContentProps) {
  const { isOpen } = useSelectContext();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-base-200 rounded-lg shadow-xl border border-base-300 py-1 z-50 max-h-60 overflow-auto">
      {children}
    </div>
  );
}

interface SelectOptionProps {
  value: string;
  children: ReactNode;
}

function SelectOption({ value, children }: SelectOptionProps) {
  const { select, selectedValue } = useSelectContext();
  const isSelected = selectedValue === value;

  return (
    <button
      onClick={() => select(value, typeof children === 'string' ? children : value)}
      className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-base-300 transition-colors ${
        isSelected ? 'text-primary bg-primary/10' : ''
      }`}
    >
      {children}
      {isSelected && <HiCheck className="text-primary" size={16} />}
    </button>
  );
}

interface SelectGroupProps {
  label: string;
  children: ReactNode;
}

function SelectGroup({ label, children }: SelectGroupProps) {
  return (
    <div>
      <div className="px-4 py-1 text-xs font-semibold text-base-content/50 uppercase">{label}</div>
      {children}
    </div>
  );
}

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Option = SelectOption;
Select.Group = SelectGroup;

// ===========================================
// Main Playground Component
// ===========================================

export default function CompoundPlayground(): React.ReactElement {
  const [activeDemo, setActiveDemo] = useState<'tabs' | 'menu' | 'select'>('tabs');
  const [selectedFramework, setSelectedFramework] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);

  const log = (message: string) => {
    setLogs((prev) => [message, ...prev].slice(0, 5));
  };

  return (
    <div className="space-y-6">
      {/* Demo Selector */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveDemo('tabs')}
          className={`btn btn-sm ${activeDemo === 'tabs' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineMenuAlt2 size={16} />
          Tabs
        </button>
        <button
          onClick={() => setActiveDemo('menu')}
          className={`btn btn-sm ${activeDemo === 'menu' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiChevronDown size={16} />
          Menu
        </button>
        <button
          onClick={() => setActiveDemo('select')}
          className={`btn btn-sm ${activeDemo === 'select' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiCheck size={16} />
          Select
        </button>
      </div>

      {/* Tabs Demo */}
      {activeDemo === 'tabs' && (
        <div className="card bg-base-200 p-4">
          <h4 className="font-semibold mb-4">Dashboard Tabs</h4>
          <div className="bg-base-300 rounded-lg">
            <Tabs defaultTab="home" onChange={(id) => log(`Tab changed to: ${id}`)}>
              <Tabs.List>
                <Tabs.Tab id="home">
                  <HiOutlineHome size={18} />
                  Home
                </Tabs.Tab>
                <Tabs.Tab id="profile">
                  <HiOutlineUser size={18} />
                  Profile
                </Tabs.Tab>
                <Tabs.Tab id="notifications">
                  <HiOutlineBell size={18} />
                  Notifications
                  <span className="badge badge-primary badge-sm ml-1">3</span>
                </Tabs.Tab>
                <Tabs.Tab id="settings" disabled>
                  <HiOutlineCog size={18} />
                  Settings
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel id="home">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Welcome back!</h3>
                  <p className="text-base-content/70">
                    Here's what's happening with your projects today.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-base-200 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-primary">12</p>
                      <p className="text-xs text-base-content/50">Active Projects</p>
                    </div>
                    <div className="bg-base-200 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-success">89%</p>
                      <p className="text-xs text-base-content/50">Completion</p>
                    </div>
                    <div className="bg-base-200 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-warning">3</p>
                      <p className="text-xs text-base-content/50">Pending</p>
                    </div>
                  </div>
                </div>
              </Tabs.Panel>

              <Tabs.Panel id="profile">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                    JD
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Jane Doe</h3>
                    <p className="text-base-content/60">jane.doe@example.com</p>
                    <p className="text-sm text-primary">Premium Member</p>
                  </div>
                </div>
              </Tabs.Panel>

              <Tabs.Panel id="notifications">
                <div className="space-y-3">
                  {[
                    { title: 'New comment on your post', time: '2 min ago', unread: true },
                    { title: 'Project deadline reminder', time: '1 hour ago', unread: true },
                    { title: 'Weekly report is ready', time: '3 hours ago', unread: true },
                  ].map((notif, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg flex items-center justify-between ${
                        notif.unread ? 'bg-primary/10' : 'bg-base-200'
                      }`}
                    >
                      <div>
                        <p className="font-medium">{notif.title}</p>
                        <p className="text-xs text-base-content/50">{notif.time}</p>
                      </div>
                      {notif.unread && <span className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                  ))}
                </div>
              </Tabs.Panel>

              <Tabs.Panel id="settings">
                <p>Settings panel content...</p>
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      )}

      {/* Menu Demo */}
      {activeDemo === 'menu' && (
        <div className="card bg-base-200 p-4">
          <h4 className="font-semibold mb-4">User Actions Menu</h4>
          <div className="flex items-center gap-4">
            <Menu>
              <Menu.Button className="btn-primary">
                <HiOutlineUser size={18} />
                Account
              </Menu.Button>
              <Menu.List>
                <Menu.Item
                  icon={<HiOutlineUser size={18} />}
                  onClick={() => log('View Profile clicked')}
                >
                  View Profile
                </Menu.Item>
                <Menu.Item
                  icon={<HiOutlineCog size={18} />}
                  onClick={() => log('Settings clicked')}
                >
                  Settings
                </Menu.Item>
                <Menu.Item
                  icon={<HiOutlineBell size={18} />}
                  onClick={() => log('Notifications clicked')}
                >
                  Notifications
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item icon={<HiX size={18} />} onClick={() => log('Logout clicked')} danger>
                  Logout
                </Menu.Item>
              </Menu.List>
            </Menu>

            <Menu>
              <Menu.Button className="btn-outline">Actions</Menu.Button>
              <Menu.List>
                <Menu.Item onClick={() => log('Edit clicked')}>Edit</Menu.Item>
                <Menu.Item onClick={() => log('Duplicate clicked')}>Duplicate</Menu.Item>
                <Menu.Item onClick={() => log('Archive clicked')}>Archive</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => log('Delete clicked')} danger>
                  Delete
                </Menu.Item>
              </Menu.List>
            </Menu>
          </div>
        </div>
      )}

      {/* Select Demo */}
      {activeDemo === 'select' && (
        <div className="card bg-base-200 p-4">
          <h4 className="font-semibold mb-4">Custom Select</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-base-content/70 mb-1 block">Choose a framework</label>
              <Select
                onChange={(value) => {
                  setSelectedFramework(value);
                  log(`Selected: ${value}`);
                }}
              >
                <Select.Trigger placeholder="Select a framework..." />
                <Select.Content>
                  <Select.Group label="Popular">
                    <Select.Option value="react">React</Select.Option>
                    <Select.Option value="vue">Vue</Select.Option>
                    <Select.Option value="angular">Angular</Select.Option>
                  </Select.Group>
                  <Select.Group label="Rising">
                    <Select.Option value="svelte">Svelte</Select.Option>
                    <Select.Option value="solid">Solid</Select.Option>
                    <Select.Option value="qwik">Qwik</Select.Option>
                  </Select.Group>
                </Select.Content>
              </Select>
            </div>

            <div>
              <label className="text-sm text-base-content/70 mb-1 block">Country</label>
              <Select defaultValue="us" onChange={(value) => log(`Country: ${value}`)}>
                <Select.Trigger placeholder="Select country..." />
                <Select.Content>
                  <Select.Option value="us">🇺🇸 United States</Select.Option>
                  <Select.Option value="uk">🇬🇧 United Kingdom</Select.Option>
                  <Select.Option value="ca">🇨🇦 Canada</Select.Option>
                  <Select.Option value="au">🇦🇺 Australia</Select.Option>
                  <Select.Option value="de">🇩🇪 Germany</Select.Option>
                  <Select.Option value="fr">🇫🇷 France</Select.Option>
                  <Select.Option value="jp">🇯🇵 Japan</Select.Option>
                </Select.Content>
              </Select>
            </div>
          </div>

          {selectedFramework && (
            <div className="mt-4 p-3 bg-success/10 rounded-lg flex items-center gap-2">
              <HiCheck className="text-success" />
              <span>
                You selected: <strong className="text-primary">{selectedFramework}</strong>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Event Log */}
      {logs.length > 0 && (
        <div className="card bg-base-300 p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm">Event Log</h4>
            <button onClick={() => setLogs([])} className="btn btn-ghost btn-xs">
              Clear
            </button>
          </div>
          <div className="space-y-1 font-mono text-xs">
            {logs.map((log, i) => (
              <div key={i} className={`text-base-content/${100 - i * 20}`}>
                → {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pattern Summary */}
      <div className="card bg-linear-to-r from-primary/10 to-secondary/10 p-4">
        <h4 className="font-semibold mb-3">Compound Components Pattern Summary</h4>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-primary mb-1">Structure:</p>
            <code className="text-xs bg-base-300 px-2 py-1 rounded block">
              Parent.Child (Tabs.Tab, Menu.Item)
            </code>
          </div>
          <div>
            <p className="font-semibold text-secondary mb-1">State Sharing:</p>
            <code className="text-xs bg-base-300 px-2 py-1 rounded block">
              React Context + custom hook
            </code>
          </div>
          <div>
            <p className="font-semibold text-accent mb-1">Best For:</p>
            <span className="text-base-content/70">Tabs, Accordions, Menus, Selects, Modals</span>
          </div>
          <div>
            <p className="font-semibold text-warning mb-1">Key Benefit:</p>
            <span className="text-base-content/70">Flexible API + encapsulated logic</span>
          </div>
        </div>
      </div>
    </div>
  );
}
