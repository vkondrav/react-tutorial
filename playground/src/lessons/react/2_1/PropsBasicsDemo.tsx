// ============================================
// PropsBasicsDemo - Introduction to Props
// ============================================

import { useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '@components';

// ============================================
// Main Component
// ============================================

export default function PropsBasicsDemo(): React.ReactElement {
  const [userName, setUserName] = useState<string>('Alice');
  const [userAge, setUserAge] = useState<number>(28);

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Controls */}
      <div className="p-6 grid grid-cols-2 gap-4 border-b border-base-300">
        <div>
          <label className="block text-xs text-base-content/50 mb-2 uppercase">name prop</label>
          <input
            type="text"
            value={userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
            className="input input-bordered w-full input-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-base-content/50 mb-2 uppercase">age prop</label>
          <input
            type="number"
            value={userAge}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserAge(Number(e.target.value))
            }
            className="input input-bordered w-full input-sm"
          />
        </div>
      </div>

      {/* Code Display */}
      <div className="p-6 border-b border-base-300">
        <CodeSnippet
          code={`function App() {
  return (
    <UserCard name="${userName}" age={${userAge}} />
  );
}`}
          language="tsx"
          title="Parent Component (passing props)"
          showCopy={false}
        />

        <div className="mt-4">
          <CodeSnippet
            code={`function UserCard(props) {
  return (
    <div>
      <h2>Hello, {props.name}!</h2>
      <p>Age: {props.age}</p>
    </div>
  );
}`}
            language="tsx"
            title="Child Component (receiving props)"
            showCopy={false}
          />
        </div>
      </div>

      {/* Live Preview */}
      <div className="p-6 bg-base-300">
        <div className="text-xs text-base-content/50 mb-3 uppercase">Live Result</div>
        <div className="p-6 bg-base-200 rounded-lg border border-dashed border-base-300">
          {/* This is UserCard with props */}
          <h2 className="m-0 mb-2 text-base-content text-xl">Hello, {userName || 'friend'}!</h2>
          <p className="m-0 text-base-content/70">Age: {userAge}</p>
        </div>
      </div>

      {/* Visual explanation */}
      <div className="px-6 py-4 bg-primary/10 border-t border-primary flex items-center gap-3">
        <HiOutlineLightBulb className="text-primary" size={20} />
        <span className="text-base-content/70 text-sm">
          Props flow <strong className="text-primary">one way</strong> - from parent to child. The
          child can read props but cannot modify them!
        </span>
      </div>
    </div>
  );
}
