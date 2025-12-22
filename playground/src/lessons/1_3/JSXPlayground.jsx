import { useState } from 'react';

export default function JSXPlayground() {
  const [firstName, setFirstName] = useState('Sarah');
  const [lastName, setLastName] = useState('Chen');
  const [score, setScore] = useState(85);
  const [isOnline, setIsOnline] = useState(true);

  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
  const gradeColorClasses =
    score >= 90
      ? 'bg-emerald-500/20 text-emerald-500'
      : score >= 80
        ? 'bg-blue-500/20 text-blue-500'
        : score >= 70
          ? 'bg-amber-500/20 text-amber-500'
          : 'bg-red-500/20 text-red-500';

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-slate-400 text-xs">firstName</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-50 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
        <div>
          <label className="block mb-1 text-slate-400 text-xs">lastName</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-50 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
        <div>
          <label className="block mb-1 text-slate-400 text-xs">score: {score}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={score}
            onChange={(e) => setScore(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <label className="flex items-center gap-2 text-slate-400 text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={isOnline}
            onChange={(e) => setIsOnline(e.target.checked)}
          />
          isOnline
        </label>
      </div>

      <div className="bg-slate-900 p-5 rounded-xl border border-slate-700">
        <div className="text-slate-500 text-xs mb-4">Live Output:</div>
        <div className="p-4 bg-slate-800 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-slate-500'}`}
            />
            <span className="font-semibold text-slate-50">
              {firstName} {lastName}
            </span>
          </div>
          <div className="text-sm text-slate-400">
            Score: {score}/100
            <span className={`ml-2 px-2 py-0.5 rounded font-semibold ${gradeColorClasses}`}>
              {grade}
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            {isOnline ? '🟢 Currently online' : '⚫ Offline'}
          </div>
        </div>
      </div>
    </div>
  );
}
