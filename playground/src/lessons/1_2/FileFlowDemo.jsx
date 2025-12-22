import { useState } from 'react';

export default function FileFlowDemo() {
  const [activeStep, setActiveStep] = useState(null);
  const steps = [
    {
      id: 1,
      title: 'index.html',
      color: '#f97316',
      content: 'Browser loads index.html with <div id="root">.',
    },
    {
      id: 2,
      title: 'main.jsx',
      color: '#8b5cf6',
      content: 'React initializes and renders <App /> into #root.',
    },
    {
      id: 3,
      title: 'App.jsx',
      color: '#3b82f6',
      content: 'Your components execute and return JSX.',
    },
    {
      id: 4,
      title: '🎉 Done!',
      color: '#22c55e',
      content: 'UI is rendered. State changes update efficiently.',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        {steps.map((step, i) => (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <button
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: activeStep === step.id ? step.color : '#0f172a',
                border: `2px solid ${step.color}`,
                borderRadius: '0.5rem',
                cursor: 'pointer',
                color: activeStep === step.id ? 'white' : step.color,
                fontWeight: '600',
                fontSize: '0.8125rem',
              }}
            >
              {step.title}
            </button>
            {i < steps.length - 1 && (
              <span style={{ color: '#475569', padding: '0 0.25rem' }}>→</span>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          backgroundColor: '#0f172a',
          padding: '1rem',
          borderRadius: '0.5rem',
          minHeight: '60px',
        }}
      >
        {activeStep ? (
          <p style={{ color: '#94a3b8', margin: 0 }}>{steps[activeStep - 1].content}</p>
        ) : (
          <p style={{ color: '#64748b', margin: 0 }}>👆 Click a step</p>
        )}
      </div>
    </div>
  );
}
