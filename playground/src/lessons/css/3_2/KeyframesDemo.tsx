import { useState } from 'react';
import { CodeSnippet } from '@components';
import keyframesCode from './examples/Keyframes.css?raw';
import './examples/KeyframePresets.css';

type AnimationPreset = 'bounce' | 'pulse' | 'shake' | 'spin' | 'slide-in' | 'fade-scale';
type FillMode = 'none' | 'forwards' | 'backwards' | 'both';
type Direction = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

interface AnimationConfig {
  preset: AnimationPreset;
  duration: number;
  delay: number;
  iterationCount: number | 'infinite';
  fillMode: FillMode;
  direction: Direction;
}

const animationPresets: Record<AnimationPreset, string> = {
  bounce: 'demo-bounce',
  pulse: 'demo-pulse',
  shake: 'demo-shake',
  spin: 'demo-spin',
  'slide-in': 'demo-slide-in',
  'fade-scale': 'demo-fade-scale',
};

export default function KeyframesDemo(): React.ReactElement {
  const [config, setConfig] = useState<AnimationConfig>({
    preset: 'bounce',
    duration: 1,
    delay: 0,
    iterationCount: 'infinite',
    fillMode: 'none',
    direction: 'normal',
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);

  const restartAnimation = () => {
    setKey((k) => k + 1);
    setIsPlaying(true);
  };

  const animationStyle = {
    animationName: animationPresets[config.preset],
    animationDuration: `${config.duration}s`,
    animationDelay: `${config.delay}s`,
    animationIterationCount: config.iterationCount,
    animationFillMode: config.fillMode,
    animationDirection: config.direction,
    animationPlayState: isPlaying ? 'running' : 'paused',
  };

  const generatedCSS = `.element {
  animation: ${animationPresets[config.preset]} ${config.duration}s ${config.delay > 0 ? `${config.delay}s ` : ''}${config.fillMode !== 'none' ? config.fillMode + ' ' : ''}${config.direction !== 'normal' ? config.direction + ' ' : ''}${config.iterationCount};
}`;

  return (
    <div className="space-y-6">
      {/* Animation Presets */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(animationPresets) as AnimationPreset[]).map((preset) => (
          <button
            key={preset}
            onClick={() => {
              setConfig({ ...config, preset });
              restartAnimation();
            }}
            className={`btn btn-sm ${config.preset === preset ? 'btn-primary' : 'btn-ghost'}`}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Main Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Preview</h4>
              <div className="flex gap-2">
                <button onClick={() => setIsPlaying(!isPlaying)} className="btn btn-xs btn-ghost">
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={restartAnimation} className="btn btn-xs btn-primary">
                  Restart
                </button>
              </div>
            </div>

            <div className="relative h-48 bg-base-300 rounded-lg overflow-hidden flex items-center justify-center">
              <div
                key={key}
                className="w-16 h-16 rounded-xl bg-linear-to-br from-primary to-secondary shadow-lg"
                style={animationStyle}
              />
            </div>

            {/* Generated CSS */}
            <CodeSnippet language="css" code={generatedCSS} showCopy={false} />
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <h4 className="font-semibold">Animation Properties</h4>

            {/* Duration */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm">
                <span>Duration</span>
                <span className="font-mono">{config.duration}s</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={config.duration}
                onChange={(e) => setConfig({ ...config, duration: Number(e.target.value) })}
                className="range range-xs range-primary w-full"
              />
            </div>

            {/* Delay */}
            <div className="space-y-2">
              <label className="flex justify-between text-sm">
                <span>Delay</span>
                <span className="font-mono">{config.delay}s</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={config.delay}
                onChange={(e) => setConfig({ ...config, delay: Number(e.target.value) })}
                className="range range-xs range-secondary w-full"
              />
            </div>

            {/* Iteration Count */}
            <div className="space-y-2">
              <label className="text-sm">Iteration Count</label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 'infinite'].map((count) => (
                  <button
                    key={count}
                    onClick={() =>
                      setConfig({
                        ...config,
                        iterationCount: count as number | 'infinite',
                      })
                    }
                    className={`btn btn-xs ${config.iterationCount === count ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Fill Mode */}
            <div className="space-y-2">
              <label className="text-sm">Fill Mode</label>
              <select
                value={config.fillMode}
                onChange={(e) => setConfig({ ...config, fillMode: e.target.value as FillMode })}
                className="select select-sm select-bordered w-full"
              >
                <option value="none">none</option>
                <option value="forwards">forwards</option>
                <option value="backwards">backwards</option>
                <option value="both">both</option>
              </select>
            </div>

            {/* Direction */}
            <div className="space-y-2">
              <label className="text-sm">Direction</label>
              <select
                value={config.direction}
                onChange={(e) => setConfig({ ...config, direction: e.target.value as Direction })}
                className="select select-sm select-bordered w-full"
              >
                <option value="normal">normal</option>
                <option value="reverse">reverse</option>
                <option value="alternate">alternate</option>
                <option value="alternate-reverse">alternate-reverse</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Fill Mode Explanation */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">animation-fill-mode Explained</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-base-300 rounded-lg">
            <h5 className="font-semibold text-success">forwards</h5>
            <p className="text-sm text-base-content/70 mt-2">
              Element <strong>keeps</strong> the styles from the last keyframe (100%) after
              animation ends. Use for entrances that should stay visible.
            </p>
            <div className="mt-2 text-xs font-mono bg-base-200 rounded p-2">
              After: opacity: 1; ✓
            </div>
          </div>
          <div className="p-4 bg-base-300 rounded-lg">
            <h5 className="font-semibold text-warning">backwards</h5>
            <p className="text-sm text-base-content/70 mt-2">
              Element <strong>applies</strong> the styles from the first keyframe (0%) during the
              delay period. Use when delay starts from a different state.
            </p>
            <div className="mt-2 text-xs font-mono bg-base-200 rounded p-2">
              During delay: opacity: 0;
            </div>
          </div>
          <div className="p-4 bg-base-300 rounded-lg">
            <h5 className="font-semibold text-primary">both</h5>
            <p className="text-sm text-base-content/70 mt-2">
              Combines <strong>forwards + backwards</strong>. Applies start styles during delay AND
              keeps end styles after animation.
            </p>
            <div className="mt-2 text-xs font-mono bg-base-200 rounded p-2">
              Best of both worlds ✓
            </div>
          </div>
          <div className="p-4 bg-base-300 rounded-lg">
            <h5 className="font-semibold text-base-content/60">none (default)</h5>
            <p className="text-sm text-base-content/70 mt-2">
              Element <strong>reverts</strong> to its original styles when animation ends. No styles
              are retained.
            </p>
            <div className="mt-2 text-xs font-mono bg-base-200 rounded p-2">
              After: back to original
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="Keyframe Animations" language="css" code={keyframesCode} />
    </div>
  );
}
