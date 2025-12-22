import { useState } from 'react';

export default function PropsBasicsDemo() {
  const [userName, setUserName] = useState('Alice');
  const [userAge, setUserAge] = useState(28);

  return (
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      {/* Controls */}
      <div className="p-6 grid grid-cols-2 gap-4 border-b border-slate-700">
        <div>
          <label className="block text-xs text-slate-500 mb-2 uppercase">name prop</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-slate-50 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-2 uppercase">age prop</label>
          <input
            type="number"
            value={userAge}
            onChange={(e) => setUserAge(Number(e.target.value))}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-slate-50 text-sm"
          />
        </div>
      </div>

      {/* Code Display */}
      <div className="p-6 border-b border-slate-700">
        <div className="text-xs text-slate-500 mb-3 uppercase">
          Parent Component (passing props)
        </div>
        <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-sm leading-relaxed">
          <code className="text-slate-200">
            {`function App() {
  return (
    <UserCard `}
            <span className="text-blue-500">name</span>
            {`="`}
            <span className="text-green-500">{userName}</span>
            {`" `}
            <span className="text-blue-500">age</span>
            {`={`}
            <span className="text-amber-500">{userAge}</span>
            {`} />
  );
}`}
          </code>
        </pre>

        <div className="text-xs text-slate-500 mb-3 mt-6 uppercase">
          Child Component (receiving props)
        </div>
        <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-sm leading-relaxed">
          <code className="text-slate-200">
            {`function UserCard(`}
            <span className="text-pink-500">props</span>
            {`) {
  return (
    <div>
      <h2>Hello, {`}
            <span className="text-pink-500">props</span>
            {`.`}
            <span className="text-blue-500">name</span>
            {`}!</h2>
      <p>Age: {`}
            <span className="text-pink-500">props</span>
            {`.`}
            <span className="text-blue-500">age</span>
            {`}</p>
    </div>
  );
}`}
          </code>
        </pre>
      </div>

      {/* Live Preview */}
      <div className="p-6 bg-slate-900">
        <div className="text-xs text-slate-500 mb-3 uppercase">Live Result</div>
        <div className="p-6 bg-slate-800 rounded-lg border border-dashed border-slate-700">
          {/* This is UserCard with props */}
          <h2 className="m-0 mb-2 text-slate-50 text-xl">Hello, {userName || 'friend'}!</h2>
          <p className="m-0 text-slate-400">Age: {userAge}</p>
        </div>
      </div>

      {/* Visual explanation */}
      <div className="px-6 py-4 bg-blue-500/10 border-t border-blue-500 flex items-center gap-3">
        <span className="text-xl">💡</span>
        <span className="text-slate-400 text-sm">
          Props flow <strong className="text-blue-500">one way</strong> - from parent to child. The
          child can read props but cannot modify them!
        </span>
      </div>
    </div>
  );
}
