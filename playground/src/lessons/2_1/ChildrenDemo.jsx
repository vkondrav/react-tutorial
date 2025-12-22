import { useState } from 'react';

export default function ChildrenDemo() {
  const [cardTitle, setCardTitle] = useState('Welcome!');
  const [cardContent, setCardContent] = useState('This content is passed as children.');

  return (
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      {/* Controls */}
      <div
        style={{
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          borderBottom: '1px solid #334155',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            title prop
          </label>
          <input
            type="text"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '0.375rem',
              color: '#f8fafc',
              fontSize: '0.875rem',
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            children content
          </label>
          <input
            type="text"
            value={cardContent}
            onChange={(e) => setCardContent(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '0.375rem',
              color: '#f8fafc',
              fontSize: '0.875rem',
            }}
          />
        </div>
      </div>

      {/* Code */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          Card Component (receives children)
        </div>
        <pre
          style={{
            margin: 0,
            padding: '1rem',
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            overflow: 'auto',
            fontSize: '0.8rem',
            lineHeight: 1.6,
          }}
        >
          <code style={{ color: '#e2e8f0' }}>
            {`function Card({ title, `}
            <span style={{ color: '#ec4899' }}>children</span>
            {` }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">
        {`}
            <span style={{ color: '#ec4899' }}>children</span>
            {`}  {/* ← Renders whatever is between <Card>...</Card> */}
      </div>
    </div>
  );
}`}
          </code>
        </pre>

        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '0.75rem',
            marginTop: '1.5rem',
            textTransform: 'uppercase',
          }}
        >
          Usage
        </div>
        <pre
          style={{
            margin: 0,
            padding: '1rem',
            backgroundColor: '#0f172a',
            borderRadius: '0.5rem',
            overflow: 'auto',
            fontSize: '0.8rem',
            lineHeight: 1.6,
          }}
        >
          <code style={{ color: '#e2e8f0' }}>
            {`<Card title="`}
            <span style={{ color: '#22c55e' }}>{cardTitle}</span>
            {`">
  `}
            <span style={{ color: '#ec4899' }}>{cardContent}</span>
            {`
</Card>`}
          </code>
        </pre>
      </div>

      {/* Live Preview */}
      <div style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          Live Result
        </div>
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 0.75rem 0', color: '#1e293b', fontSize: '1.125rem' }}>
            {cardTitle || 'Card Title'}
          </h3>
          <div style={{ color: '#64748b' }}>{cardContent || 'Card content goes here...'}</div>
        </div>
      </div>

      {/* Examples */}
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#1e293b',
          borderTop: '1px solid #334155',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          Children can be anything!
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            fontSize: '0.8rem',
          }}
        >
          <div style={{ backgroundColor: '#0f172a', padding: '0.75rem', borderRadius: '0.375rem' }}>
            <div style={{ color: '#22c55e', marginBottom: '0.5rem' }}>Text</div>
            <code style={{ color: '#94a3b8' }}>{`<Card>Hello</Card>`}</code>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '0.75rem', borderRadius: '0.375rem' }}>
            <div style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>Elements</div>
            <code style={{ color: '#94a3b8' }}>{`<Card><p>Hi</p></Card>`}</code>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '0.75rem', borderRadius: '0.375rem' }}>
            <div style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>Components</div>
            <code style={{ color: '#94a3b8' }}>{`<Card><List /></Card>`}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
