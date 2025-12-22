import { useState } from 'react';
import { HiX, HiCheck } from 'react-icons/hi';

export default function JSXRulesDemo() {
  const [activeRule, setActiveRule] = useState(1);

  const rules = [
    {
      id: 1,
      title: 'Single Root Element',
      number: '1',
      bad: `// ❌ Error!\nreturn (\n  <h1>Title</h1>\n  <p>Text</p>\n)`,
      good: `// ✅ Wrap in a parent\nreturn (\n  <div>\n    <h1>Title</h1>\n    <p>Text</p>\n  </div>\n)\n\n// ✅ Or use Fragment\nreturn (\n  <>\n    <h1>Title</h1>\n    <p>Text</p>\n  </>\n)`,
    },
    {
      id: 2,
      title: 'Close All Tags',
      number: '2',
      bad: `// ❌ Error!\n<img src="photo.jpg">\n<br>\n<input type="text">`,
      good: `// ✅ Self-close!\n<img src="photo.jpg" />\n<br />\n<input type="text" />`,
    },
    {
      id: 3,
      title: 'camelCase Attributes',
      number: '3',
      bad: `// ❌ Won't work\n<div class="box">\n<label for="name">\n<button onclick={fn}>\n<div tabindex="1">`,
      good: `// ✅ Use camelCase\n<div className="box">\n<label htmlFor="name">\n<button onClick={fn}>\n<div tabIndex="1">`,
    },
  ];

  const currentRule = rules.find((r) => r.id === activeRule);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {rules.map((rule) => (
          <button
            key={rule.id}
            onClick={() => setActiveRule(rule.id)}
            className={`btn flex-1 ${activeRule === rule.id ? 'btn-primary' : 'btn-outline'}`}
          >
            <span className="badge badge-sm mr-2">{rule.number}</span>
            {rule.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-base-200 overflow-hidden border-2 border-error/30">
          <div className="px-4 py-2 bg-error/20 border-b border-error/30 text-xs font-semibold text-error flex items-center gap-2">
            <HiX size={14} />
            Wrong
          </div>
          <pre className="m-0 p-4 text-sm leading-relaxed text-base-content/70 overflow-auto">
            {currentRule.bad}
          </pre>
        </div>
        <div className="card bg-base-200 overflow-hidden border-2 border-success/30">
          <div className="px-4 py-2 bg-success/20 border-b border-success/30 text-xs font-semibold text-success flex items-center gap-2">
            <HiCheck size={14} />
            Correct
          </div>
          <pre className="m-0 p-4 text-sm leading-relaxed text-base-content/70 overflow-auto">
            {currentRule.good}
          </pre>
        </div>
      </div>
    </div>
  );
}
