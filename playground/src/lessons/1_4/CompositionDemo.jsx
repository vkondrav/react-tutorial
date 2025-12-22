import { useState } from 'react';

export default function CompositionDemo() {
  const [hoveredComponent, setHoveredComponent] = useState(null);

  const componentInfo = {
    App: { color: 'blue', colorHex: '#3b82f6', desc: 'Root component - contains everything' },
    Header: { color: 'violet', colorHex: '#8b5cf6', desc: 'Contains Logo and Nav' },
    Logo: { color: 'pink', colorHex: '#ec4899', desc: 'Simple leaf component' },
    Nav: { color: 'amber', colorHex: '#f59e0b', desc: 'Contains NavLink children' },
    NavLink: { color: 'emerald', colorHex: '#22c55e', desc: 'Reused 3 times with different text' },
    Main: { color: 'cyan', colorHex: '#06b6d4', desc: 'Main content area' },
  };

  const colorClasses = {
    blue: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-500' },
    violet: { bg: 'bg-violet-500/20', border: 'border-violet-500', text: 'text-violet-500' },
    pink: { bg: 'bg-pink-500/20', border: 'border-pink-500', text: 'text-pink-500' },
    amber: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-500' },
    emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500', text: 'text-emerald-500' },
    cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-500' },
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-6">
      {/* Live Preview */}
      <div className="card bg-base-200 overflow-hidden">
        <div className="px-4 py-3 bg-base-300 text-xs text-base-content/50 uppercase tracking-wide">
          Live Preview - Hover components to highlight
        </div>
        <div className="p-4">
          {/* Mini App Preview */}
          <div className="bg-slate-50 rounded-lg overflow-hidden text-xs">
            {/* Header */}
            <div
              onMouseEnter={() => setHoveredComponent('Header')}
              onMouseLeave={() => setHoveredComponent(null)}
              className={`flex justify-between items-center px-3 py-2 border-b border-gray-200 transition-colors ${
                hoveredComponent === 'Header'
                  ? `${colorClasses.violet.bg} outline-2 ${colorClasses.violet.border}`
                  : 'bg-white'
              }`}
            >
              {/* Logo */}
              <div
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setHoveredComponent('Logo');
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setHoveredComponent('Header');
                }}
                className={`font-bold text-blue-500 px-2 py-1 rounded transition-colors ${
                  hoveredComponent === 'Logo'
                    ? `${colorClasses.pink.bg} outline-2 ${colorClasses.pink.border}`
                    : ''
                }`}
              >
                MyApp
              </div>
              {/* Nav */}
              <div
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setHoveredComponent('Nav');
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setHoveredComponent('Header');
                }}
                className={`flex gap-2 px-2 py-1 rounded transition-colors ${
                  hoveredComponent === 'Nav'
                    ? `${colorClasses.amber.bg} outline-2 ${colorClasses.amber.border}`
                    : ''
                }`}
              >
                {['Home', 'About', 'Contact'].map((text) => (
                  <span
                    key={text}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setHoveredComponent('NavLink');
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setHoveredComponent('Nav');
                    }}
                    className={`text-gray-600 px-1 py-0.5 rounded transition-colors ${
                      hoveredComponent === 'NavLink'
                        ? `${colorClasses.emerald.bg} outline-2 ${colorClasses.emerald.border}`
                        : ''
                    }`}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
            {/* Main */}
            <div
              onMouseEnter={() => setHoveredComponent('Main')}
              onMouseLeave={() => setHoveredComponent(null)}
              className={`p-4 min-h-[60px] transition-colors ${
                hoveredComponent === 'Main'
                  ? `${colorClasses.cyan.bg} outline-2 ${colorClasses.cyan.border}`
                  : 'bg-white'
              }`}
            >
              <div className="text-gray-500 text-center">Main content here...</div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Tree */}
      <div className="card bg-base-200 overflow-hidden">
        <div className="px-4 py-3 bg-base-300 text-xs text-base-content/50 uppercase tracking-wide">
          Component Tree
        </div>
        <div className="p-4 font-mono text-xs">
          <TreeNode
            name="App"
            info={componentInfo}
            hovered={hoveredComponent}
            setHovered={setHoveredComponent}
          >
            <TreeNode
              name="Header"
              info={componentInfo}
              hovered={hoveredComponent}
              setHovered={setHoveredComponent}
            >
              <TreeNode
                name="Logo"
                info={componentInfo}
                hovered={hoveredComponent}
                setHovered={setHoveredComponent}
              />
              <TreeNode
                name="Nav"
                info={componentInfo}
                hovered={hoveredComponent}
                setHovered={setHoveredComponent}
              >
                <TreeNode
                  name="NavLink"
                  info={componentInfo}
                  hovered={hoveredComponent}
                  setHovered={setHoveredComponent}
                  count={3}
                />
              </TreeNode>
            </TreeNode>
            <TreeNode
              name="Main"
              info={componentInfo}
              hovered={hoveredComponent}
              setHovered={setHoveredComponent}
            />
          </TreeNode>
        </div>

        {/* Component Info */}
        {hoveredComponent && (
          <div className="px-4 py-3 bg-base-300 border-t border-base-300 text-xs">
            <span
              className={`${colorClasses[componentInfo[hoveredComponent]?.color]?.text} font-semibold`}
            >
              {'<'}
              {hoveredComponent}
              {' />'}
            </span>
            <span className="text-base-content/70 ml-2">
              {componentInfo[hoveredComponent]?.desc}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function TreeNode({ name, info, hovered, setHovered, children, count }) {
  const isHovered = hovered === name;
  const color = info[name]?.color || 'slate';
  const colorClasses = {
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-500' },
    violet: { bg: 'bg-violet-500/20', text: 'text-violet-500' },
    pink: { bg: 'bg-pink-500/20', text: 'text-pink-500' },
    amber: { bg: 'bg-amber-500/20', text: 'text-amber-500' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-500' },
    cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-500' },
    slate: { bg: 'bg-slate-500/20', text: 'text-slate-500' },
  };
  const colors = colorClasses[color] || colorClasses.slate;

  return (
    <div className={children ? '' : 'ml-4'}>
      <div
        onMouseEnter={() => setHovered(name)}
        onMouseLeave={() => setHovered(null)}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded cursor-pointer transition-colors ${
          isHovered ? colors.bg : ''
        }`}
      >
        <span className={colors.text}>{'<'}</span>
        <span
          className={isHovered ? `${colors.text} font-semibold` : 'text-base-content font-normal'}
        >
          {name}
        </span>
        <span className={colors.text}>{' />'}</span>
        {count && <span className="text-xs text-base-content/50 ml-1">×{count}</span>}
      </div>
      {children && <div className="ml-5 border-l border-base-300 pl-3">{children}</div>}
    </div>
  );
}
