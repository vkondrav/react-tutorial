// ============================================
// React Tutorial - Lesson Navigator
// ============================================
// This is the main app that lets you navigate
// between lessons. Each lesson is preserved
// in its own file in /src/lessons/
// ============================================

import { useState, useEffect } from 'react';
import config from './lessons/config.json';

// Component imports - register new lesson components here
import Lesson1_1 from './lessons/1_1';
import Lesson1_2 from './lessons/1_2';
import Lesson1_3 from './lessons/1_3';
import Lesson1_4 from './lessons/1_4';
import Lesson2_1 from './lessons/2_1';
import Lesson2_2 from './lessons/2_2';
import Lesson2_3 from './lessons/2_3';

// Map lesson IDs to their components
const LESSON_COMPONENTS = {
  1.1: Lesson1_1,
  1.2: Lesson1_2,
  1.3: Lesson1_3,
  1.4: Lesson1_4,
  2.1: Lesson2_1,
  2.2: Lesson2_2,
  2.3: Lesson2_3,
};

// Get Cursor IDE link for a lesson's source file
const getLessonSourceLink = (lessonId) => {
  const folder = lessonId.replace('.', '_');
  return `cursor://file${config.projectPath}/${folder}/index.jsx`;
};

// Merge config with component references
const LESSONS = config.lessons.map((lesson) => ({
  ...lesson,
  component: LESSON_COMPONENTS[lesson.id] || null,
}));

const MODULES = config.modules;

// Get initial lesson from URL hash, or default to first available
const getInitialLesson = () => {
  const hash = window.location.hash.slice(1); // Remove '#'
  const lesson = LESSONS.find((l) => l.id === hash && l.component);
  return lesson ? hash : LESSONS.find((l) => l.component)?.id || '1.1';
};

