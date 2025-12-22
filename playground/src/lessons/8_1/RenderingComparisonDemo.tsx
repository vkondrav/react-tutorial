// ============================================
// Rendering Comparison Demo
// ============================================
// Visualizes CSR vs SSR timeline side by side
// ============================================

import { useState, useEffect, useRef } from 'react';
import { HiOutlinePlay, HiOutlineRefresh } from 'react-icons/hi';

type RenderingMode = 'csr' | 'ssr';

interface TimelineStep {
  label: string;
  duration: number;
  color: string;
}

const CSR_STEPS: TimelineStep[] = [
  { label: 'Download HTML', duration: 100, color: 'bg-base-300' },
  { label: 'Download JS Bundle', duration: 800, color: 'bg-warning' },
  { label: 'Parse & Execute JS', duration: 400, color: 'bg-error' },
  { label: 'Fetch API Data', duration: 600, color: 'bg-info' },
  { label: 'Render Content', duration: 200, color: 'bg-success' },
];

const SSR_STEPS: TimelineStep[] = [
  { label: 'Server fetches data', duration: 300, color: 'bg-info' },
  { label: 'Server renders HTML', duration: 200, color: 'bg-primary' },
  { label: 'Download HTML + Content', duration: 150, color: 'bg-success' },
  { label: 'Download JS Bundle', duration: 500, color: 'bg-warning' },
  { label: 'Hydrate (attach events)', duration: 150, color: 'bg-secondary' },
];

export default function RenderingComparisonDemo(): React.ReactElement {
  const [isPlaying, setIsPlaying] = useState(false);
  const [csrProgress, setCsrProgress] = useState(0);
  const [ssrProgress, setSsrProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const totalCsrTime = CSR_STEPS.reduce((sum, step) => sum + step.duration, 0);
  const totalSsrTime = SSR_STEPS.reduce((sum, step) => sum + step.duration, 0);
  const maxTime = Math.max(totalCsrTime, totalSsrTime);

  // Find when content becomes visible
  const csrContentVisibleAt = CSR_STEPS.slice(0, -1).reduce((sum, step) => sum + step.duration, 0);
  const ssrContentVisibleAt = SSR_STEPS.slice(0, 3).reduce((sum, step) => sum + step.duration, 0);

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;

    // Speed factor (2x faster for demo purposes)
    const speed = 2;
    const scaledElapsed = elapsed * speed;

    setCsrProgress(Math.min(scaledElapsed, totalCsrTime));
    setSsrProgress(Math.min(scaledElapsed, totalSsrTime));

    if (scaledElapsed < maxTime) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePlay = () => {
    setCsrProgress(0);
    setSsrProgress(0);
    startTimeRef.current = 0;
    setIsPlaying(true);
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleReset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCsrProgress(0);
    setSsrProgress(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const getStepProgress = (steps: TimelineStep[], currentProgress: number, stepIndex: number) => {
    const stepStart = steps.slice(0, stepIndex).reduce((sum, s) => sum + s.duration, 0);
    const stepEnd = stepStart + steps[stepIndex].duration;

    if (currentProgress < stepStart) return 0;
    if (currentProgress >= stepEnd) return 100;
    return ((currentProgress - stepStart) / steps[stepIndex].duration) * 100;
  };

  const renderTimeline = (
    mode: RenderingMode,
    steps: TimelineStep[],
    progress: number,
    contentVisibleAt: number
  ) => {
    const isContentVisible = progress >= contentVisibleAt;
    const isComplete = progress >= steps.reduce((sum, s) => sum + s.duration, 0);

    return (
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <h4 className={`font-semibold ${mode === 'ssr' ? 'text-success' : 'text-warning'}`}>
            {mode === 'ssr' ? 'Server-Side Rendering' : 'Client-Side Rendering'}
          </h4>
          <span className="text-xs text-base-content/50">{Math.round(progress)}ms</span>
        </div>

        {/* Browser Preview */}
        <div className="border border-base-300 rounded-lg mb-4 overflow-hidden">
          <div className="bg-base-300 px-3 py-1.5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-error/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
            </div>
            <div className="flex-1 bg-base-200 rounded px-2 py-0.5 text-xs text-base-content/50">
              myapp.com
            </div>
          </div>
          <div className="bg-base-100 h-24 flex items-center justify-center p-4">
            {!isContentVisible ? (
              <div className="text-center">
                {progress > 0 ? (
                  <>
                    <div className="loading loading-spinner loading-md text-base-content/30 mb-2" />
                    <p className="text-xs text-base-content/40">
                      {mode === 'csr' ? 'Loading...' : 'Waiting for server...'}
                    </p>
                  </>
                ) : (
                  <p className="text-base-content/30 text-sm">Waiting to start...</p>
                )}
              </div>
            ) : (
              <div className="text-center animate-in fade-in duration-300">
                <h3 className="font-bold text-lg mb-1">Welcome, User!</h3>
                <p className="text-sm text-base-content/70">Your dashboard is ready.</p>
                {mode === 'ssr' && !isComplete && (
                  <p className="text-xs text-warning mt-2">⏳ Hydrating...</p>
                )}
                {isComplete && <p className="text-xs text-success mt-2">✅ Interactive!</p>}
              </div>
            )}
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-2">
          {steps.map((step, i) => {
            const stepProgress = getStepProgress(steps, progress, i);
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="w-32 text-xs text-base-content/70 truncate">{step.label}</div>
                <div className="flex-1 bg-base-300 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${step.color} transition-all duration-100`}
                    style={{ width: `${stepProgress}%` }}
                  />
                </div>
                <div className="w-12 text-xs text-base-content/50 text-right">
                  {step.duration}ms
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Visible Indicator */}
        <div className="mt-4 text-sm">
          <span className="text-base-content/50">Content visible at: </span>
          <span className={mode === 'ssr' ? 'text-success font-semibold' : 'text-warning'}>
            {contentVisibleAt}ms
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="card bg-base-200 p-6">
      {/* Controls */}
      <div className="flex gap-2 mb-6">
        <button onClick={handlePlay} disabled={isPlaying} className="btn btn-primary btn-sm gap-2">
          <HiOutlinePlay size={16} />
          {isPlaying ? 'Playing...' : 'Play Comparison'}
        </button>
        <button onClick={handleReset} className="btn btn-ghost btn-sm gap-2">
          <HiOutlineRefresh size={16} />
          Reset
        </button>
      </div>

      {/* Side by Side Comparison */}
      <div className="grid md:grid-cols-2 gap-8">
        {renderTimeline('csr', CSR_STEPS, csrProgress, csrContentVisibleAt)}
        {renderTimeline('ssr', SSR_STEPS, ssrProgress, ssrContentVisibleAt)}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-base-300 rounded-lg">
        <h4 className="font-semibold mb-2">Key Difference</h4>
        <p className="text-sm text-base-content/70">
          With SSR, content is visible at{' '}
          <strong className="text-success">{ssrContentVisibleAt}ms</strong> vs{' '}
          <strong className="text-warning">{csrContentVisibleAt}ms</strong> with CSR —{' '}
          <strong className="text-primary">
            {Math.round(((csrContentVisibleAt - ssrContentVisibleAt) / csrContentVisibleAt) * 100)}%
            faster
          </strong>{' '}
          First Contentful Paint!
        </p>
      </div>
    </div>
  );
}
