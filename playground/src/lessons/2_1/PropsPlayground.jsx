import { useState } from 'react';

export default function PropsPlayground() {
  const [name, setName] = useState('React Developer');
  const [role, setRole] = useState('Frontend Engineer');
  const [level, setLevel] = useState('Senior');
  const [isOnline, setIsOnline] = useState(true);
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');

  const levelColors = {
    Junior: '#22c55e',
    Mid: '#3b82f6',
    Senior: '#8b5cf6',
    Lead: '#f59e0b',
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      <div className="grid grid-cols-2 min-h-[400px]">
        {/* Props Editor */}
        <div className="p-6 border-r border-slate-700">
          <div className="text-xs text-slate-500 mb-4 uppercase">Edit Props</div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-slate-400 text-sm mb-1">
              <span className="text-blue-500">name</span>: string
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-50 text-sm"
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-slate-400 text-sm mb-1">
              <span className="text-blue-500">role</span>: string
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-50 text-sm"
            />
          </div>

          {/* Level */}
          <div className="mb-4">
            <label className="block text-slate-400 text-sm mb-1">
              <span className="text-blue-500">level</span>: "Junior" | "Mid" | "Senior" | "Lead"
            </label>
            <div className="flex gap-2">
              {Object.keys(levelColors).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className="flex-1 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-colors"
                  style={{
                    backgroundColor: level === l ? levelColors[l] : '#0f172a',
                    border: `1px solid ${level === l ? levelColors[l] : '#334155'}`,
                    color: level === l ? 'white' : '#64748b',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* isOnline */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={isOnline}
                onChange={(e) => setIsOnline(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-blue-500">isOnline</span>: boolean = {isOnline.toString()}
            </label>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-slate-400 text-sm mb-1">
              <span className="text-blue-500">skills</span>: string[]
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-slate-900 rounded-full text-xs text-slate-400"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="bg-transparent border-none text-red-500 cursor-pointer px-0.5 text-sm"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Add skill..."
                className="flex-1 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-md text-slate-50 text-xs"
              />
              <button
                onClick={addSkill}
                className="px-3 py-1.5 bg-green-500 border-none rounded-md text-white cursor-pointer text-xs"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="p-6 bg-slate-900">
          <div className="text-xs text-slate-500 mb-4 uppercase">
            Live Preview: {'<ProfileCard {...props} />'}
          </div>

          {/* Rendered Card */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
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
                  <h3 className="m-0 text-slate-50 text-lg">{name || 'Name'}</h3>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: isOnline ? '#22c55e' : '#64748b' }}
                  />
                </div>
                <p className="mt-1 mb-0 text-slate-500 text-sm">{role || 'Role'}</p>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
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
                <span
                  key={skill}
                  className="px-3 py-1 bg-slate-900 rounded-md text-xs text-slate-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Props Object */}
          <div className="mt-4">
            <div className="text-[0.7rem] text-slate-500 mb-2">PROPS OBJECT</div>
            <pre className="m-0 p-3 bg-slate-800 rounded-md text-[0.7rem] leading-relaxed overflow-auto">
              <code className="text-slate-400">
                {JSON.stringify({ name, role, level, isOnline, skills }, null, 2)}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
