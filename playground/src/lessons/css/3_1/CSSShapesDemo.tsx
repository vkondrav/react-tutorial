import { useState } from 'react';
import { CodeSnippet } from '@components';
import clipPathCode from './examples/ClipPath.css?raw';

type ShapeType = 'circle' | 'ellipse' | 'polygon' | 'inset';

interface ShapeConfig {
  type: ShapeType;
  // Circle
  circleRadius: number;
  // Ellipse
  ellipseX: number;
  ellipseY: number;
  // Polygon presets
  polygonPreset: 'triangle' | 'hexagon' | 'star' | 'arrow' | 'custom';
  // Inset
  insetTop: number;
  insetRight: number;
  insetBottom: number;
  insetLeft: number;
  insetRadius: number;
}

const polygonPresets = {
  triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  star: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  arrow: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)',
  custom: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
};

export default function CSSShapesDemo(): React.ReactElement {
  const [config, setConfig] = useState<ShapeConfig>({
    type: 'circle',
    circleRadius: 50,
    ellipseX: 50,
    ellipseY: 30,
    polygonPreset: 'triangle',
    insetTop: 10,
    insetRight: 10,
    insetBottom: 10,
    insetLeft: 10,
    insetRadius: 0,
  });

  const [showShapeOutside, setShowShapeOutside] = useState(false);

  const generateClipPath = (): string => {
    switch (config.type) {
      case 'circle':
        return `circle(${config.circleRadius}%)`;
      case 'ellipse':
        return `ellipse(${config.ellipseX}% ${config.ellipseY}%)`;
      case 'polygon':
        return polygonPresets[config.polygonPreset];
      case 'inset':
        return `inset(${config.insetTop}% ${config.insetRight}% ${config.insetBottom}% ${config.insetLeft}% round ${config.insetRadius}px)`;
    }
  };

  const clipPath = generateClipPath();

  return (
    <div className="space-y-6">
      {/* Shape Type Toggle */}
      <div className="flex flex-wrap gap-2">
        {(['circle', 'ellipse', 'polygon', 'inset'] as ShapeType[]).map((type) => (
          <button
            key={type}
            onClick={() => setConfig({ ...config, type })}
            className={`btn btn-sm ${config.type === type ? 'btn-primary' : 'btn-ghost'}`}
          >
            {type}()
          </button>
        ))}
      </div>

      {/* Main Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="space-y-4">
            <h4 className="font-semibold">clip-path Preview</h4>
            <div className="relative">
              {/* Ghost outline showing original bounds */}
              <div className="absolute inset-0 w-48 h-48 mx-auto border-2 border-dashed border-base-content/20 rounded-lg" />
              {/* Clipped element */}
              <div
                className="w-48 h-48 mx-auto bg-linear-to-br from-primary to-secondary transition-all duration-300"
                style={{ clipPath }}
              />
            </div>
            <div className="bg-base-300 rounded-lg p-3 font-mono text-xs text-center">
              clip-path: {clipPath};
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <h4 className="font-semibold">Controls</h4>

            {config.type === 'circle' && (
              <div className="space-y-2">
                <label className="flex justify-between text-sm">
                  <span>Radius</span>
                  <span className="font-mono">{config.circleRadius}%</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="70"
                  value={config.circleRadius}
                  onChange={(e) => setConfig({ ...config, circleRadius: Number(e.target.value) })}
                  className="range range-xs range-primary w-full"
                />
              </div>
            )}

            {config.type === 'ellipse' && (
              <>
                <div className="space-y-2">
                  <label className="flex justify-between text-sm">
                    <span>Horizontal Radius</span>
                    <span className="font-mono">{config.ellipseX}%</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="70"
                    value={config.ellipseX}
                    onChange={(e) => setConfig({ ...config, ellipseX: Number(e.target.value) })}
                    className="range range-xs range-primary w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex justify-between text-sm">
                    <span>Vertical Radius</span>
                    <span className="font-mono">{config.ellipseY}%</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="70"
                    value={config.ellipseY}
                    onChange={(e) => setConfig({ ...config, ellipseY: Number(e.target.value) })}
                    className="range range-xs range-secondary w-full"
                  />
                </div>
              </>
            )}

            {config.type === 'polygon' && (
              <div className="space-y-2">
                <label className="text-sm">Preset Shapes</label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(polygonPresets) as Array<keyof typeof polygonPresets>).map(
                    (preset) => (
                      <button
                        key={preset}
                        onClick={() => setConfig({ ...config, polygonPreset: preset })}
                        className={`btn btn-sm ${config.polygonPreset === preset ? 'btn-primary' : 'btn-ghost'}`}
                      >
                        {preset}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {config.type === 'inset' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {(['Top', 'Right', 'Bottom', 'Left'] as const).map((side) => {
                    const key = `inset${side}` as keyof ShapeConfig;
                    return (
                      <div key={side} className="space-y-1">
                        <label className="flex justify-between text-xs">
                          <span>{side}</span>
                          <span className="font-mono">{config[key] as number}%</span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="40"
                          value={config[key] as number}
                          onChange={(e) => setConfig({ ...config, [key]: Number(e.target.value) })}
                          className="range range-xs range-primary w-full"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-2">
                  <label className="flex justify-between text-sm">
                    <span>Border Radius</span>
                    <span className="font-mono">{config.insetRadius}px</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={config.insetRadius}
                    onChange={(e) => setConfig({ ...config, insetRadius: Number(e.target.value) })}
                    className="range range-xs range-accent w-full"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Shape Outside Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">shape-outside: Text Wrapping</h4>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showShapeOutside}
              onChange={(e) => setShowShapeOutside(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm">Enable shape-outside</span>
          </label>
        </div>

        <div className="bg-base-300 rounded-lg p-4">
          <div
            className="w-24 h-24 bg-linear-to-br from-primary to-secondary float-left mr-4 mb-2"
            style={{
              clipPath: 'circle(50%)',
              shapeOutside: showShapeOutside ? 'circle(50%)' : 'none',
            }}
          />
          <p className="text-sm text-base-content/70 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <p className="text-xs text-base-content/60 mt-2">
          {showShapeOutside
            ? '✓ Text wraps around the circular shape'
            : '✗ Text wraps around the square bounding box'}
        </p>
      </div>

      {/* Common Shapes Gallery */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Common Shapes Gallery</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: 'Circle', path: 'circle(50%)' },
            { name: 'Ellipse', path: 'ellipse(50% 30%)' },
            { name: 'Triangle', path: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
            { name: 'Diamond', path: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
            { name: 'Pentagon', path: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
            {
              name: 'Hexagon',
              path: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            },
            {
              name: 'Star',
              path: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            },
            {
              name: 'Arrow',
              path: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)',
            },
          ].map((shape) => (
            <div key={shape.name} className="text-center">
              <div
                className="w-16 h-16 mx-auto bg-linear-to-br from-primary to-secondary"
                style={{ clipPath: shape.path }}
              />
              <p className="text-xs mt-2">{shape.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="clip-path & shape-outside" language="css" code={clipPathCode} />

      {/* Pro Tip */}
      <div className="alert alert-info">
        <div>
          <h4 className="font-bold">Pro Tip</h4>
          <p className="text-sm mt-1">
            Use{' '}
            <a
              href="https://bennettfeely.com/clippy/"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              Clippy
            </a>{' '}
            to visually create complex polygon shapes. It generates the CSS for you!
          </p>
        </div>
      </div>
    </div>
  );
}
