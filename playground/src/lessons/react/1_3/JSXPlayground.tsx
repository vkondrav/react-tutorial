// ============================================
// JSXPlayground - Interactive JSX Experiment
// ============================================

import { useState } from 'react';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';

export default function JSXPlayground(): React.ReactElement {
  const [firstName, setFirstName] = useState<string>('Sarah');
  const [lastName, setLastName] = useState<string>('Chen');
  const [score, setScore] = useState<number>(85);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
  const gradeColorClasses =
    score >= 90
      ? 'bg-success/20 text-success'
      : score >= 80
        ? 'bg-primary/20 text-primary'
        : score >= 70
          ? 'bg-warning/20 text-warning'
          : 'bg-error/20 text-error';

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Input Controls */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-base-content/70 text-xs">firstName</label>
          <input
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            className="input input-bordered w-full input-sm"
          />
        </div>
        <div>
          <label className="block mb-1 text-base-content/70 text-xs">lastName</label>
          <input
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            className="input input-bordered w-full input-sm"
          />
        </div>
        <div>
          <label className="block mb-1 text-base-content/70 text-xs">score: {score}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={score}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setScore(parseInt(e.target.value))
            }
            className="range range-primary w-full"
          />
        </div>
        <label className="flex items-center gap-2 text-base-content/70 text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={isOnline}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsOnline(e.target.checked)}
            className="checkbox checkbox-primary checkbox-sm"
          />
          isOnline
        </label>
      </div>

      {/* Live Output */}
      <div className="card bg-base-200 p-5 border border-base-300">
        <div className="text-base-content/50 text-xs mb-4">Live Output:</div>
        <div className="p-4 bg-base-300 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-success' : 'bg-base-content/30'}`}
            />
            <span className="font-semibold text-base-content">
              {firstName} {lastName}
            </span>
          </div>
          <div className="text-sm text-base-content/70">
            Score: {score}/100
            <span className={`ml-2 badge ${gradeColorClasses}`}>{grade}</span>
          </div>
          <div className="mt-3 text-xs text-base-content/50 flex items-center gap-2">
            {isOnline ? (
              <>
                <HiOutlineCheckCircle size={14} className="text-success" />
                <span>Currently online</span>
              </>
            ) : (
              <>
                <HiOutlineXCircle size={14} />
                <span>Offline</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
