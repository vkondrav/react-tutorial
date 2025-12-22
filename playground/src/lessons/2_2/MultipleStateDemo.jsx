import { useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';

export default function MultipleStateDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      <div className="grid grid-cols-2 min-h-[350px]">
        {/* Code */}
        <div className="p-6 border-r border-base-300">
          <div className="text-xs text-base-content/50 mb-4 uppercase">
            Each useState = One Piece of State
          </div>
          <pre className="m-0 p-4 bg-base-300 rounded-lg overflow-auto text-xs leading-relaxed">
            <code className="text-base-content">
              <span className="text-secondary">function</span>
              {` SignupForm() {\n  `}
              <span className="text-base-content/50">// Three separate state values</span>
              {`\n  `}
              <span className="text-secondary">const</span>
              {` [name, setName] = useState(`}
              <span className="text-warning">''</span>
              {`);\n  `}
              <span className="text-secondary">const</span>
              {` [email, setEmail] = useState(`}
              <span className="text-warning">''</span>
              {`);\n  `}
              <span className="text-secondary">const</span>
              {` [subscribed, setSubscribed] = useState(`}
              <span className="text-warning">false</span>
              {`);\n\n  `}
              <span className="text-secondary">return</span>
              {` (\n    <form>\n      <input\n        value={name}\n        onChange={e => setName(e.target.value)}\n      />\n      <input\n        value={email}\n        onChange={e => setEmail(e.target.value)}\n      />\n      <input\n        type="checkbox"\n        checked={subscribed}\n        onChange={e => setSubscribed(e.target.checked)}\n      />\n    </form>\n  );\n}`}
            </code>
          </pre>
        </div>

        {/* Live Form */}
        <div className="p-6 bg-base-300">
          <div className="text-xs text-base-content/50 mb-4 uppercase">Live Demo - Try Typing!</div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-base-content/70 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="input input-bordered w-full input-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-base-content/70 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered w-full input-sm"
              />
            </div>
            <label className="flex items-center gap-2 text-base-content/70 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={subscribed}
                onChange={(e) => setSubscribed(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              Subscribe to newsletter
            </label>
          </div>

          {/* Current State */}
          <div className="mt-6 p-4 bg-base-200 rounded-lg">
            <div className="text-[0.7rem] text-base-content/50 mb-2">CURRENT STATE VALUES</div>
            <pre className="m-0 text-xs text-base-content/70 leading-relaxed">
              {`name: `}
              <span className="text-success">"{name}"</span>
              {`\nemail: `}
              <span className="text-success">"{email}"</span>
              {`\nsubscribed: `}
              <span className="text-warning">{subscribed.toString()}</span>
            </pre>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="px-6 py-4 bg-secondary/10 border-t border-secondary flex items-center gap-3">
        <HiOutlineLightBulb className="text-secondary" size={20} />
        <span className="text-base-content/70 text-sm">
          <strong className="text-secondary">Pro tip:</strong> Keep related state together. For
          complex forms, consider grouping into an object (we'll cover this in advanced patterns).
        </span>
      </div>
    </div>
  );
}
