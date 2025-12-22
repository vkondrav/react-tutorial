// ============================================
// React Tutorial - Lesson Navigator
// ============================================
// This is the main app that lets you navigate
// between lessons. Each lesson is preserved
// in its own file in /src/lessons/
// ============================================

import { useState, useEffect } from 'react';
import {
  HiOutlineMenuAlt2,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineCheck,
  HiOutlineCode,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';
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
import Lesson7_1 from './lessons/7_1';
import Lesson7_2 from './lessons/7_2';
import Lesson7_3 from './lessons/7_3';
import Lesson7_4 from './lessons/7_4';

// Types
interface LessonConfig {
  id: string;
  module: number;
  title: string;
}

interface ModuleConfig {
  id: number;
  title: string;
  color: string;
}

type LessonComponent = React.ComponentType;

interface Lesson extends LessonConfig {
  component: LessonComponent | null;
}

// LocalStorage key for completed lessons
const COMPLETED_LESSONS_KEY = 'react-tutorial-completed-lessons';

// Load completed lessons from localStorage
const loadCompletedLessons = (): Set<string> => {
  try {
    const saved = localStorage.getItem(COMPLETED_LESSONS_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
};

// Save completed lessons to localStorage
const saveCompletedLessons = (completed: Set<string>): void => {
  localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify([...completed]));
};

// Map lesson IDs to their components
const LESSON_COMPONENTS: Record<string, LessonComponent> = {
  '1.1': Lesson1_1,
  '1.2': Lesson1_2,
  '1.3': Lesson1_3,
  '1.4': Lesson1_4,
  '2.1': Lesson2_1,
  '2.2': Lesson2_2,
  '2.3': Lesson2_3,
  '2.4': Lesson2_4,
  '2.5': Lesson2_5,
  '3.1': Lesson3_1,
  '3.2': Lesson3_2,
  '3.3': Lesson3_3,
  '3.4': Lesson3_4,
  '3.5': Lesson3_5,
  '4.1': Lesson4_1,
  '4.2': Lesson4_2,
  '4.3': Lesson4_3,
  '4.4': Lesson4_4,
  '5.1': Lesson5_1,
  '5.2': Lesson5_2,
  '5.3': Lesson5_3,
  '6.1': Lesson6_1,
  '6.2': Lesson6_2,
  '6.3': Lesson6_3,
  '6.4': Lesson6_4,
  '6.5': Lesson6_5,
  '7.1': Lesson7_1,
  '7.2': Lesson7_2,
  '7.3': Lesson7_3,
  '7.4': Lesson7_4,
};

// Get Cursor IDE link for a lesson's source file
const getLessonSourceLink = (lessonId: string): string => {
  const folder = lessonId.replace('.', '_');
  return `cursor://file${config.projectPath}/${folder}/index.tsx`;
};

// Merge config with component references
const LESSONS: Lesson[] = (config.lessons as LessonConfig[]).map((lesson) => ({
  ...lesson,
  component: LESSON_COMPONENTS[lesson.id] || null,
}));

const MODULES: ModuleConfig[] = config.modules as ModuleConfig[];

// Get initial lesson from URL hash, or default to first available
const getInitialLesson = (): string => {
  const hash = window.location.hash.slice(1); // Remove '#'
  const lesson = LESSONS.find((l) => l.id === hash && l.component);
  return lesson ? hash : LESSONS.find((l) => l.component)?.id || '1.1';
};

function App(): React.ReactElement {
  const [currentLessonId, setCurrentLessonId] = useState<string>(getInitialLesson);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(loadCompletedLessons);

  const currentIndex = LESSONS.findIndex((l) => l.id === currentLessonId);
  const isCurrentCompleted = completedLessons.has(currentLessonId);

  const toggleLessonComplete = (lessonId: string): void => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      saveCompletedLessons(next);
      return next;
    });
  };
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null;
  const nextLesson = currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null;

  // Sync URL hash with current lesson
  useEffect(() => {
    window.location.hash = currentLessonId;
  }, [currentLessonId]);

  // Handle browser back/forward
  useEffect(() => {
    const handleHashChange = (): void => {
      const hash = window.location.hash.slice(1);
      const lesson = LESSONS.find((l) => l.id === hash && l.component);
      if (lesson) setCurrentLessonId(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentLesson = LESSONS.find((l) => l.id === currentLessonId);
  const CurrentComponent = currentLesson?.component;

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
                      const isCompleted = completedLessons.has(lesson.id);
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
                              isCompleted
                                ? 'bg-success text-white'
                                : 'bg-base-300 text-base-content/50'
                            }`}
                          >
                            {isCompleted ? '✓' : lesson.id}
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
                  width: `${(completedLessons.size / LESSONS.length) * 100}%`,
                }}
              />
            </div>
            <div className="text-xs text-base-content/70 mt-2">
              {completedLessons.size} / {LESSONS.length} lessons complete
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
              <>
                <button
                  onClick={() => toggleLessonComplete(currentLessonId)}
                  className={`btn btn-sm text-xs tooltip tooltip-bottom ${
                    isCurrentCompleted ? 'btn-success' : 'btn-outline btn-ghost'
                  }`}
                  data-tip={isCurrentCompleted ? 'Mark incomplete' : 'Mark complete'}
                >
                  {isCurrentCompleted ? (
                    <HiOutlineCheckCircle size={18} />
                  ) : (
                    <HiOutlineCheck size={18} />
                  )}
                </button>
                <a
                  href={getLessonSourceLink(currentLessonId)}
                  className="btn btn-outline btn-sm text-xs tooltip tooltip-bottom"
                  data-tip="View Source"
                >
                  <HiOutlineCode size={18} />
                </a>
              </>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => prevLesson?.component && setCurrentLessonId(prevLesson.id)}
              disabled={!prevLesson?.component}
              className="btn btn-ghost btn-sm btn-square tooltip tooltip-bottom"
              data-tip="Previous"
            >
              <HiOutlineChevronLeft size={20} />
            </button>
            <button
              onClick={() => nextLesson?.component && setCurrentLessonId(nextLesson.id)}
              disabled={!nextLesson?.component}
              className="btn btn-ghost btn-sm btn-square tooltip tooltip-bottom"
              data-tip="Next"
            >
              <HiOutlineChevronRight size={20} />
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
            {prevLesson?.component && (
              <button
                onClick={() => setCurrentLessonId(prevLesson.id)}
                className="btn btn-ghost flex items-center gap-2"
              >
                <HiOutlineChevronLeft size={20} />
                <div className="text-left">
                  <div className="text-xs text-base-content/60">Previous</div>
                  <div>{prevLesson.title}</div>
                </div>
              </button>
            )}
          </div>
          <div>
            {nextLesson?.component && (
              <button
                onClick={() => setCurrentLessonId(nextLesson.id)}
                className="btn btn-outline btn-primary flex items-center gap-2"
              >
                <div className="text-right">
                  <div className="text-xs text-base-content/60">Next</div>
                  <div>{nextLesson.title}</div>
                </div>
                <HiOutlineChevronRight size={20} />
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
