// ============================================
// MultipleStateDemo - Using Multiple useState Calls
// ============================================

import { useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import signupFormExample from './examples/SignupFormExample.tsx?raw';

// ============================================
// Main Component
// ============================================

export default function MultipleStateDemo(): React.ReactElement {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  // Generate dynamic state display
  const stateDisplay = `{
  name: "${name}",
  email: "${email}",
  subscribed: ${subscribed}
}`;

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      <div className="grid grid-cols-2 min-h-[350px]">
        {/* Code */}
        <div className="p-6 border-r border-base-300">
          <div className="text-xs text-base-content/50 mb-4 uppercase">
            Each useState = One Piece of State
          </div>
          <CodeSnippet code={signupFormExample} language="tsx" showCopy={false} />
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="Enter your name"
                className="input input-bordered w-full input-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-base-content/70 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered w-full input-sm"
              />
            </div>
            <label className="flex items-center gap-2 text-base-content/70 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={subscribed}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSubscribed(e.target.checked)
                }
                className="checkbox checkbox-sm"
              />
              Subscribe to newsletter
            </label>
          </div>

          {/* Current State */}
          <div className="mt-6">
            <div className="text-[0.7rem] text-base-content/50 mb-2">CURRENT STATE VALUES</div>
            <CodeSnippet code={stateDisplay} language="json" showCopy={false} />
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
