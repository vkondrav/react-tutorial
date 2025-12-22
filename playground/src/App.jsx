// ============================================
// React Tutorial - Lesson Navigator
// ============================================
// This is the main app that lets you navigate
// between lessons. Each lesson is preserved
// in its own file in /src/lessons/
// ============================================

import { useState, useEffect } from 'react';
import { HiOutlineMenuAlt2, HiOutlineArrowLeft } from 'react-icons/hi';
import { DiReact } from 'react-icons/di';
import config from './lessons/config.json';

// Component imports - register new lesson components here
import Lesson1_1 from './lessons/1_1';
import Lesson1_2 from './lessons/1_2';
import Lesson1_3 from './lessons/1_3';
import Lesson1_4 from './lessons/1_4';
import Lesson2_1 from './lessons/2_1';
import Lesson2_2 from './lessons/2_2';
import Lesson2_3 from './lessons/2_3';
import Lesson2_4 from './lessons/2_4';
import Lesson2_5 from './lessons/2_5';
import Lesson3_1 from './lessons/3_1';
import Lesson3_2 from './lessons/3_2';
import Lesson3_3 from './lessons/3_3';
import Lesson3_4 from './lessons/3_4';
import Lesson3_5 from './lessons/3_5';
import Lesson4_1 from './lessons/4_1';
import Lesson4_2 from './lessons/4_2';
import Lesson4_3 from './lessons/4_3';
import Lesson4_4 from './lessons/4_4';
import Lesson5_1 from './lessons/5_1';
import Lesson5_2 from './lessons/5_2';
import Lesson5_3 from './lessons/5_3';
import Lesson6_1 from './lessons/6_1';
import Lesson6_2 from './lessons/6_2';
import Lesson6_3 from './lessons/6_3';
import Lesson6_4 from './lessons/6_4';
import Lesson6_5 from './lessons/6_5';

