import { useState, useRef, useEffect } from 'react';
import { CodeSnippet } from '@components';
import timingFunctionsCode from './examples/TimingFunctions.css?raw';

interface BezierPreset {
  name: string;
  values: [number, number, number, number];
  description: string;
}

const presets: BezierPreset[] = [
  { name: 'linear', values: [0, 0, 1, 1], description: 'Constant speed' },
  { name: 'ease', values: [0.25, 0.1, 0.25, 1], description: 'Default, starts fast' },
  { name: 'ease-in', values: [0.42, 0, 1, 1], description: 'Starts slow (exits)' },
  { name: 'ease-out', values: [0, 0, 0.58, 1], description: 'Ends slow (entrances)' },
  { name: 'ease-in-out', values: [0.42, 0, 0.58, 1], description: 'Slow start & end' },
  { name: 'bounce', values: [0.68, -0.55, 0.265, 1.55], description: 'Overshoot effect' },
  { name: 'snap', values: [0.9, 0, 0.1, 1], description: 'Quick snap to end' },
];

export default function BezierCurvesDemo(): React.ReactElement {
  const [bezier, setBezier] = useState<[number, number, number, number]>([0.25, 0.1, 0.25, 1]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('ease');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw bezier curve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = 350;
    const displayHeight = 200;

    // Set canvas buffer size (scaled for DPR)
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    // Set CSS display size
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Scale context to match DPR
    ctx.scale(dpr, dpr);

    const width = displayWidth;
    const height = displayHeight;
    const padding = 20;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const x = padding + (graphWidth * i) / 4;
      const y = padding + (graphHeight * i) / 4;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Control point lines
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    // Line from P0 to P1
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding + bezier[0] * graphWidth, height - padding - bezier[1] * graphHeight);
    ctx.stroke();

    // Line from P3 to P2
    ctx.beginPath();
    ctx.moveTo(width - padding, padding);
    ctx.lineTo(padding + bezier[2] * graphWidth, height - padding - bezier[3] * graphHeight);
    ctx.stroke();

    ctx.setLineDash([]);

    // Bezier curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.bezierCurveTo(
      padding + bezier[0] * graphWidth,
      height - padding - bezier[1] * graphHeight,
      padding + bezier[2] * graphWidth,
      height - padding - bezier[3] * graphHeight,
      width - padding,
      padding
    );
    ctx.stroke();

    // Control points
    const drawPoint = (x: number, y: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    };

    // P0 (0, 0) - fixed
    drawPoint(padding, height - padding, '#64748b');
    // P1 (x1, y1)
    drawPoint(
      padding + bezier[0] * graphWidth,
      height - padding - bezier[1] * graphHeight,
      '#6366f1'
    );
    // P2 (x2, y2)
    drawPoint(
      padding + bezier[2] * graphWidth,
      height - padding - bezier[3] * graphHeight,
      '#6366f1'
    );
    // P3 (1, 1) - fixed
    drawPoint(width - padding, padding, '#64748b');

    // Labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px monospace';
    ctx.fillText('0%', padding - 5, height - 5);
    ctx.fillText('100%', width - padding - 15, height - 5);
    ctx.fillText('time →', width / 2 - 15, height - 5);

    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('progress →', -height / 2 - 20, 12);
    ctx.restore();
  }, [bezier]);

  const applyPreset = (preset: BezierPreset) => {
    setBezier(preset.values);
    setSelectedPreset(preset.name);
  };

  const triggerAnimation = () => {
    setIsAnimating(false);
    // Force reflow
    setTimeout(() => setIsAnimating(true), 10);
    // Reset after animation
    setTimeout(() => setIsAnimating(false), 1500);
  };

  const cubicBezierString = `cubic-bezier(${bezier.join(', ')})`;

  return (
    <div className="space-y-6">
      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className={`btn btn-sm ${selectedPreset === preset.name ? 'btn-primary' : 'btn-ghost'}`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Main Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Curve Visualization */}
          <div className="space-y-4">
            <h4 className="font-semibold">Bezier Curve</h4>
            <canvas ref={canvasRef} className="bg-base-300 rounded-lg" />
            <div className="bg-base-300 rounded-lg p-3 font-mono text-xs break-all">
              {cubicBezierString}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <h4 className="font-semibold">Control Points</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex justify-between text-sm">
                  <span>x1</span>
                  <span className="font-mono">{bezier[0].toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={bezier[0]}
                  onChange={(e) => {
                    setBezier([Number(e.target.value), bezier[1], bezier[2], bezier[3]]);
                    setSelectedPreset('');
                  }}
                  className="range range-xs range-primary w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="flex justify-between text-sm">
                  <span>y1</span>
                  <span className="font-mono">{bezier[1].toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-0.5"
                  max="1.5"
                  step="0.01"
                  value={bezier[1]}
                  onChange={(e) => {
                    setBezier([bezier[0], Number(e.target.value), bezier[2], bezier[3]]);
                    setSelectedPreset('');
                  }}
                  className="range range-xs range-secondary w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="flex justify-between text-sm">
                  <span>x2</span>
                  <span className="font-mono">{bezier[2].toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={bezier[2]}
                  onChange={(e) => {
                    setBezier([bezier[0], bezier[1], Number(e.target.value), bezier[3]]);
                    setSelectedPreset('');
                  }}
                  className="range range-xs range-primary w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="flex justify-between text-sm">
                  <span>y2</span>
                  <span className="font-mono">{bezier[3].toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-0.5"
                  max="1.5"
                  step="0.01"
                  value={bezier[3]}
                  onChange={(e) => {
                    setBezier([bezier[0], bezier[1], bezier[2], Number(e.target.value)]);
                    setSelectedPreset('');
                  }}
                  className="range range-xs range-secondary w-full"
                />
              </div>
            </div>

            <button onClick={triggerAnimation} className="btn btn-primary w-full">
              Play Animation
            </button>
          </div>
        </div>

        {/* Animation Track */}
        <div className="animation-track mt-6 relative h-12 bg-base-300 rounded-lg overflow-hidden">
          <div
            className={`
              absolute top-1/2 left-0 w-10 h-10 rounded-full
              bg-linear-to-br from-primary to-secondary shadow-lg
            `}
            style={{
              transform: isAnimating
                ? 'translateX(calc(100cqi - 2.5rem)) translateY(-50%)'
                : 'translateY(-50%)',
              transition: isAnimating ? `transform 1s ${cubicBezierString}` : 'none',
            }}
          />
        </div>
      </div>

      {/* Timing Function Comparison */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">When to Use Each</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-base-300 rounded-lg">
            <h5 className="font-semibold text-success">ease-out (Entrances)</h5>
            <p className="text-sm text-base-content/70 mt-2">
              Starts fast, ends slow. Natural for elements <strong>entering</strong> the screen.
              Like a car braking to a stop.
            </p>
          </div>
          <div className="p-4 bg-base-300 rounded-lg">
            <h5 className="font-semibold text-warning">ease-in (Exits)</h5>
            <p className="text-sm text-base-content/70 mt-2">
              Starts slow, ends fast. Natural for elements <strong>leaving</strong> the screen. Like
              a car accelerating away.
            </p>
          </div>
          <div className="p-4 bg-base-300 rounded-lg">
            <h5 className="font-semibold text-primary">ease-in-out (Loops)</h5>
            <p className="text-sm text-base-content/70 mt-2">
              Slow at both ends. Best for <strong>continuous</strong> or looping animations where
              start and end matter equally.
            </p>
          </div>
          <div className="p-4 bg-base-300 rounded-lg">
            <h5 className="font-semibold text-accent">linear (Progress)</h5>
            <p className="text-sm text-base-content/70 mt-2">
              Constant speed. Use for <strong>progress indicators</strong> or when you need
              mathematically predictable motion.
            </p>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="Timing Functions" language="css" code={timingFunctionsCode} />
    </div>
  );
}
