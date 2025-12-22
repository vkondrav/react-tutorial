import { useState } from 'react';

export default function ComponentTreeDemo() {
  const [selected, setSelected] = useState(null);

  const components = [
    {
      id: 'app',
      name: 'App',
      color: 'blue',
      description: 'The root component - everything lives inside App',
    },
    {
      id: 'header',
      name: 'Header',
      color: 'violet',
      description: 'Contains the logo and navigation',
    },
    {
      id: 'main',
      name: 'Main',
      color: 'emerald',
      description: 'The main content area with all sections',
    },
    {
      id: 'section',
      name: 'Section',
      color: 'amber',
      description: 'Reusable section wrapper - used 5 times on this page!',
    },
    {
      id: 'demo',
      name: 'Demo',
      color: 'pink',
      description: 'Interactive demos like this one',
    },
  ];

  const colorVariants = {
    blue: 'btn-primary',
    violet: 'btn-secondary',
    emerald: 'btn-success',
    amber: 'btn-warning',
    pink: 'btn-accent',
  };

  const borderClasses = {
    blue: 'border-primary',
    violet: 'border-secondary',
    emerald: 'border-success',
    amber: 'border-warning',
    pink: 'border-accent',
  };

  const selectedComp = components.find((c) => c.id === selected);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-base-content/60 mt-0 mb-4">
          👇 Click a component to learn about it:
        </p>
        <div className="flex flex-wrap gap-2">
          {components.map((comp) => {
            const isSelected = selected === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => setSelected(isSelected ? null : comp.id)}
                className={`btn btn-sm ${colorVariants[comp.color]} ${isSelected ? '' : 'btn-outline'}`}
              >
                {'<'}
                {comp.name}
                {' />'}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`card bg-base-200 p-5 min-h-[80px] border-2 ${selectedComp ? borderClasses[selectedComp.color] : 'border-base-300'}`}
      >
        {selectedComp ? (
          <div>
            <span className={`badge ${colorVariants[selectedComp.color]}`}>
              {'<'}
              {selectedComp.name}
              {' />'}
            </span>
            <p className="text-base-content/80 mt-3 leading-relaxed">{selectedComp.description}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-base-content/50">
            👆 Click a component above
          </div>
        )}
      </div>
    </div>
  );
}
