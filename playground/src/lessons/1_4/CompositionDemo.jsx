import { useState } from 'react';

export default function CompositionDemo() {
  const [hoveredComponent, setHoveredComponent] = useState(null);

  const componentInfo = {
    App: { color: '#3b82f6', desc: 'Root component - contains everything' },
    Header: { color: '#8b5cf6', desc: 'Contains Logo and Nav' },
    Logo: { color: '#ec4899', desc: 'Simple leaf component' },
    Nav: { color: '#f59e0b', desc: 'Contains NavLink children' },
    NavLink: { color: '#22c55e', desc: 'Reused 3 times with different text' },
    Main: { color: '#06b6d4', desc: 'Main content area' },
  };

  return (
    <div
      style={{
        marginTop: '1.5rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
      }}
    >
      {/* Live Preview */}
      <div
        style={{
          backgroundColor: '#1e293b',
          borderRadius: '0.75rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#0f172a',
            fontSize: '0.75rem',
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Live Preview - Hover components to highlight
        </div>
        <div style={{ padding: '1rem' }}>
          {/* Mini App Preview */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              fontSize: '0.75rem',
            }}
          >
            {/* Header */}
            <div
              onMouseEnter={() => setHoveredComponent('Header')}
              onMouseLeave={() => setHoveredComponent(null)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                backgroundColor: hoveredComponent === 'Header' ? '#8b5cf622' : 'white',
                borderBottom: '1px solid #e5e7eb',
                transition: 'background 0.2s',
                outline: hoveredComponent === 'Header' ? '2px solid #8b5cf6' : 'none',
              }}
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
                style={{
                  fontWeight: 'bold',
                  color: '#3b82f6',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  backgroundColor: hoveredComponent === 'Logo' ? '#ec489922' : 'transparent',
                  outline: hoveredComponent === 'Logo' ? '2px solid #ec4899' : 'none',
                }}
              >
                ⚛️ MyApp
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
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  backgroundColor: hoveredComponent === 'Nav' ? '#f59e0b22' : 'transparent',
                  outline: hoveredComponent === 'Nav' ? '2px solid #f59e0b' : 'none',
                }}
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
                    style={{
                      color: '#4b5563',
                      padding: '0.125rem 0.25rem',
                      borderRadius: '0.125rem',
                      backgroundColor: hoveredComponent === 'NavLink' ? '#22c55e22' : 'transparent',
                      outline: hoveredComponent === 'NavLink' ? '1px solid #22c55e' : 'none',
                    }}
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
              style={{
                padding: '1rem',
                backgroundColor: hoveredComponent === 'Main' ? '#06b6d422' : 'white',
                outline: hoveredComponent === 'Main' ? '2px solid #06b6d4' : 'none',
                minHeight: '60px',
              }}
            >
              <div style={{ color: '#6b7280', textAlign: 'center' }}>Main content here...</div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Tree */}
      <div
        style={{
          backgroundColor: '#1e293b',
          borderRadius: '0.75rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#0f172a',
            fontSize: '0.75rem',
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Component Tree
        </div>
        <div style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.8rem' }}>
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
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#0f172a',
              borderTop: '1px solid #334155',
              fontSize: '0.8rem',
            }}
          >
            <span style={{ color: componentInfo[hoveredComponent]?.color, fontWeight: '600' }}>
              {'<'}
              {hoveredComponent}
              {'>'}
            </span>
            <span style={{ color: '#94a3b8', marginLeft: '0.5rem' }}>
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
  const color = info[name]?.color || '#64748b';

  return (
    <div style={{ marginLeft: children ? 0 : '1rem' }}>
      <div
        onMouseEnter={() => setHovered(name)}
        onMouseLeave={() => setHovered(null)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          backgroundColor: isHovered ? `${color}22` : 'transparent',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        <span style={{ color }}>{'<'}</span>
        <span
          style={{ color: isHovered ? color : '#e2e8f0', fontWeight: isHovered ? '600' : '400' }}
        >
          {name}
        </span>
        <span style={{ color }}>{' />'}</span>
        {count && (
          <span
            style={{
              fontSize: '0.7rem',
              color: '#64748b',
              marginLeft: '0.25rem',
            }}
          >
            ×{count}
          </span>
        )}
      </div>
      {children && (
        <div
          style={{ marginLeft: '1.25rem', borderLeft: '1px solid #334155', paddingLeft: '0.75rem' }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
