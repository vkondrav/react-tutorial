import { useState } from 'react';
import { HiOutlineEye, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import documentFlowCode from './examples/DocumentFlow.css?raw';

type FlowMode = 'in-flow' | 'absolute' | 'fixed';

export default function DocumentFlowDemo(): React.ReactElement {
  const [mode, setMode] = useState<FlowMode>('in-flow');

  const modes: Array<{ id: FlowMode; label: string; description: string }> = [
    {
      id: 'in-flow',
      label: 'In Flow (static)',
      description:
        'Element participates in normal document flow. Other elements respect its space.',
    },
    {
      id: 'absolute',
      label: 'Out of Flow (absolute)',
      description: "Element is removed from flow. Other elements collapse as if it doesn't exist.",
    },
    {
      id: 'fixed',
      label: 'Out of Flow (fixed)',
      description: 'Element is removed from flow and positioned relative to the viewport.',
    },
  ];

  const currentMode = modes.find((m) => m.id === mode)!;

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`btn btn-sm ${
              mode === m.id ? (m.id === 'in-flow' ? 'btn-success' : 'btn-warning') : 'btn-ghost'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className={`alert ${mode === 'in-flow' ? 'alert-success' : 'alert-warning'}`}>
        <HiOutlineQuestionMarkCircle className="shrink-0" size={20} />
        <span>{currentMode.description}</span>
      </div>

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineEye className="text-primary" size={20} />
          <h4 className="font-semibold">Visual Demo</h4>
        </div>

        <div className="relative bg-base-300 rounded-lg p-4 min-h-[300px] overflow-hidden">
          {/* Container label */}
          <span className="absolute top-2 left-2 text-xs text-base-content/50 font-mono">
            container (position: relative)
          </span>

          {/* First static element */}
          <div className="bg-primary/30 border-2 border-primary border-dashed rounded p-4 mb-4 mt-6">
            <span className="font-mono text-sm">Box 1</span>
            <span className="text-xs block text-base-content/60">position: static (default)</span>
          </div>

          {/* Target element - the one that changes */}
          <div
            className={`rounded p-4 transition-all duration-300 ${
              mode === 'in-flow'
                ? 'bg-success border-2 border-success mb-4 relative'
                : mode === 'absolute'
                  ? 'bg-warning border-2 border-warning absolute top-16 right-4'
                  : 'bg-error border-2 border-error fixed top-20 right-4 z-50'
            }`}
            style={mode === 'fixed' ? { position: 'fixed' } : undefined}
          >
            <span className="font-mono text-sm font-bold">Target Box</span>
            <span className="text-xs block">position: {mode === 'in-flow' ? 'static' : mode}</span>
            {mode === 'absolute' && <span className="text-xs block">top: 16px, right: 4px</span>}
            {mode === 'fixed' && <span className="text-xs block">top: 20px, right: 4px</span>}
          </div>

          {/* Third static element */}
          <div className="bg-secondary/30 border-2 border-secondary border-dashed rounded p-4 mb-4">
            <span className="font-mono text-sm">Box 3</span>
            <span className="text-xs block text-base-content/60">position: static (default)</span>
            {mode !== 'in-flow' && (
              <span className="text-xs block text-warning mt-1">
                ↑ Notice: This box moved up because Target is out of flow!
              </span>
            )}
          </div>

          {/* Fourth static element */}
          <div className="bg-accent/30 border-2 border-accent border-dashed rounded p-4">
            <span className="font-mono text-sm">Box 4</span>
            <span className="text-xs block text-base-content/60">position: static (default)</span>
          </div>
        </div>
      </div>

      {/* Flow Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border-2 border-success bg-success/10">
          <h5 className="font-semibold text-success mb-2">In Flow</h5>
          <ul className="text-sm space-y-1 text-base-content/70">
            <li>• Elements stack in order</li>
            <li>• Each element takes up space</li>
            <li>• Other elements respect its position</li>
            <li>
              • <code>position: static</code> (default)
            </li>
            <li>
              • <code>position: relative</code>
            </li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border-2 border-warning bg-warning/10">
          <h5 className="font-semibold text-warning mb-2">Out of Flow</h5>
          <ul className="text-sm space-y-1 text-base-content/70">
            <li>• Element is "lifted" from document</li>
            <li>• Takes no space in layout</li>
            <li>• Other elements collapse around it</li>
            <li>
              • <code>position: absolute</code>
            </li>
            <li>
              • <code>position: fixed</code>
            </li>
          </ul>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="Document Flow Example" language="css" code={documentFlowCode} />
    </div>
  );
}
