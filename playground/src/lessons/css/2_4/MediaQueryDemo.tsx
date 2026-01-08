import { useState } from 'react';
import { HiOutlineArrowRight, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import mobileFirstCode from './examples/MobileFirst.css?raw';
import desktopFirstCode from './examples/DesktopFirst.css?raw';

type Approach = 'mobile-first' | 'desktop-first';

const breakpoints = [
  { name: 'Mobile', width: 375, icon: '📱' },
  { name: 'Tablet', width: 768, icon: '📱' },
  { name: 'Desktop', width: 1024, icon: '🖥️' },
  { name: 'Wide', width: 1440, icon: '🖥️' },
];

export default function MediaQueryDemo(): React.ReactElement {
  const [approach, setApproach] = useState<Approach>('mobile-first');
  const [viewportWidth, setViewportWidth] = useState(375);

  return (
    <div className="space-y-6">
      {/* Approach Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setApproach('mobile-first')}
          className={`btn btn-sm ${approach === 'mobile-first' ? 'btn-success' : 'btn-ghost'}`}
        >
          Mobile-First (min-width)
        </button>
        <button
          onClick={() => setApproach('desktop-first')}
          className={`btn btn-sm ${approach === 'desktop-first' ? 'btn-error' : 'btn-ghost'}`}
        >
          Desktop-First (max-width)
        </button>
      </div>

      {/* Interactive Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">
            {approach === 'mobile-first' ? 'Mobile-First Approach' : 'Desktop-First Approach'}
          </h4>
          <span className="badge badge-lg font-mono">{viewportWidth}px</span>
        </div>

        {/* Viewport Slider */}
        <div className="mb-6">
          <input
            type="range"
            min="320"
            max="1600"
            value={viewportWidth}
            onChange={(e) => setViewportWidth(Number(e.target.value))}
            className={`range w-full ${approach === 'mobile-first' ? 'range-success' : 'range-error'}`}
          />
          <div className="flex justify-between text-xs mt-1 text-base-content/60">
            {breakpoints.map((bp) => (
              <button
                key={bp.name}
                onClick={() => setViewportWidth(bp.width)}
                className={`hover:text-primary transition-colors ${viewportWidth === bp.width ? 'text-primary font-bold' : ''}`}
              >
                {bp.name}
              </button>
            ))}
          </div>
        </div>

        {/* Visual: Which styles are active */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cascade visualization */}
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-base-content/70">
              Styles Applied (in order)
            </h5>
            {approach === 'mobile-first' ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HiOutlineCheck className="text-success" size={18} />
                  <span className="font-mono text-sm bg-success/20 px-2 py-1 rounded">
                    Base styles (mobile)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {viewportWidth >= 768 ? (
                    <HiOutlineCheck className="text-success" size={18} />
                  ) : (
                    <HiOutlineX className="text-base-content/30" size={18} />
                  )}
                  <span
                    className={`font-mono text-sm px-2 py-1 rounded ${viewportWidth >= 768 ? 'bg-success/20' : 'bg-base-300 text-base-content/40'}`}
                  >
                    @media (min-width: 768px)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {viewportWidth >= 1024 ? (
                    <HiOutlineCheck className="text-success" size={18} />
                  ) : (
                    <HiOutlineX className="text-base-content/30" size={18} />
                  )}
                  <span
                    className={`font-mono text-sm px-2 py-1 rounded ${viewportWidth >= 1024 ? 'bg-success/20' : 'bg-base-300 text-base-content/40'}`}
                  >
                    @media (min-width: 1024px)
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HiOutlineCheck className="text-error" size={18} />
                  <span className="font-mono text-sm bg-error/20 px-2 py-1 rounded">
                    Base styles (desktop)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {viewportWidth < 1024 ? (
                    <HiOutlineCheck className="text-error" size={18} />
                  ) : (
                    <HiOutlineX className="text-base-content/30" size={18} />
                  )}
                  <span
                    className={`font-mono text-sm px-2 py-1 rounded ${viewportWidth < 1024 ? 'bg-error/20' : 'bg-base-300 text-base-content/40'}`}
                  >
                    @media (max-width: 1023px)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {viewportWidth < 768 ? (
                    <HiOutlineCheck className="text-error" size={18} />
                  ) : (
                    <HiOutlineX className="text-base-content/30" size={18} />
                  )}
                  <span
                    className={`font-mono text-sm px-2 py-1 rounded ${viewportWidth < 768 ? 'bg-error/20' : 'bg-base-300 text-base-content/40'}`}
                  >
                    @media (max-width: 767px)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Simulated result */}
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-base-content/70">Simulated Layout</h5>
            <div className="bg-base-300 rounded-lg p-4 min-h-32">
              {approach === 'mobile-first' ? (
                viewportWidth >= 1024 ? (
                  <div className="flex gap-2">
                    <div className="w-1/4 h-20 bg-primary/30 rounded flex items-center justify-center text-xs">
                      Sidebar
                    </div>
                    <div className="flex-1 h-20 bg-primary rounded flex items-center justify-center text-xs text-primary-content">
                      Main (row)
                    </div>
                    <div className="w-1/4 h-20 bg-primary/30 rounded flex items-center justify-center text-xs">
                      Aside
                    </div>
                  </div>
                ) : viewportWidth >= 768 ? (
                  <div className="flex gap-2">
                    <div className="w-1/3 h-20 bg-primary/30 rounded flex items-center justify-center text-xs">
                      Sidebar
                    </div>
                    <div className="flex-1 h-20 bg-primary rounded flex items-center justify-center text-xs text-primary-content">
                      Main (2 col)
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="h-16 bg-primary rounded flex items-center justify-center text-xs text-primary-content">
                      Main (stacked)
                    </div>
                    <div className="h-12 bg-primary/30 rounded flex items-center justify-center text-xs">
                      Sidebar
                    </div>
                  </div>
                )
              ) : viewportWidth < 768 ? (
                <div className="space-y-2">
                  <div className="h-16 bg-error rounded flex items-center justify-center text-xs text-error-content">
                    Main (stacked)
                  </div>
                  <div className="h-12 bg-error/30 rounded flex items-center justify-center text-xs">
                    Sidebar
                  </div>
                </div>
              ) : viewportWidth < 1024 ? (
                <div className="flex gap-2">
                  <div className="w-1/3 h-20 bg-error/30 rounded flex items-center justify-center text-xs">
                    Sidebar
                  </div>
                  <div className="flex-1 h-20 bg-error rounded flex items-center justify-center text-xs text-error-content">
                    Main (2 col)
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="w-1/4 h-20 bg-error/30 rounded flex items-center justify-center text-xs">
                    Sidebar
                  </div>
                  <div className="flex-1 h-20 bg-error rounded flex items-center justify-center text-xs text-error-content">
                    Main (row)
                  </div>
                  <div className="w-1/4 h-20 bg-error/30 rounded flex items-center justify-center text-xs">
                    Aside
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <div
          className={`card bg-base-200 p-4 ${approach === 'mobile-first' ? 'ring-2 ring-success' : ''}`}
        >
          <h5 className="font-semibold text-success flex items-center gap-2 mb-2">
            <HiOutlineCheck size={18} />
            Mobile-First (Recommended)
          </h5>
          <ul className="text-sm space-y-1 text-base-content/70">
            <li>
              <HiOutlineArrowRight className="inline text-success" size={14} /> Start simple, add
              complexity
            </li>
            <li>
              <HiOutlineArrowRight className="inline text-success" size={14} /> Base styles are
              minimal
            </li>
            <li>
              <HiOutlineArrowRight className="inline text-success" size={14} /> Uses{' '}
              <code>min-width</code>
            </li>
            <li>
              <HiOutlineArrowRight className="inline text-success" size={14} /> Progressive
              enhancement
            </li>
          </ul>
        </div>

        <div
          className={`card bg-base-200 p-4 ${approach === 'desktop-first' ? 'ring-2 ring-error' : ''}`}
        >
          <h5 className="font-semibold text-error flex items-center gap-2 mb-2">
            <HiOutlineX size={18} />
            Desktop-First (Avoid)
          </h5>
          <ul className="text-sm space-y-1 text-base-content/70">
            <li>
              <HiOutlineArrowRight className="inline text-error" size={14} /> Start complex, remove
              features
            </li>
            <li>
              <HiOutlineArrowRight className="inline text-error" size={14} /> More CSS overrides
              needed
            </li>
            <li>
              <HiOutlineArrowRight className="inline text-error" size={14} /> Uses{' '}
              <code>max-width</code>
            </li>
            <li>
              <HiOutlineArrowRight className="inline text-error" size={14} /> Graceful degradation
            </li>
          </ul>
        </div>
      </div>

      {/* Code Examples */}
      <CodeSnippet
        title={approach === 'mobile-first' ? 'Mobile-First CSS' : 'Desktop-First CSS'}
        language="css"
        code={approach === 'mobile-first' ? mobileFirstCode : desktopFirstCode}
      />

      {/* Pro Tip */}
      <div className="alert alert-info">
        <div>
          <h4 className="font-bold">Common Breakpoints</h4>
          <p className="text-sm mt-1 font-mono">
            sm: 640px • md: 768px • lg: 1024px • xl: 1280px • 2xl: 1536px
          </p>
          <p className="text-xs mt-1">
            These are Tailwind's defaults and work well for most projects.
          </p>
        </div>
      </div>
    </div>
  );
}
