import { useState } from 'react';

export default function MultipleStateDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      <div className="grid grid-cols-2 min-h-[350px]">
        {/* Code */}
        <div className="p-6 border-r border-slate-700">
          <div className="text-xs text-slate-500 mb-4 uppercase">
            Each useState = One Piece of State
          </div>
          <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-xs leading-relaxed">
            <code className="text-slate-200">
              <span className="text-purple-400">function</span>
              {` SignupForm() {\n  `}
              <span className="text-slate-500">// Three separate state values</span>
              {`\n  `}
              <span className="text-purple-400">const</span>
              {` [name, setName] = useState(`}
              <span className="text-yellow-400">''</span>
              {`);\n  `}
              <span className="text-purple-400">const</span>
              {` [email, setEmail] = useState(`}
              <span className="text-yellow-400">''</span>
              {`);\n  `}
              <span className="text-purple-400">const</span>
              {` [subscribed, setSubscribed] = useState(`}
              <span className="text-amber-500">false</span>
              {`);\n\n  `}
              <span className="text-purple-400">return</span>
              {` (\n    <form>\n      <input\n        value={name}\n        onChange={e => setName(e.target.value)}\n      />\n      <input\n        value={email}\n        onChange={e => setEmail(e.target.value)}\n      />\n      <input\n        type="checkbox"\n        checked={subscribed}\n        onChange={e => setSubscribed(e.target.checked)}\n      />\n    </form>\n  );\n}`}
            </code>
          </pre>
        </div>

        {/* Live Form */}
        <div className="p-6 bg-slate-900">
          <div className="text-xs text-slate-500 mb-4 uppercase">Live Demo - Try Typing!</div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-slate-50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-slate-50 text-sm"
              />
            </div>
            <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={subscribed}
                onChange={(e) => setSubscribed(e.target.checked)}
                className="w-4 h-4"
              />
              Subscribe to newsletter
            </label>
          </div>

          {/* Current State */}
          <div className="mt-6 p-4 bg-slate-800 rounded-lg">
            <div className="text-[0.7rem] text-slate-500 mb-2">CURRENT STATE VALUES</div>
            <pre className="m-0 text-xs text-slate-400 leading-relaxed">
              {`name: `}
              <span className="text-green-500">"{name}"</span>
              {`\nemail: `}
              <span className="text-green-500">"{email}"</span>
              {`\nsubscribed: `}
              <span className="text-amber-500">{subscribed.toString()}</span>
            </pre>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="px-6 py-4 bg-purple-500/10 border-t border-purple-500 flex items-center gap-3">
        <span className="text-xl">💡</span>
        <span className="text-slate-400 text-sm">
          <strong className="text-purple-500">Pro tip:</strong> Keep related state together. For
          complex forms, consider grouping into an object (we'll cover this in advanced patterns).
        </span>
      </div>
    </div>
  );
}
