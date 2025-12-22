import { useState } from 'react';
import { HiCheck, HiOutlineArrowRight, HiOutlineCursorClick } from 'react-icons/hi';

export default function JSXTransformDemo() {
  const [showTransform, setShowTransform] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div className="card bg-base-200 overflow-hidden border-2 border-success/30">
          <div className="px-4 py-2 bg-success/20 border-b border-success/30 text-xs font-semibold text-success flex items-center gap-2">
            <HiCheck size={16} />
            What you write (JSX)
          </div>
          <pre className="m-0 p-4 text-sm leading-relaxed text-base-content/70">
            {`<h1 className="title">
  Hello, World!
</h1>`}
          </pre>
        </div>

        <button
          onClick={() => setShowTransform(!showTransform)}
          className={`btn btn-circle ${showTransform ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineArrowRight size={24} />
        </button>

        <div
          className={`card bg-base-200 overflow-hidden border-2 border-warning/30 transition-opacity ${
            showTransform ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <div className="px-4 py-2 bg-warning/20 border-b border-warning/30 text-xs font-semibold text-warning">
            What React sees (JavaScript)
          </div>
          <pre className="m-0 p-4 text-sm leading-relaxed text-base-content/70">
            {`React.createElement(
  'h1',
  { className: 'title' },
  'Hello, World!'
)`}
          </pre>
        </div>
      </div>
      <p className="text-base-content/50 text-sm mt-4 text-center flex items-center justify-center gap-2">
        <HiOutlineCursorClick size={16} />
        <span>Click the arrow to see the transformation</span>
      </p>
    </div>
  );
}
