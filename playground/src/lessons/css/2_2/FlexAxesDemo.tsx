import { useState } from 'react';
import { HiOutlineArrowRight, HiOutlineArrowDown } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import flexAxesCode from './examples/FlexAxes.css?raw';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

export default function FlexAxesDemo(): React.ReactElement {
  const [direction, setDirection] = useState<FlexDirection>('row');
  const [justify, setJustify] = useState<JustifyContent>('flex-start');
  const [align, setAlign] = useState<AlignItems>('stretch');

  const isHorizontal = direction === 'row' || direction === 'row-reverse';

  const directions: FlexDirection[] = ['row', 'row-reverse', 'column', 'column-reverse'];
  const justifyOptions: JustifyContent[] = [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ];
  const alignOptions: AlignItems[] = ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-base-200 rounded-xl p-4 space-y-4">
        {/* Direction */}
        <div>
          <h5 className="font-semibold text-sm mb-2">flex-direction</h5>
          <div className="flex flex-wrap gap-2">
            {directions.map((dir) => (
              <button
                key={dir}
                onClick={() => setDirection(dir)}
                className={`btn btn-sm ${direction === dir ? 'btn-primary' : 'btn-ghost'}`}
              >
                {dir}
              </button>
            ))}
          </div>
        </div>

        {/* Justify Content */}
        <div>
          <h5 className="font-semibold text-sm mb-2">
            <span className="text-success">justify-content</span>
            <span className="text-xs text-base-content/50 ml-2">(main axis)</span>
          </h5>
          <div className="flex flex-wrap gap-2">
            {justifyOptions.map((j) => (
              <button
                key={j}
                onClick={() => setJustify(j)}
                className={`btn btn-sm ${justify === j ? 'btn-success' : 'btn-ghost'}`}
              >
                {j}
              </button>
            ))}
          </div>
        </div>

        {/* Align Items */}
        <div>
          <h5 className="font-semibold text-sm mb-2">
            <span className="text-warning">align-items</span>
            <span className="text-xs text-base-content/50 ml-2">(cross axis)</span>
          </h5>
          <div className="flex flex-wrap gap-2">
            {alignOptions.map((a) => (
              <button
                key={a}
                onClick={() => setAlign(a)}
                className={`btn btn-sm ${align === a ? 'btn-warning' : 'btn-ghost'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Axis Indicator */}
      <div className="bg-base-200 rounded-xl p-4">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            {isHorizontal ? (
              <HiOutlineArrowRight className="text-success" size={20} />
            ) : (
              <HiOutlineArrowDown className="text-success" size={20} />
            )}
            <span>
              <strong className="text-success">Main Axis:</strong>{' '}
              {isHorizontal ? 'Horizontal →' : 'Vertical ↓'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isHorizontal ? (
              <HiOutlineArrowDown className="text-warning" size={20} />
            ) : (
              <HiOutlineArrowRight className="text-warning" size={20} />
            )}
            <span>
              <strong className="text-warning">Cross Axis:</strong>{' '}
              {isHorizontal ? 'Vertical ↓' : 'Horizontal →'}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Live Preview</h4>

        <div
          className="bg-base-300 rounded-lg p-4 min-h-[250px] border-2 border-dashed border-base-content/20 transition-all"
          style={{
            display: 'flex',
            flexDirection: direction,
            justifyContent: justify,
            alignItems: align,
          }}
        >
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="bg-primary text-primary-content rounded-lg p-4 m-1 font-semibold text-center min-w-[60px] transition-all"
              style={{
                height: align === 'stretch' ? 'auto' : num === 2 ? '80px' : '60px',
              }}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Current CSS */}
      <div className="bg-base-200 rounded-xl p-4">
        <h5 className="font-semibold text-sm mb-2">Generated CSS</h5>
        <pre className="bg-base-300 rounded-lg p-4 text-sm font-mono overflow-x-auto">
          <code>
            {`.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
}`}
          </code>
        </pre>
      </div>

      {/* Quick Reference */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border-2 border-success bg-success/10">
          <h5 className="font-semibold text-success mb-2">justify-content (Main Axis)</h5>
          <ul className="text-sm space-y-1 text-base-content/70">
            <li>
              • <code>flex-start</code> — Pack items at start
            </li>
            <li>
              • <code>flex-end</code> — Pack items at end
            </li>
            <li>
              • <code>center</code> — Center items
            </li>
            <li>
              • <code>space-between</code> — Equal space between
            </li>
            <li>
              • <code>space-around</code> — Equal space around
            </li>
            <li>
              • <code>space-evenly</code> — Equal space everywhere
            </li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border-2 border-warning bg-warning/10">
          <h5 className="font-semibold text-warning mb-2">align-items (Cross Axis)</h5>
          <ul className="text-sm space-y-1 text-base-content/70">
            <li>
              • <code>flex-start</code> — Align at start
            </li>
            <li>
              • <code>flex-end</code> — Align at end
            </li>
            <li>
              • <code>center</code> — Center items
            </li>
            <li>
              • <code>stretch</code> — Stretch to fill (default)
            </li>
            <li>
              • <code>baseline</code> — Align by text baseline
            </li>
          </ul>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="Flex Axes Reference" language="css" code={flexAxesCode} />
    </div>
  );
}
