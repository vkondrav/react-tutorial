import { useState } from 'react';

export default function JSXRulesDemo() {
  const [activeRule, setActiveRule] = useState(1);

  const rules = [
    {
      id: 1,
      title: 'Single Root Element',
      icon: '1️⃣',
      bad: `// ❌ Error!\nreturn (\n  <h1>Title</h1>\n  <p>Text</p>\n)`,
      good: `// ✅ Wrap in a parent\nreturn (\n  <div>\n    <h1>Title</h1>\n    <p>Text</p>\n  </div>\n)\n\n// ✅ Or use Fragment\nreturn (\n  <>\n    <h1>Title</h1>\n    <p>Text</p>\n  </>\n)`,
    },
    {
      id: 2,
      title: 'Close All Tags',
      icon: '2️⃣',
      bad: `// ❌ Error!\n<img src="photo.jpg">\n<br>\n<input type="text">`,
      good: `// ✅ Self-close!\n<img src="photo.jpg" />\n<br />\n<input type="text" />`,
    },
    {
      id: 3,
      title: 'camelCase Attributes',
      icon: '3️⃣',
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
            className={`flex-1 px-3 py-3 rounded-lg border border-slate-700 cursor-pointer text-sm transition-colors ${
              activeRule === rule.id
                ? 'bg-blue-500 text-white border-blue-500 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 font-normal'
            }`}
          >
            {rule.icon} {rule.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-red-500/30">
          <div className="px-4 py-2 bg-red-500/20 border-b border-red-500/30 text-xs font-semibold text-red-500">
            ✗ Wrong
          </div>
          <pre className="m-0 p-4 text-sm leading-relaxed text-slate-400 overflow-auto">
            {currentRule.bad}
          </pre>
        </div>
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-green-500/30">
          <div className="px-4 py-2 bg-green-500/20 border-b border-green-500/30 text-xs font-semibold text-green-500">
            ✓ Correct
          </div>
          <pre className="m-0 p-4 text-sm leading-relaxed text-slate-400 overflow-auto">
            {currentRule.good}
          </pre>
        </div>
      </div>
    </div>
  );
}
