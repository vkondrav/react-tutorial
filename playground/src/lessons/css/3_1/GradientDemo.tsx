import { useState } from 'react';
import { CodeSnippet } from '@components';
import linearGradientCode from './examples/LinearGradient.css?raw';
import radialGradientCode from './examples/RadialGradient.css?raw';
import conicGradientCode from './examples/ConicGradient.css?raw';

type GradientType = 'linear' | 'radial' | 'conic';

interface GradientConfig {
  type: GradientType;
  // Linear
  angle: number;
  // Radial
  shape: 'circle' | 'ellipse';
  // Conic
  fromAngle: number;
  // Common
  color1: string;
  color2: string;
  color3: string;
  useThreeColors: boolean;
  hardStop: boolean;
}

const colorPresets = [
  { name: 'Sunset', colors: ['#f97316', '#ec4899', '#8b5cf6'] },
  { name: 'Ocean', colors: ['#06b6d4', '#3b82f6', '#1e3a8a'] },
  { name: 'Forest', colors: ['#22c55e', '#16a34a', '#15803d'] },
  { name: 'Fire', colors: ['#fbbf24', '#f97316', '#dc2626'] },
];

export default function GradientDemo(): React.ReactElement {
  const [config, setConfig] = useState<GradientConfig>({
    type: 'linear',
    angle: 90,
    shape: 'circle',
    fromAngle: 0,
    color1: '#f97316',
    color2: '#ec4899',
    color3: '#8b5cf6',
    useThreeColors: true,
    hardStop: false,
  });

  const generateGradient = (): string => {
    const stops = config.hardStop
      ? config.useThreeColors
        ? `${config.color1} 0%, ${config.color1} 33%, ${config.color2} 33%, ${config.color2} 66%, ${config.color3} 66%, ${config.color3} 100%`
        : `${config.color1} 0%, ${config.color1} 50%, ${config.color2} 50%, ${config.color2} 100%`
      : config.useThreeColors
        ? `${config.color1}, ${config.color2}, ${config.color3}`
        : `${config.color1}, ${config.color2}`;

    switch (config.type) {
      case 'linear':
        return `linear-gradient(${config.angle}deg, ${stops})`;
      case 'radial':
        return `radial-gradient(${config.shape}, ${stops})`;
      case 'conic':
        return `conic-gradient(from ${config.fromAngle}deg, ${stops})`;
    }
  };

  const gradient = generateGradient();

  return (
    <div className="space-y-6">
      {/* Type Toggle */}
      <div className="flex flex-wrap gap-2">
        {(['linear', 'radial', 'conic'] as GradientType[]).map((type) => (
          <button
            key={type}
            onClick={() => setConfig({ ...config, type })}
            className={`btn btn-sm ${config.type === type ? 'btn-primary' : 'btn-ghost'}`}
          >
            {type}-gradient
          </button>
        ))}
      </div>

      {/* Live Preview & Controls */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="space-y-4">
            <h4 className="font-semibold">Preview</h4>
            <div
              className="w-full h-48 rounded-xl shadow-lg transition-all duration-300"
              style={{ background: gradient }}
            />
            <div className="bg-base-300 rounded-lg p-3 font-mono text-xs break-all">
              background: {gradient};
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <h4 className="font-semibold">Controls</h4>

            {/* Type-specific controls */}
            {config.type === 'linear' && (
              <div className="space-y-2">
                <label className="flex justify-between text-sm">
                  <span>Angle</span>
                  <span className="font-mono">{config.angle}°</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={config.angle}
                  onChange={(e) => setConfig({ ...config, angle: Number(e.target.value) })}
                  className="range range-xs range-primary w-full"
                />
                <div className="flex gap-2 flex-wrap">
                  {[0, 45, 90, 135, 180].map((a) => (
                    <button
                      key={a}
                      onClick={() => setConfig({ ...config, angle: a })}
                      className={`btn btn-xs ${config.angle === a ? 'btn-primary' : 'btn-ghost'}`}
                    >
                      {a}°
                    </button>
                  ))}
                </div>
              </div>
            )}

            {config.type === 'radial' && (
              <div className="space-y-2">
                <label className="text-sm">Shape</label>
                <div className="flex gap-2">
                  {(['circle', 'ellipse'] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setConfig({ ...config, shape })}
                      className={`btn btn-sm ${config.shape === shape ? 'btn-primary' : 'btn-ghost'}`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {config.type === 'conic' && (
              <div className="space-y-2">
                <label className="flex justify-between text-sm">
                  <span>Start Angle</span>
                  <span className="font-mono">{config.fromAngle}°</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={config.fromAngle}
                  onChange={(e) => setConfig({ ...config, fromAngle: Number(e.target.value) })}
                  className="range range-xs range-accent w-full"
                />
              </div>
            )}

            {/* Color presets */}
            <div className="space-y-2">
              <label className="text-sm">Color Presets</label>
              <div className="flex gap-2 flex-wrap">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      setConfig({
                        ...config,
                        color1: preset.colors[0],
                        color2: preset.colors[1],
                        color3: preset.colors[2],
                        useThreeColors: true,
                      })
                    }
                    className="btn btn-xs btn-ghost"
                    style={{
                      background: `linear-gradient(90deg, ${preset.colors.join(', ')})`,
                      color: 'white',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.useThreeColors}
                  onChange={(e) => setConfig({ ...config, useThreeColors: e.target.checked })}
                  className="checkbox checkbox-sm checkbox-primary"
                />
                <span className="text-sm">Three colors</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.hardStop}
                  onChange={(e) => setConfig({ ...config, hardStop: e.target.checked })}
                  className="checkbox checkbox-sm checkbox-warning"
                />
                <span className="text-sm">Hard stops (sharp edges)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Hard Stop Explanation */}
      <div className="alert bg-base-200">
        <div>
          <h4 className="font-bold">Hard Stops vs Smooth Transitions</h4>
          <div className="grid sm:grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg"
                style={{ background: 'linear-gradient(90deg, #3b82f6, #ec4899)' }}
              />
              <p className="text-xs font-mono">
                linear-gradient(90deg, blue, pink)
                <br />
                <span className="text-base-content/60">→ Smooth transition</span>
              </p>
            </div>
            <div className="space-y-2">
              <div
                className="h-12 rounded-lg"
                style={{ background: 'linear-gradient(90deg, #3b82f6 50%, #ec4899 50%)' }}
              />
              <p className="text-xs font-mono">
                linear-gradient(90deg, blue 50%, pink 50%)
                <br />
                <span className="text-base-content/60">→ Sharp edge at 50%</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <CodeSnippet
        title={`${config.type}-gradient`}
        language="css"
        code={
          config.type === 'linear'
            ? linearGradientCode
            : config.type === 'radial'
              ? radialGradientCode
              : conicGradientCode
        }
      />

      {/* Common Use Cases */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Common Use Cases</h4>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div
              className="h-24 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Hero Background
            </div>
            <p className="text-xs text-base-content/60">Vibrant diagonal gradient</p>
          </div>
          <div className="space-y-2">
            <div
              className="h-24 rounded-lg flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%), url("https://picsum.photos/200/100")',
                backgroundSize: 'cover',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.875rem',
              }}
            >
              Image Overlay
            </div>
            <p className="text-xs text-base-content/60">Gradient over image</p>
          </div>
          <div className="space-y-2">
            <div
              className="h-24 rounded-lg relative overflow-hidden"
              style={{
                background: `conic-gradient(from 0deg, #3b82f6 0%, #3b82f6 75%, #e5e7eb 75%, #e5e7eb 100%)`,
              }}
            >
              <div className="absolute inset-2 rounded-full bg-base-100 flex items-center justify-center font-bold">
                75%
              </div>
            </div>
            <p className="text-xs text-base-content/60">Pie chart / progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}
