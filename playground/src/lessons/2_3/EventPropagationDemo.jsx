import { useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';

export default function EventPropagationDemo() {
  const [parentClicks, setParentClicks] = useState(0);
  const [childClicks, setChildClicks] = useState(0);
  const [stoppedClicks, setStoppedClicks] = useState(0);
  const [log, setLog] = useState([]);

  const addLog = (message) => {
    setLog((prev) => [...prev.slice(-4), message]);
  };

  const handleParentClick = () => {
    setParentClicks((prev) => prev + 1);
    addLog('Parent clicked!');
  };

  const handleChildClick = () => {
    setChildClicks((prev) => prev + 1);
    addLog('Child clicked!');
  };

  const handleStoppedClick = (e) => {
    e.stopPropagation(); // Prevent bubbling to parent
    setStoppedClicks((prev) => prev + 1);
    addLog('Child clicked (propagation stopped)');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    addLog('Form submitted (default prevented)');
  };

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      <div className="grid grid-cols-2 min-h-[400px]">
        {/* Left: Bubbling Demo */}
        <div className="p-6 border-r border-base-300">
          <div className="text-xs text-base-content/50 mb-4 uppercase">
            Event Bubbling (Default Behavior)
          </div>

          {/* Parent with child */}
          <div
            onClick={handleParentClick}
            className="p-8 bg-primary/10 rounded-lg border-2 border-primary cursor-pointer"
          >
            <div className="text-primary text-xs mb-2 font-semibold">PARENT (click me)</div>
            <div className="text-sm text-base-content/70 mb-4">
              Clicks: <span className="text-primary">{parentClicks}</span>
            </div>

            <div
              onClick={handleChildClick}
              className="p-6 bg-success/10 rounded-lg border-2 border-success cursor-pointer"
            >
              <div className="text-success text-xs mb-2 font-semibold">CHILD (click me)</div>
              <div className="text-sm text-base-content/70">
                Clicks: <span className="text-success">{childClicks}</span>
              </div>
            </div>
          </div>

          {/* Stop propagation example */}
          <div className="mt-6">
            <div className="text-xs text-base-content/50 mb-3 uppercase">
              With stopPropagation()
            </div>
            <div
              onClick={handleParentClick}
              className="p-8 bg-primary/10 rounded-lg border-2 border-primary cursor-pointer"
            >
              <div className="text-primary text-xs mb-2 font-semibold">PARENT</div>
              <div
                onClick={handleStoppedClick}
                className="p-6 bg-warning/10 rounded-lg border-2 border-warning cursor-pointer"
              >
                <div className="text-warning text-xs mb-2 font-semibold">
                  CHILD (stops propagation)
                </div>
                <div className="text-sm text-base-content/70">
                  Clicks: <span className="text-warning">{stoppedClicks}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              setParentClicks(0);
              setChildClicks(0);
              setStoppedClicks(0);
              setLog([]);
            }}
            className="btn btn-ghost btn-sm mt-4"
          >
            Reset Counts
          </button>
        </div>

        {/* Right: Code & preventDefault */}
        <div className="p-6 bg-base-300">
          <div className="text-xs text-base-content/50 mb-4 uppercase">Code Examples</div>

          {/* stopPropagation */}
          <div className="mb-6">
            <div className="text-warning text-sm mb-2 font-semibold">stopPropagation()</div>
            <pre className="m-0 p-3 bg-base-200 rounded-lg text-xs leading-relaxed">
              <code className="text-base-content/70">
                {'function Child({ onClick }) {\n' +
                  '  const handleClick = (e) => {\n' +
                  '    e.stopPropagation(); // ← Stops event from bubbling\n' +
                  '    onClick();\n' +
                  '  };\n' +
                  '  return <div onClick={handleClick}>Child</div>;\n' +
                  '}'}
              </code>
            </pre>
          </div>

          {/* preventDefault */}
          <div className="mb-6">
            <div className="text-success text-sm mb-2 font-semibold">preventDefault()</div>
            <pre className="m-0 p-3 bg-base-200 rounded-lg text-xs leading-relaxed">
              <code className="text-base-content/70">
                {'function Form() {\n' +
                  '  const handleSubmit = (e) => {\n' +
                  '    e.preventDefault(); // ← Prevents page refresh\n' +
                  '    // Handle form submission\n' +
                  '  };\n' +
                  '  return <form onSubmit={handleSubmit}>...</form>;\n' +
                  '}'}
              </code>
            </pre>
          </div>

          {/* Live preventDefault demo */}
          <div>
            <div className="text-base-content/50 text-xs mb-2">TRY IT:</div>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Type and press Enter"
                className="input input-bordered w-full input-sm mb-2"
              />
              <button type="submit" className="btn btn-success w-full btn-sm">
                Submit (won't refresh!)
              </button>
            </form>
          </div>

          {/* Event log */}
          {log.length > 0 && (
            <div className="mt-6">
              <div className="text-base-content/50 text-xs mb-2">EVENT LOG:</div>
              <div className="p-3 bg-base-200 rounded-lg text-xs text-base-content/70 max-h-[100px] overflow-auto">
                {log.map((msg, i) => (
                  <div key={i} className="mb-1">
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key insight */}
      <div className="px-6 py-4 bg-primary/10 border-t border-primary flex items-center gap-3">
        <HiOutlineLightBulb className="text-primary" size={20} />
        <span className="text-base-content/70 text-sm">
          <strong className="text-base-content">Remember:</strong> Events bubble up (child →
          parent). Use <code className="text-warning">stopPropagation()</code> to stop bubbling, and{' '}
          <code className="text-success">preventDefault()</code> to stop default browser behavior.
        </span>
      </div>
    </div>
  );
}
