import { useState } from 'react';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import flexShorthandCode from './examples/FlexShorthand.css?raw';

interface FlexValues {
  grow: number;
  shrink: number;
  basis: string;
}

export default function FlexShorthandDemo(): React.ReactElement {
  const [containerWidth, setContainerWidth] = useState(400);
  const [boxes, setBoxes] = useState<FlexValues[]>([
    { grow: 1, shrink: 1, basis: '0%' },
    { grow: 1, shrink: 1, basis: '0%' },
    { grow: 1, shrink: 1, basis: '0%' },
  ]);

  const updateBox = (index: number, field: keyof FlexValues, value: number | string) => {
    setBoxes((prev) => prev.map((box, i) => (i === index ? { ...box, [field]: value } : box)));
  };

  const presets = [
    { name: 'Equal Width', values: { grow: 1, shrink: 1, basis: '0%' } },
    { name: 'Fixed Width', values: { grow: 0, shrink: 0, basis: '100px' } },
    { name: 'Grow Only', values: { grow: 1, shrink: 0, basis: 'auto' } },
    { name: 'Shrink Only', values: { grow: 0, shrink: 1, basis: '200px' } },
  ];

  const applyPreset = (preset: { grow: number; shrink: number; basis: string }) => {
    setBoxes((prev) => prev.map(() => ({ ...preset })));
  };

  return (
    <div className="space-y-6">
      {/* Flex Shorthand Explanation */}
      <div className="bg-base-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <HiOutlineQuestionMarkCircle className="text-primary" size={20} />
          <h5 className="font-semibold">The flex Shorthand</h5>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-lg">
          <span className="bg-base-300 px-3 py-1 rounded">flex:</span>
          <span className="bg-success/20 text-success px-3 py-1 rounded border border-success">
            grow
          </span>
          <span className="bg-warning/20 text-warning px-3 py-1 rounded border border-warning">
            shrink
          </span>
          <span className="bg-accent/20 text-accent px-3 py-1 rounded border border-accent">
            basis
          </span>
        </div>
        <div className="mt-3 text-sm text-base-content/70 space-y-1">
          <p>
            <span className="text-success font-semibold">flex-grow:</span> How much extra space to
            take (0 = none, 1+ = proportional)
          </p>
          <p>
            <span className="text-warning font-semibold">flex-shrink:</span> How much to shrink when
            space is limited (0 = none, 1+ = proportional)
          </p>
          <p>
            <span className="text-accent font-semibold">flex-basis:</span> Initial size before
            grow/shrink (auto, 0, px, %)
          </p>
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset.values)}
            className="btn btn-sm btn-outline"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Container Width Control */}
      <div className="bg-base-200 rounded-xl p-4">
        <label className="label">
          <span className="label-text font-semibold">Container Width: {containerWidth}px</span>
        </label>
        <input
          type="range"
          min="200"
          max="600"
          value={containerWidth}
          onChange={(e) => setContainerWidth(parseInt(e.target.value))}
          className="range range-primary"
        />
        <div className="text-xs text-base-content/50 mt-1">
          Shrink the container to see flex-shrink in action
        </div>
      </div>

      {/* Box Controls */}
      <div className="grid sm:grid-cols-3 gap-4">
        {boxes.map((box, index) => (
          <div key={index} className="bg-base-200 rounded-xl p-4">
            <h5 className="font-semibold text-sm mb-3">Box {index + 1}</h5>
            <div className="space-y-3">
              <div>
                <label className="label py-0">
                  <span className="label-text text-xs text-success">flex-grow: {box.grow}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  value={box.grow}
                  onChange={(e) => updateBox(index, 'grow', parseInt(e.target.value))}
                  className="range range-xs range-success"
                />
              </div>
              <div>
                <label className="label py-0">
                  <span className="label-text text-xs text-warning">flex-shrink: {box.shrink}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="3"
                  value={box.shrink}
                  onChange={(e) => updateBox(index, 'shrink', parseInt(e.target.value))}
                  className="range range-xs range-warning"
                />
              </div>
              <div>
                <label className="label py-0">
                  <span className="label-text text-xs text-accent">flex-basis</span>
                </label>
                <select
                  value={box.basis}
                  onChange={(e) => updateBox(index, 'basis', e.target.value)}
                  className="select select-xs select-bordered w-full"
                >
                  <option value="auto">auto</option>
                  <option value="0%">0%</option>
                  <option value="100px">100px</option>
                  <option value="150px">150px</option>
                  <option value="200px">200px</option>
                  <option value="33%">33%</option>
                  <option value="50%">50%</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Live Preview</h4>
        <div
          className="bg-base-300 rounded-lg p-2 border-2 border-dashed border-base-content/20 mx-auto transition-all overflow-hidden"
          style={{ width: containerWidth, display: 'flex' }}
        >
          {boxes.map((box, index) => (
            <div
              key={index}
              className={`${
                index === 0
                  ? 'bg-primary text-primary-content'
                  : index === 1
                    ? 'bg-secondary text-secondary-content'
                    : 'bg-accent text-accent-content'
              } rounded-lg p-3 m-1 text-center font-mono text-xs transition-all min-w-0`}
              style={{
                flexGrow: box.grow,
                flexShrink: box.shrink,
                flexBasis: box.basis,
              }}
            >
              <div className="font-bold text-lg">{index + 1}</div>
              <div className="opacity-80 whitespace-nowrap overflow-hidden text-ellipsis">
                {box.grow} / {box.shrink} / {box.basis}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-xs text-base-content/50 mt-2">
          Container: {containerWidth}px
        </div>
      </div>

      {/* Common flex values */}
      <div className="bg-base-200 rounded-xl p-4">
        <h5 className="font-semibold mb-3">Common flex Values</h5>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-base-300 rounded p-3">
            <code className="text-primary font-semibold">flex: 1</code>
            <p className="text-xs text-base-content/60 mt-1">
              = flex: 1 1 0% — Grow equally, shrink equally, start from 0
            </p>
          </div>
          <div className="bg-base-300 rounded p-3">
            <code className="text-secondary font-semibold">flex: auto</code>
            <p className="text-xs text-base-content/60 mt-1">
              = flex: 1 1 auto — Grow & shrink based on content size
            </p>
          </div>
          <div className="bg-base-300 rounded p-3">
            <code className="text-accent font-semibold">flex: none</code>
            <p className="text-xs text-base-content/60 mt-1">
              = flex: 0 0 auto — Fixed size, no grow/shrink
            </p>
          </div>
          <div className="bg-base-300 rounded p-3">
            <code className="text-warning font-semibold">flex: 0 1 auto</code>
            <p className="text-xs text-base-content/60 mt-1">
              Default — Don't grow, shrink if needed
            </p>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="Flex Shorthand Reference" language="css" code={flexShorthandCode} />
    </div>
  );
}