// Map lesson IDs to their components
const LESSON_COMPONENTS = {
  1.1: Lesson1_1,
  1.2: Lesson1_2,
  1.3: Lesson1_3,
  1.4: Lesson1_4,
  2.1: Lesson2_1,
  2.2: Lesson2_2,
  2.3: Lesson2_3,
  2.4: Lesson2_4,
  2.5: Lesson2_5,
  3.1: Lesson3_1,
  3.2: Lesson3_2,
  3.3: Lesson3_3,
  3.4: Lesson3_4,
  3.5: Lesson3_5,
  4.1: Lesson4_1,
  4.2: Lesson4_2,
  4.3: Lesson4_3,
  4.4: Lesson4_4,
  5.1: Lesson5_1,
  5.2: Lesson5_2,
  5.3: Lesson5_3,
  6.1: Lesson6_1,
  6.2: Lesson6_2,
  6.3: Lesson6_3,
  6.4: Lesson6_4,
  6.5: Lesson6_5,
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
    <div className="font-sans bg-base-100 h-screen text-base-content flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-base-200 border-r border-base-300 overflow-hidden transition-all duration-300 shrink-0 h-full ${
          sidebarOpen ? 'w-[280px]' : 'w-0'
        }`}
      >
        <div className="w-[280px] h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-base-300 flex items-center gap-2 shrink-0">
            <DiReact
              className="text-primary text-3xl"
              style={{ animation: 'spin 24s linear infinite' }}
            />
            <span className="font-bold text-lg">React Tutorial</span>
          </div>

          {/* Lessons List */}
          <nav className="p-4 flex-1 overflow-auto">
            {MODULES.map((mod) => {
              const moduleLessons = LESSONS.filter((l) => l.module === mod.id);
              return (
                <div key={mod.id} className="mb-6">
                  <div
                    className="text-xs font-semibold mb-3 uppercase tracking-wider"
                    style={{ color: mod.color }}
                  >
                    Module {mod.id}: {mod.title}
                  </div>
                  <div className="flex flex-col gap-1">
                    {moduleLessons.map((lesson) => {
                      const isActive = currentLessonId === lesson.id;
                      const statusColors = {
                        complete: 'bg-success',
                        current: 'bg-primary',
                        locked: 'bg-base-300',
                      };
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => lesson.component && setCurrentLessonId(lesson.id)}
                          disabled={!lesson.component}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm w-full transition-all ${
                            isActive
                              ? 'bg-base-300 text-base-content'
                              : lesson.component
                                ? 'text-base-content/70 hover:bg-base-300/50'
                                : 'text-base-content/40 cursor-not-allowed'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.625rem] shrink-0 ${
                              statusColors[lesson.status] || 'bg-base-300'
                            } ${lesson.status === 'locked' ? 'text-base-content/50' : 'text-white'}`}
                          >
                            {lesson.status === 'complete'
                              ? '✓'
                              : lesson.status === 'current'
                                ? '▶'
                                : '🔒'}
                          </span>
                          <span className="flex-1">
                            {lesson.id} {lesson.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Progress */}
          <div className="p-4 px-6 border-t border-base-300 shrink-0">
            <div className="text-xs text-base-content/60 mb-2">Progress</div>
            <div className="h-1.5 bg-base-300 rounded overflow-hidden">
              <div
                className="h-full bg-success rounded transition-all duration-300"
                style={{
                  width: `${(LESSONS.filter((l) => l.status === 'complete').length / LESSONS.length) * 100}%`,
                }}
              />
            </div>
            <div className="text-xs text-base-content/70 mt-2">
              {LESSONS.filter((l) => l.status === 'complete').length} / {LESSONS.length} lessons
              complete
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-4 border-b border-base-300 bg-base-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn btn-ghost btn-sm btn-square"
            >
              {sidebarOpen ? <HiOutlineArrowLeft size={20} /> : <HiOutlineMenuAlt2 size={20} />}
            </button>
            <div>
              <div className="text-xs text-base-content/60">
                Module {currentLesson?.module} · Lesson {currentLesson?.id}
              </div>
              <div className="font-semibold">{currentLesson?.title}</div>
            </div>
            {currentLesson?.component && (
              <a
                href={getLessonSourceLink(currentLessonId)}
                className="btn btn-outline btn-sm text-xs"
                title="Open source in Cursor"
              >
                <span>{'</>'}</span>
                <span>View Source</span>
              </a>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => prevLesson?.component && setCurrentLessonId(prevLesson.id)}
              disabled={!prevLesson?.component}
              className="btn btn-ghost btn-sm"
            >
              ← Previous
            </button>
            <button
              onClick={handleNextClick}
              disabled={!nextLesson}
              className={`btn btn-sm ${
                nextLesson?.component ? 'btn-primary' : nextLesson ? 'btn-success' : 'btn-ghost'
              }`}
            >
              {nextLesson?.component ? 'Next →' : '📋 Copy to Chat'}
            </button>
          </div>
        </header>

        {/* Lesson Content */}
        <main className="flex-1 overflow-auto">
          {CurrentComponent ? (
            <CurrentComponent />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-base-content/60 p-8">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-base-content mb-2">Coming Soon!</h2>
              <p>This lesson is still being built. Check back later!</p>
            </div>
          )}
        </main>

        {/* Footer Navigation */}
        <footer className="flex justify-between items-center px-8 py-4 border-t border-base-300 bg-base-100">
          <div>
            {prevLesson && (
              <button
                onClick={() => prevLesson.component && setCurrentLessonId(prevLesson.id)}
                disabled={!prevLesson.component}
                className="btn btn-ghost flex items-center gap-2"
              >
                <span>←</span>
                <div className="text-left">
                  <div className="text-xs text-base-content/60">Previous</div>
                  <div>{prevLesson.title}</div>
                </div>
              </button>
            )}
          </div>
          <div>
            {nextLesson && (
              <button
                onClick={handleNextClick}
                className={`btn flex items-center gap-2 ${
                  nextLesson.component ? 'btn-outline btn-primary' : 'btn-outline btn-success'
                }`}
              >
                <div className="text-right">
                  <div className="text-xs text-base-content/60">
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
        <div className="toast toast-bottom toast-center z-50 animate-fadeIn">
          <div className="alert alert-success flex items-center gap-2">
            <span>✓</span>
            <span>Copied! Paste in Cursor chat</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
