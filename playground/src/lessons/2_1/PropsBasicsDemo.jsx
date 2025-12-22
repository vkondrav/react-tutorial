import { useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';

export default function PropsBasicsDemo() {
  const [userName, setUserName] = useState('Alice');
  const [userAge, setUserAge] = useState(28);

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Controls */}
      <div className="p-6 grid grid-cols-2 gap-4 border-b border-base-300">
        <div>
          <label className="block text-xs text-base-content/50 mb-2 uppercase">name prop</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input input-bordered w-full input-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-base-content/50 mb-2 uppercase">age prop</label>
          <input
            type="number"
            value={userAge}
            onChange={(e) => setUserAge(Number(e.target.value))}
            className="input input-bordered w-full input-sm"
          />
        </div>
      </div>

      {/* Code Display */}
      <div className="p-6 border-b border-base-300">
        <div className="text-xs text-base-content/50 mb-3 uppercase">
          Parent Component (passing props)
        </div>
        <pre className="m-0 p-4 bg-base-300 rounded-lg overflow-auto text-sm leading-relaxed">
          <code className="text-base-content">
            {`function App() {
  return (
    <UserCard `}
            <span className="text-primary">name</span>
            {`="`}
            <span className="text-success">{userName}</span>
            {`" `}
            <span className="text-primary">age</span>
            {`={`}
            <span className="text-warning">{userAge}</span>
            {`} />
  );
}`}
          </code>
        </pre>

        <div className="text-xs text-base-content/50 mb-3 mt-6 uppercase">
          Child Component (receiving props)
        </div>
        <pre className="m-0 p-4 bg-base-300 rounded-lg overflow-auto text-sm leading-relaxed">
          <code className="text-base-content">
            {`function UserCard(`}
            <span className="text-accent">props</span>
            {`) {
  return (
    <div>
      <h2>Hello, {`}
            <span className="text-accent">props</span>
            {`.`}
            <span className="text-primary">name</span>
            {`}!</h2>
      <p>Age: {`}
            <span className="text-accent">props</span>
            {`.`}
            <span className="text-primary">age</span>
            {`}</p>
    </div>
  );
}`}
          </code>
        </pre>
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
