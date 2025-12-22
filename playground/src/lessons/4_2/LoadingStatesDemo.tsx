// ============================================
// Loading States Demo
// Different patterns for showing loading feedback
// ============================================

import { useState } from 'react';
import { HiOutlineCursorClick, HiOutlineLightBulb } from 'react-icons/hi';

type LoadingPattern = 'spinner' | 'skeleton' | 'progress' | 'shimmer';

// Spinner component
function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  return (
    <div
      className={`${sizeClasses[size]} border-2 border-base-content/20 border-t-primary rounded-full animate-spin`}
    />
  );
}

// Skeleton component (static placeholder - no animation)
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-base-content/10 rounded ${className}`} />;
}

// Progress bar component
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-2 bg-base-300 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Shimmer effect skeleton (animated with pulse)
function ShimmerSkeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-base-content/10 rounded animate-pulse ${className}`} />;
}

// Demo card with loading states
function LoadingCard({ pattern }: { pattern: LoadingPattern }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const simulateLoad = () => {
    setIsLoading(true);
    setProgress(0);

    if (pattern === 'progress') {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          return p + 10;
        });
      }, 150);
    } else {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const renderLoading = () => {
    switch (pattern) {
      case 'spinner':
        return (
          <div className="flex flex-col items-center justify-center h-32 gap-3">
            <Spinner size="lg" />
            <span className="text-sm text-base-content/60">Loading...</span>
          </div>
        );
      case 'skeleton':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        );
      case 'progress':
        return (
          <div className="flex flex-col items-center justify-center h-32 gap-4">
            <div className="w-full max-w-xs">
              <ProgressBar progress={progress} />
            </div>
            <span className="text-sm text-base-content/60">{progress}% complete</span>
          </div>
        );
      case 'shimmer':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <ShimmerSkeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <ShimmerSkeleton className="h-4 w-3/4" />
                <ShimmerSkeleton className="h-3 w-1/2" />
              </div>
            </div>
            <ShimmerSkeleton className="h-20 w-full" />
          </div>
        );
    }
  };

  const renderLoaded = () => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
          JD
        </div>
        <div>
          <div className="font-semibold">Jane Doe</div>
          <div className="text-sm text-base-content/60">Software Engineer</div>
        </div>
      </div>
      <p className="text-base-content/70 text-sm">
        Building amazing user experiences with React. Passionate about clean code and great UX.
      </p>
      <div className="flex gap-2">
        <button className="btn btn-primary btn-sm">Follow</button>
        <button className="btn btn-ghost btn-sm">Message</button>
      </div>
    </div>
  );

  return (
    <div className="card bg-base-300 p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="badge badge-primary">{pattern}</span>
        <button onClick={simulateLoad} className="btn btn-ghost btn-xs gap-1">
          <HiOutlineCursorClick size={14} />
          Reload
        </button>
      </div>
      {isLoading ? renderLoading() : renderLoaded()}
    </div>
  );
}

export default function LoadingStatesDemo(): React.ReactElement {
  const [selectedPattern, setSelectedPattern] = useState<LoadingPattern>('spinner');

  const patterns: { id: LoadingPattern; label: string; description: string }[] = [
    { id: 'spinner', label: 'Spinner', description: 'Simple, universal, good for short waits' },
    {
      id: 'skeleton',
      label: 'Skeleton',
      description: 'Static placeholder showing layout structure',
    },
    {
      id: 'progress',
      label: 'Progress',
      description: 'Shows completion %, good for uploads/downloads',
    },
    {
      id: 'shimmer',
      label: 'Shimmer',
      description: 'Animated skeleton with pulse effect, feels alive',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Pattern selector */}
      <div className="flex flex-wrap gap-2">
        {patterns.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => setSelectedPattern(pattern.id)}
            className={`btn btn-sm ${selectedPattern === pattern.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {pattern.label}
          </button>
        ))}
      </div>

      {/* Demo grid */}
      <div className="grid md:grid-cols-2 gap-4">
        <LoadingCard pattern={selectedPattern} />

        {/* Info panel */}
        <div className="card bg-base-200 p-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <HiOutlineLightBulb className="text-warning" />
            When to use {patterns.find((p) => p.id === selectedPattern)?.label}
          </h4>
          <p className="text-sm text-base-content/70 mb-4">
            {patterns.find((p) => p.id === selectedPattern)?.description}
          </p>

          {selectedPattern === 'spinner' && (
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Quick operations (under 2 seconds)</li>
              <li>• Unknown content structure</li>
              <li>• Inline actions (button loading)</li>
              <li>• Modal or overlay loading</li>
            </ul>
          )}
          {selectedPattern === 'skeleton' && (
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Very fast loads (under 500ms)</li>
              <li>• Simple placeholder needs</li>
              <li>• When animation would be distracting</li>
              <li>• Low-motion preference users</li>
            </ul>
          )}
          {selectedPattern === 'progress' && (
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• File uploads/downloads</li>
              <li>• Multi-step processes</li>
              <li>• Long operations with measurable progress</li>
              <li>• Imports/exports</li>
            </ul>
          )}
          {selectedPattern === 'shimmer' && (
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Lists and cards with known structure</li>
              <li>• Page initial load (1-3 seconds)</li>
              <li>• Better perceived performance</li>
              <li>• Social media feeds, content-heavy apps</li>
            </ul>
          )}

          {/* Code example */}
          <div className="mt-4 bg-base-300 rounded-lg p-3">
            <pre className="text-xs overflow-x-auto">
              {selectedPattern === 'spinner' && (
                <code>{`// Simple spinner
<div className="loading loading-spinner" />

// Or custom with Tailwind
<div className="w-8 h-8 border-2 
  border-base-content/20 
  border-t-primary rounded-full 
  animate-spin" />`}</code>
              )}
              {selectedPattern === 'skeleton' && (
                <code>{`// Static skeleton placeholder
function Skeleton({ className }) {
  return (
    <div className={\`bg-base-content/10 
      rounded \${className}\`} 
    />
  );
}

// Usage
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-12 w-12 rounded-full" />`}</code>
              )}
              {selectedPattern === 'progress' && (
                <code>{`// Progress bar
function ProgressBar({ progress }) {
  return (
    <div className="w-full h-2 bg-base-300 
      rounded-full overflow-hidden">
      <div
        className="h-full bg-primary 
          transition-all duration-300"
        style={{ width: \`\${progress}%\` }}
      />
    </div>
  );
}`}</code>
              )}
              {selectedPattern === 'shimmer' && (
                <code>{`// Shimmer with pulse animation
function Shimmer({ className }) {
  return (
    <div className={\`bg-base-content/10 
      rounded animate-pulse \${className}\`} 
    />
  );
}

// The animate-pulse class creates
// a subtle fade in/out effect`}</code>
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
