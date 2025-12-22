import { useState } from 'react';

export default function FileFlowDemo() {
  const [activeStep, setActiveStep] = useState(null);
  const steps = [
    {
      id: 1,
      title: 'index.html',
      color: 'orange',
      colorHex: '#f97316',
      content: 'Browser loads index.html with <div id="root">.',
    },
    {
      id: 2,
      title: 'main.jsx',
      color: 'violet',
      colorHex: '#8b5cf6',
      content: 'React initializes and renders <App /> into #root.',
    },
    {
      id: 3,
      title: 'App.jsx',
      color: 'blue',
      colorHex: '#3b82f6',
      content: 'Your components execute and return JSX.',
    },
    {
      id: 4,
      title: '🎉 Done!',
      color: 'emerald',
      colorHex: '#22c55e',
      content: 'UI is rendered. State changes update efficiently.',
    },
  ];

  const colorClasses = {
    orange: {
      bg: 'bg-orange-500',
      border: 'border-orange-500',
      text: 'text-orange-500',
    },
    violet: {
      bg: 'bg-violet-500',
      border: 'border-violet-500',
      text: 'text-violet-500',
    },
    blue: {
      bg: 'bg-blue-500',
      border: 'border-blue-500',
      text: 'text-blue-500',
    },
    emerald: {
      bg: 'bg-emerald-500',
      border: 'border-emerald-500',
      text: 'text-emerald-500',
    },
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {steps.map((step, i) => {
          const colors = colorClasses[step.color];
          const isActive = activeStep === step.id;
          return (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => setActiveStep(isActive ? null : step.id)}
                className={`flex-1 px-3 py-3 rounded-lg cursor-pointer font-semibold text-sm transition-colors border-2 ${
                  isActive
                    ? `${colors.bg} ${colors.border} text-white`
                    : `bg-slate-900 ${colors.border} ${colors.text} hover:bg-slate-800`
                }`}
              >
                {step.title}
              </button>
              {i < steps.length - 1 && (
                <span className="text-slate-600 px-1">→</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 p-4 rounded-lg min-h-[60px]">
        {activeStep ? (
          <p className="text-slate-400 m-0">{steps[activeStep - 1].content}</p>
        ) : (
          <p className="text-slate-500 m-0">👆 Click a step</p>
        )}
      </div>
    </div>
  );
}
