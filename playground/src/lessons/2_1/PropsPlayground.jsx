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
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '400px' }}>
        {/* Props Editor */}
        <div style={{ padding: '1.5rem', borderRight: '1px solid #334155' }}>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Edit Props
          </div>

          {/* Name */}
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                color: '#94a3b8',
                fontSize: '0.8rem',
                marginBottom: '0.25rem',
              }}
            >
              <span style={{ color: '#3b82f6' }}>name</span>: string
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '0.375rem',
                color: '#f8fafc',
                fontSize: '0.875rem',
              }}
            />
          </div>

          {/* Role */}
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                color: '#94a3b8',
                fontSize: '0.8rem',
                marginBottom: '0.25rem',
              }}
            >
              <span style={{ color: '#3b82f6' }}>role</span>: string
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '0.375rem',
                color: '#f8fafc',
                fontSize: '0.875rem',
              }}
            />
          </div>

          {/* Level */}
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                color: '#94a3b8',
                fontSize: '0.8rem',
                marginBottom: '0.25rem',
              }}
            >
              <span style={{ color: '#3b82f6' }}>level</span>: "Junior" | "Mid" | "Senior" | "Lead"
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {Object.keys(levelColors).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  style={{
                    flex: 1,
                    padding: '0.375rem',
                    backgroundColor: level === l ? levelColors[l] : '#0f172a',
                    border: `1px solid ${level === l ? levelColors[l] : '#334155'}`,
                    borderRadius: '0.375rem',
                    color: level === l ? 'white' : '#64748b',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* isOnline */}
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#94a3b8',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={isOnline}
                onChange={(e) => setIsOnline(e.target.checked)}
                style={{ width: '1rem', height: '1rem' }}
              />
              <span style={{ color: '#3b82f6' }}>isOnline</span>: boolean = {isOnline.toString()}
            </label>
          </div>

          {/* Skills */}
          <div>
            <label
              style={{
                display: 'block',
                color: '#94a3b8',
                fontSize: '0.8rem',
                marginBottom: '0.25rem',
              }}
            >
              <span style={{ color: '#3b82f6' }}>skills</span>: string[]
            </label>
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}
            >
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#0f172a',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                  }}
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '0 0.125rem',
                      fontSize: '0.875rem',
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Add skill..."
                style={{
                  flex: 1,
                  padding: '0.375rem 0.5rem',
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '0.375rem',
                  color: '#f8fafc',
                  fontSize: '0.75rem',
                }}
              />
              <button
                onClick={addSkill}
                style={{
                  padding: '0.375rem 0.75rem',
                  backgroundColor: '#22c55e',
                  border: 'none',
                  borderRadius: '0.375rem',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Live Preview: {'<ProfileCard {...props} />'}
          </div>

          {/* Rendered Card */}
          <div
            style={{
              backgroundColor: '#1e293b',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid #334155',
            }}
          >
            {/* Header */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}
            >
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundColor: levelColors[level],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.125rem' }}>
                    {name || 'Name'}
                  </h3>
                  <span
                    style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      borderRadius: '50%',
                      backgroundColor: isOnline ? '#22c55e' : '#64748b',
                    }}
                  />
                </div>
                <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.875rem' }}>
                  {role || 'Role'}
                </p>
              </div>
              <span
                style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: `${levelColors[level]}22`,
                  color: levelColors[level],
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                }}
              >
                {level}
              </span>
            </div>

            {/* Skills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#0f172a',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Props Object */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>
              PROPS OBJECT
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.75rem',
                backgroundColor: '#1e293b',
                borderRadius: '0.375rem',
                fontSize: '0.7rem',
                lineHeight: 1.5,
                overflow: 'auto',
              }}
            >
              <code style={{ color: '#94a3b8' }}>
                {JSON.stringify({ name, role, level, isOnline, skills }, null, 2)}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