function App() {
  const [currentLessonId, setCurrentLessonId] = useState(getInitialLesson);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedMessage, setCopiedMessage] = useState(null);

  // Copy message to clipboard for pasting to Cursor chat
  const copyToChat = (message) => {
    // Show toast immediately
    setCopiedMessage(message);

    // Try to copy to clipboard (fire and forget)
    navigator.clipboard.writeText(message).catch(() => {
      console.log('Clipboard unavailable, message:', message);
    });

    // Hide toast after 3 seconds
    setTimeout(() => setCopiedMessage(null), 3000);
  };

  // Handle Next button click - note: uses nextLesson which is defined below
  const handleNextClick = () => {
    if (nextLesson?.component) {
      setCurrentLessonId(nextLesson.id);
    } else if (nextLesson) {
      // Lesson exists but not built yet - copy message for chat
      copyToChat(`Let's continue to Lesson ${nextLesson.id}: ${nextLesson.title}`);
    }
  };

  // Sync URL hash with current lesson
  useEffect(() => {
    window.location.hash = currentLessonId;
  }, [currentLessonId]);

  // Handle browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const lesson = LESSONS.find((l) => l.id === hash && l.component);
      if (lesson) setCurrentLessonId(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentLesson = LESSONS.find((l) => l.id === currentLessonId);
  const CurrentComponent = currentLesson?.component;

  const currentIndex = LESSONS.findIndex((l) => l.id === currentLessonId);
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null;
  const nextLesson = currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null;

  return (
    <div
      style={{
        fontFamily: '"SF Pro Display", system-ui, sans-serif',
        backgroundColor: '#0f172a',
        minHeight: '100vh',
        color: '#e2e8f0',
        display: 'flex',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? '280px' : '0px',
          backgroundColor: '#1e293b',
          borderRight: '1px solid #334155',
          overflow: 'hidden',
          transition: 'width 0.3s ease',
          flexShrink: 0,
        }}
      >
        <div style={{ width: '280px', height: '100vh', overflow: 'auto' }}>
          {/* Logo */}
          <div
            style={{
              padding: '1.5rem',
              borderBottom: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: '#38bdf8', fontSize: '1.5rem' }}>⚛</span>
            <span style={{ fontWeight: '700', fontSize: '1.125rem' }}>React Tutorial</span>
          </div>

          {/* Lessons List */}
          <nav style={{ padding: '1rem' }}>
            {MODULES.map((mod) => {
              const moduleLessons = LESSONS.filter((l) => l.module === mod.id);
              return (
                <div key={mod.id} style={{ marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: mod.color,
                      marginBottom: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Module {mod.id}: {mod.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {moduleLessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => lesson.component && setCurrentLessonId(lesson.id)}
                        disabled={!lesson.component}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.625rem 0.75rem',
                          backgroundColor:
                            currentLessonId === lesson.id ? '#334155' : 'transparent',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: lesson.component
                            ? currentLessonId === lesson.id
                              ? '#f8fafc'
                              : '#94a3b8'
                            : '#475569',
                          cursor: lesson.component ? 'pointer' : 'not-allowed',
                          textAlign: 'left',
                          fontSize: '0.875rem',
                          width: '100%',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span
                          style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.625rem',
                            backgroundColor:
                              lesson.status === 'complete'
                                ? '#22c55e'
                                : lesson.status === 'current'
                                  ? '#3b82f6'
                                  : '#334155',
                            color: lesson.status === 'locked' ? '#64748b' : 'white',
                            flexShrink: 0,
                          }}
                        >
                          {lesson.status === 'complete'
                            ? '✓'
                            : lesson.status === 'current'
                              ? '▶'
                              : '🔒'}
                        </span>
                        <span style={{ flex: 1 }}>
                          {lesson.id} {lesson.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Progress */}
          <div
            style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid #334155',
              marginTop: 'auto',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
              Progress
            </div>
            <div
              style={{
                height: '6px',
                backgroundColor: '#334155',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(LESSONS.filter((l) => l.status === 'complete').length / LESSONS.length) * 100}%`,
                  height: '100%',
                  backgroundColor: '#22c55e',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              {LESSONS.filter((l) => l.status === 'complete').length} / {LESSONS.length} lessons
              complete
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            borderBottom: '1px solid #1e293b',
            backgroundColor: '#0f172a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                padding: '0.5rem',
                backgroundColor: 'transparent',
                border: '1px solid #334155',
                borderRadius: '0.375rem',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Module {currentLesson?.module} · Lesson {currentLesson?.id}
              </div>
              <div style={{ fontWeight: '600', color: '#f8fafc' }}>{currentLesson?.title}</div>
            </div>
            {currentLesson?.component && (
              <a
                href={getLessonSourceLink(currentLessonId)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.375rem 0.75rem',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '0.375rem',
                  color: '#94a3b8',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                title="Open source in Cursor"
              >
                <span>{'</>'}</span>
                <span>View Source</span>
              </a>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => prevLesson?.component && setCurrentLessonId(prevLesson.id)}
              disabled={!prevLesson?.component}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '0.375rem',
                color: prevLesson?.component ? '#94a3b8' : '#475569',
                cursor: prevLesson?.component ? 'pointer' : 'not-allowed',
                fontSize: '0.875rem',
              }}
            >
              ← Previous
            </button>
            <button
              onClick={handleNextClick}
              disabled={!nextLesson}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: nextLesson?.component
                  ? '#3b82f6'
                  : nextLesson
                    ? '#22c55e'
                    : '#1e293b',
                border: 'none',
                borderRadius: '0.375rem',
                color: nextLesson ? 'white' : '#475569',
                cursor: nextLesson ? 'pointer' : 'not-allowed',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
            >
              {nextLesson?.component ? 'Next →' : '📋 Copy to Chat'}
            </button>
          </div>
        </header>

        {/* Lesson Content */}
        <main style={{ flex: 1, overflow: 'auto' }}>
          {CurrentComponent ? (
            <CurrentComponent />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#64748b',
                padding: '2rem',
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</div>
              <h2 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>Coming Soon!</h2>
              <p>This lesson is still being built. Check back later!</p>
            </div>
          )}
        </main>

        {/* Footer Navigation */}
        <footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            borderTop: '1px solid #1e293b',
            backgroundColor: '#0f172a',
          }}
        >
          <div>
            {prevLesson && (
              <button
                onClick={() => prevLesson.component && setCurrentLessonId(prevLesson.id)}
                disabled={!prevLesson.component}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'transparent',
                  border: '1px solid #334155',
                  borderRadius: '0.5rem',
                  color: prevLesson.component ? '#94a3b8' : '#475569',
                  cursor: prevLesson.component ? 'pointer' : 'not-allowed',
                  fontSize: '0.875rem',
                }}
              >
                <span>←</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Previous</div>
                  <div>{prevLesson.title}</div>
                </div>
              </button>
            )}
          </div>
          <div>
            {nextLesson && (
              <button
                onClick={handleNextClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: nextLesson.component ? '#3b82f622' : '#22c55e22',
                  border: `1px solid ${nextLesson.component ? '#3b82f6' : '#22c55e'}`,
                  borderRadius: '0.5rem',
                  color: nextLesson.component ? '#3b82f6' : '#22c55e',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {nextLesson.component ? 'Next' : '📋 Copy to Chat'}
                  </div>
                  <div>{nextLesson.title}</div>
                </div>
                <span>{nextLesson.component ? '→' : ''}</span>
              </button>
            )}
          </div>
        </footer>
      </div>

      {/* Toast notification */}
      {copiedMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#22c55e',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>✓</span>
          <span>Copied! Paste in Cursor chat</span>
        </div>
      )}
    </div>
  );
}

export default App;
