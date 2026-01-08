import { useState } from 'react';
import { CodeSnippet } from '@components';
import backgroundLayeringCode from './examples/BackgroundLayering.css?raw';

type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

const blendModes: BlendMode[] = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'hard-light',
  'soft-light',
  'difference',
];

interface Layer {
  id: number;
  type: 'gradient' | 'color' | 'image';
  value: string;
  enabled: boolean;
}

const defaultLayers: Layer[] = [
  {
    id: 1,
    type: 'gradient',
    value: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
    enabled: true,
  },
  {
    id: 2,
    type: 'image',
    value: 'url("https://picsum.photos/400/300")',
    enabled: true,
  },
];

export default function BackgroundLayeringDemo(): React.ReactElement {
  const [layers, setLayers] = useState<Layer[]>(defaultLayers);
  const [blendMode, setBlendMode] = useState<BlendMode>('normal');
  const [showOrder, setShowOrder] = useState(false);

  const enabledLayers = layers.filter((l) => l.enabled);
  const backgroundValue = enabledLayers.map((l) => l.value).join(', ');

  const toggleLayer = (id: number) => {
    setLayers(layers.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l)));
  };

  const presets = [
    {
      name: 'Gradient Overlay',
      layers: [
        {
          id: 1,
          type: 'gradient' as const,
          value: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
          enabled: true,
        },
        {
          id: 2,
          type: 'image' as const,
          value: 'url("https://picsum.photos/400/300")',
          enabled: true,
        },
      ],
      blend: 'normal' as BlendMode,
    },
    {
      name: 'Color Tint',
      layers: [
        {
          id: 1,
          type: 'gradient' as const,
          value: 'linear-gradient(135deg, rgba(99,102,241,0.8), rgba(236,72,153,0.8))',
          enabled: true,
        },
        {
          id: 2,
          type: 'image' as const,
          value: 'url("https://picsum.photos/400/300")',
          enabled: true,
        },
      ],
      blend: 'normal' as BlendMode,
    },
    {
      name: 'Multiply Effect',
      layers: [
        {
          id: 1,
          type: 'gradient' as const,
          value: 'linear-gradient(135deg, #3b82f6, #ec4899)',
          enabled: true,
        },
        {
          id: 2,
          type: 'image' as const,
          value: 'url("https://picsum.photos/400/300")',
          enabled: true,
        },
      ],
      blend: 'multiply' as BlendMode,
    },
    {
      name: 'Pattern + Gradient',
      layers: [
        {
          id: 1,
          type: 'gradient' as const,
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          enabled: true,
        },
        {
          id: 2,
          type: 'gradient' as const,
          value:
            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
          enabled: true,
        },
      ],
      blend: 'normal' as BlendMode,
    },
  ];

  const applyPreset = (preset: (typeof presets)[0]) => {
    setLayers(preset.layers);
    setBlendMode(preset.blend);
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="btn btn-sm btn-ghost"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Main Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="space-y-4">
            <h4 className="font-semibold">Preview</h4>
            <div
              className="w-full h-48 rounded-xl shadow-lg transition-all duration-300 flex items-end p-4"
              style={{
                background: backgroundValue,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: blendMode,
              }}
            >
              <span className="text-white font-bold text-lg drop-shadow-lg">
                Layered Background
              </span>
            </div>

            {/* Layer Stack Visualization */}
            {showOrder && (
              <div className="space-y-2">
                <p className="text-xs text-base-content/60">Layer Order (top to bottom):</p>
                {enabledLayers.map((layer, index) => (
                  <div
                    key={layer.id}
                    className="flex items-center gap-2 text-xs bg-base-300 rounded px-2 py-1"
                  >
                    <span className="font-mono text-primary">{index + 1}</span>
                    <span className="truncate flex-1">{layer.value.slice(0, 40)}...</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <h4 className="font-semibold">Controls</h4>

            {/* Layer toggles */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Layers</label>
                <button onClick={() => setShowOrder(!showOrder)} className="btn btn-xs btn-ghost">
                  {showOrder ? 'Hide' : 'Show'} order
                </button>
              </div>
              {layers.map((layer) => (
                <label
                  key={layer.id}
                  className="flex items-center gap-2 cursor-pointer bg-base-300 rounded-lg p-2"
                >
                  <input
                    type="checkbox"
                    checked={layer.enabled}
                    onChange={() => toggleLayer(layer.id)}
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold capitalize">{layer.type}</span>
                    <p className="text-xs text-base-content/60 truncate">{layer.value}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Blend Mode */}
            <div className="space-y-2">
              <label className="text-sm">Blend Mode</label>
              <select
                value={blendMode}
                onChange={(e) => setBlendMode(e.target.value as BlendMode)}
                className="select select-sm select-bordered w-full"
              >
                {blendModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Generated CSS */}
        <div className="mt-6 bg-base-300 rounded-lg p-3 font-mono text-xs overflow-x-auto">
          <div className="text-base-content/60">background:</div>
          {enabledLayers.map((layer, i) => (
            <div key={layer.id} className="pl-4">
              {layer.value}
              {i < enabledLayers.length - 1 ? ',' : ';'}
            </div>
          ))}
          {blendMode !== 'normal' && (
            <div className="text-warning mt-1">background-blend-mode: {blendMode};</div>
          )}
        </div>
      </div>

      {/* Key Concept */}
      <div className="alert bg-base-200">
        <div>
          <h4 className="font-bold">Layer Order Matters</h4>
          <p className="text-sm mt-1">
            In CSS backgrounds, the <strong className="text-primary">first</strong> background in
            the list renders <strong className="text-primary">on top</strong>. Think of it like
            layers in Photoshop—the first layer is the topmost.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-mono">
            <div className="bg-base-300 p-2 rounded text-center">
              gradient <span className="text-primary">(top)</span>
            </div>
            <div className="bg-base-300 p-2 rounded text-center">pattern</div>
            <div className="bg-base-300 p-2 rounded text-center">
              image <span className="text-accent">(bottom)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="Background Layering" language="css" code={backgroundLayeringCode} />
    </div>
  );
}
