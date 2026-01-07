// ============================================
// PropsPlayground - Interactive Props Editor
// ============================================

import { useState } from 'react';
import { HiX, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';
import { CodeSnippet } from '../../components';

// ============================================
// Types
// ============================================

type Level = 'Junior' | 'Mid' | 'Senior' | 'Lead';

// ============================================
// Constants
// ============================================

const levelColors: Record<Level, string> = {
  Junior: '#22c55e',
  Mid: '#3b82f6',
  Senior: '#8b5cf6',
  Lead: '#f59e0b',
};

const levelButtonClasses: Record<Level, string> = {
  Junior: 'btn-success',
  Mid: 'btn-primary',
  Senior: 'btn-secondary',
  Lead: 'btn-warning',
};

// ============================================
// Main Component
// ============================================

export default function PropsPlayground(): React.ReactElement {
  const [name, setName] = useState<string>('React Developer');
  const [role, setRole] = useState<string>('Frontend Engineer');
  const [level, setLevel] = useState<Level>('Senior');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js']);
  const [newSkill, setNewSkill] = useState<string>('');

  const addSkill = (): void => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string): void => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const propsObject = JSON.stringify({ name, role, level, isOnline, skills }, null, 2);

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      <div className="grid grid-cols-2 min-h-[400px]">
        {/* Props Editor */}
        <div className="p-6 border-r border-base-300">
          <div className="text-xs text-base-content/50 mb-4 uppercase">Edit Props</div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-base-content/70 text-sm mb-1">
              <span className="text-primary">name</span>: string
            </label>
            <input
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="input input-bordered w-full input-sm"
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-base-content/70 text-sm mb-1">
              <span className="text-primary">role</span>: string
            </label>
            <input
              type="text"
              value={role}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
              className="input input-bordered w-full input-sm"
            />
          </div>

          {/* Level */}
          <div className="mb-4">
            <label className="block text-base-content/70 text-sm mb-1">
              <span className="text-primary">level</span>: "Junior" | "Mid" | "Senior" | "Lead"
            </label>
            <div className="flex gap-2">
              {(Object.keys(levelColors) as Level[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`btn btn-sm flex-1 ${level === l ? levelButtonClasses[l] : 'btn-outline'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* isOnline */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-base-content/70 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={isOnline}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsOnline(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <span className="text-primary">isOnline</span>: boolean = {isOnline.toString()}
            </label>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-base-content/70 text-sm mb-1">
              <span className="text-primary">skills</span>: string[]
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill) => (
                <span key={skill} className="badge badge-outline gap-1">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="btn btn-ghost btn-xs p-0 h-auto min-h-0 text-error hover:bg-error/20"
                  >
                    <HiX size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSkill(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === 'Enter' && addSkill()
                }
                placeholder="Add skill..."
                className="input input-bordered input-sm flex-1"
              />
              <button onClick={addSkill} className="btn btn-success btn-sm">
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="p-6 bg-base-300">
          <div className="text-xs text-base-content/50 mb-4 uppercase">
            Live Preview: {'<ProfileCard {...props} />'}
          </div>

          {/* Rendered Card */}
          <div className="card bg-base-200 p-6 border border-base-300">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-white font-bold"
                style={{ backgroundColor: levelColors[level] }}
              >
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="m-0 text-base-content text-lg">{name || 'Name'}</h3>
                  {isOnline ? (
                    <HiOutlineCheckCircle className="text-success" size={16} />
                  ) : (
                    <HiOutlineXCircle className="text-base-content/30" size={16} />
                  )}
                </div>
                <p className="mt-1 mb-0 text-base-content/50 text-sm">{role || 'Role'}</p>
              </div>
              <span
                className="badge"
                style={{
                  backgroundColor: `${levelColors[level]}22`,
                  color: levelColors[level],
                }}
              >
                {level}
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="badge badge-outline">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Props Object */}
          <div className="mt-4">
            <div className="text-[0.7rem] text-base-content/50 mb-2">PROPS OBJECT</div>
            <CodeSnippet code={propsObject} language="json" showCopy={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
