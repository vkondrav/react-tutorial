import { useState } from 'react';
import { HiOutlineArrowRight, HiOutlineCursorClick } from 'react-icons/hi';

export default function FileFlowDemo() {
  const [activeStep, setActiveStep] = useState(null);
  const steps = [
    {
      id: 1,
      title: 'index.html',
      color: 'warning',
      content: 'Browser loads index.html with <div id="root">.',
    },
    {
      id: 2,
      title: 'main.jsx',
      color: 'secondary',
      content: 'React initializes and renders <App /> into #root.',
    },
    {
      id: 3,
      title: 'App.jsx',
      color: 'primary',
      content: 'Your components execute and return JSX.',
    },
    {
      id: 4,
      title: 'Done!',
      color: 'success',
      content: 'UI is rendered. State changes update efficiently.',
    },
  ];

  const colorClasses = {
    warning: {
      bg: 'bg-warning',
      border: 'border-warning',
      text: 'text-warning',
      btnActive: 'btn-warning',
      btnOutline: 'btn-outline btn-warning',
    },
    secondary: {
      bg: 'bg-secondary',
      border: 'border-secondary',
      text: 'text-secondary',
      btnActive: 'btn-secondary',
      btnOutline: 'btn-outline btn-secondary',
    },
    primary: {
      bg: 'bg-primary',
      border: 'border-primary',
      text: 'text-primary',
      btnActive: 'btn-primary',
      btnOutline: 'btn-outline btn-primary',
    },
    success: {
      bg: 'bg-success',
      border: 'border-success',
      text: 'text-success',
      btnActive: 'btn-success',
      btnOutline: 'btn-outline btn-success',
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
                className={`btn flex-1 ${isActive ? colors.btnActive : colors.btnOutline}`}
              >
                {step.title}
              </button>
              {i < steps.length - 1 && (
                <HiOutlineArrowRight className="text-base-content/30 px-1" size={20} />
              )}
            </div>
          );
        })}
      </div>

      <div className="card bg-base-200 p-4 min-h-[60px]">
        {activeStep ? (
          <p className="text-base-content m-0">{steps[activeStep - 1].content}</p>
        ) : (
          <p className="text-base-content/50 m-0 flex items-center gap-2">
            <HiOutlineCursorClick size={18} />
            <span>Click a step</span>
          </p>
        )}
      </div>
    </div>
  );
}
