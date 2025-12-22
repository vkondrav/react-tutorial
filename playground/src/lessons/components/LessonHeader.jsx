export default function LessonHeader({ module, lesson, title }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div
        style={{
          color: '#38bdf8',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Module {module} · Lesson {lesson}
      </div>
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          margin: 0,
          background: 'linear-gradient(to right, #f8fafc, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </h1>
    </div>
  );
}
