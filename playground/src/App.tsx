// ============================================
// React Tutorial - Lesson Navigator
// ============================================
// This is the main app that lets you navigate
// between lessons. Each lesson is preserved
// in its own file in /src/lessons/
// ============================================

import { useState, useEffect, lazy, Suspense } from 'react';
import {
  HiOutlineMenuAlt2,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineCheck,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineHome,
  HiOutlineDocumentAdd,
  HiOutlineTemplate,
  HiOutlineSwitchHorizontal,
} from 'react-icons/hi';
import { DiReact, DiCss3 } from 'react-icons/di';
import config from './lessons/config.json';
import Homepage from './Homepage';
import AddLessonGuide from './AddLessonGuide';
import SettingsModal from './SettingsModal';
import {
  loadSettings,
  getLessonSourceLink,
  getLessonStorybookLink,
  type AppSettings,
} from './settings';
import { ViewSourceButton } from '@components';

// Types
interface SectionConfig {
  id: string;
  title: string;
  icon: string;
  color: string;
}

interface LessonConfig {
  id: string;
  section: string;
  module: number;
  title: string;
}

interface ModuleConfig {
  id: number;
  section: string;
  title: string;
  color: string;
}

type LazyLessonComponent = React.LazyExoticComponent<React.ComponentType>;

interface Lesson extends LessonConfig {
  component: LazyLessonComponent | null;
}

// Loading skeleton for lazy-loaded lessons
function LessonSkeleton(): React.ReactElement {
  return (
    <div className="p-8 animate-pulse">
      {/* Header skeleton */}
      <div className="skeleton h-10 w-2/3 mb-6" />
      <div className="skeleton h-4 w-1/2 mb-8" />

      {/* Content blocks */}
      <div className="space-y-6">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
        <div className="skeleton h-4 w-4/5" />

        {/* Code block skeleton */}
        <div className="skeleton h-32 w-full rounded-lg" />

        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />

        {/* Interactive demo skeleton */}
        <div className="skeleton h-48 w-full rounded-lg" />
      </div>
    </div>
  );
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

// Auto-generate lesson component mapping from file structure
// Using Vite's import.meta.glob for dynamic imports
const lessonModules = import.meta.glob<{ default: React.ComponentType }>('./lessons/*/*/index.tsx');

// Transform file paths to lesson IDs
// Example: './lessons/react/1_1/index.tsx' -> 'react-1.1'
const LESSON_COMPONENTS: Record<string, LazyLessonComponent> = Object.keys(lessonModules).reduce(
  (acc, path) => {
    const match = path.match(/\.\/lessons\/(react|css)\/(\d+)_(\d+)\/index\.tsx$/);
    if (match) {
      const [, section, module, lesson] = match;
      const lessonId = `${section}-${module}.${lesson}`;
      acc[lessonId] = lazy(lessonModules[path] as () => Promise<{ default: React.ComponentType }>);
    }
    return acc;
  },
  {} as Record<string, LazyLessonComponent>
);

// Validate lesson component mapping
if (import.meta.env.DEV) {
  console.log(`✅ Auto-loaded ${Object.keys(LESSON_COMPONENTS).length} lesson components`);
}

// Sections from config
const SECTIONS: SectionConfig[] = config.sections as SectionConfig[];

// Merge config with component references
const LESSONS: Lesson[] = (config.lessons as LessonConfig[]).map((lesson) => ({
  ...lesson,
  component: LESSON_COMPONENTS[lesson.id] || null,
}));

const MODULES: ModuleConfig[] = config.modules as ModuleConfig[];

// Get section icon component
function SectionIcon({
  sectionId,
  className,
  size,
  style,
}: {
  sectionId: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}): React.ReactElement {
  if (sectionId === 'css') {
    return <DiCss3 className={className} size={size} style={style} />;
  }
  return <DiReact className={className} size={size} style={style} />;
}

// Get initial section and lesson from URL hash, or null for homepage
const getInitialState = (): { section: string | null; lessonId: string | null } => {
  const hash = window.location.hash.slice(1); // Remove '#'
  if (!hash || hash === 'add-lesson') return { section: null, lessonId: null };

  // Check if it's a lesson ID
  const lesson = LESSONS.find((l) => l.id === hash);
  if (lesson) {
    return { section: lesson.section, lessonId: hash };
  }

  // Check if it's a section ID
  const section = SECTIONS.find((s) => s.id === hash);
  if (section) {
    return { section: hash, lessonId: null };
  }

  return { section: null, lessonId: null };
};

// Check if we should show the add lesson guide
const getInitialShowAddLesson = (): boolean => {
  return window.location.hash === '#add-lesson';
};

function App(): React.ReactElement {
  const initialState = getInitialState();
  const [currentSection, setCurrentSection] = useState<string | null>(initialState.section);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(initialState.lessonId);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(loadCompletedLessons);
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [showAddLesson, setShowAddLesson] = useState<boolean>(getInitialShowAddLesson);

  // Get lessons for the current section
  const sectionLessons = currentSection
    ? LESSONS.filter((l) => l.section === currentSection)
    : LESSONS;

  const currentIndex = currentLessonId
    ? sectionLessons.findIndex((l) => l.id === currentLessonId)
    : -1;
  const isCurrentCompleted = currentLessonId ? completedLessons.has(currentLessonId) : false;

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

  const prevLesson = currentIndex > 0 ? sectionLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < sectionLessons.length - 1 ? sectionLessons[currentIndex + 1] : null;

  // Sync URL hash with current lesson or add-lesson guide
  useEffect(() => {
    if (showAddLesson) {
      window.location.hash = 'add-lesson';
    } else if (currentLessonId) {
      window.location.hash = currentLessonId;
    } else if (currentSection) {
      window.location.hash = currentSection;
    } else {
      // Clear hash for homepage
      history.replaceState(null, '', window.location.pathname);
    }
  }, [currentLessonId, currentSection, showAddLesson]);

  // Handle browser back/forward
  useEffect(() => {
    const handleHashChange = (): void => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setCurrentLessonId(null);
        setCurrentSection(null);
        setShowAddLesson(false);
        return;
      }
      if (hash === 'add-lesson') {
        setCurrentLessonId(null);
        setCurrentSection(null);
        setShowAddLesson(true);
        return;
      }

      // Check if it's a lesson ID
      const lesson = LESSONS.find((l) => l.id === hash);
      if (lesson) {
        setCurrentLessonId(hash);
        setCurrentSection(lesson.section);
        setShowAddLesson(false);
        return;
      }

      // Check if it's a section ID
      const section = SECTIONS.find((s) => s.id === hash);
      if (section) {
        setCurrentLessonId(null);
        setCurrentSection(hash);
        setShowAddLesson(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentLesson = currentLessonId ? LESSONS.find((l) => l.id === currentLessonId) : null;
  const CurrentComponent = currentLesson?.component;
  const currentSectionConfig = currentSection
    ? SECTIONS.find((s) => s.id === currentSection)
    : null;

  // Navigate to the first lesson of a section
  const startLearning = (sectionId?: string): void => {
    const targetSection = sectionId || 'react';
    const firstLesson = LESSONS.find((l) => l.section === targetSection && l.component);
    if (firstLesson) {
      setCurrentSection(targetSection);
      setCurrentLessonId(firstLesson.id);
    }
  };

  // Show add lesson guide
  if (showAddLesson) {
    return (
      <AddLessonGuide
        onBack={() => {
          setShowAddLesson(false);
          setCurrentLessonId(null);
          setCurrentSection(null);
        }}
      />
    );
  }

  // Show homepage when no section or lesson is selected
  if (!currentSection && !currentLessonId) {
    return (
      <Homepage onStartLearning={startLearning} settings={settings} onSaveSettings={setSettings} />
    );
  }

  // Get modules for the current section
  const sectionModules = MODULES.filter((m) => m.section === currentSection);

  return (
    <div className="font-sans bg-base-100 h-screen text-base-content flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-base-200 border-r border-base-300 overflow-hidden transition-all duration-300 shrink-0 h-full ${
          sidebarOpen ? 'w-[280px]' : 'w-0'
        }`}
      >
        <div className="w-[280px] h-full flex flex-col">
          {/* Logo - clickable to go home */}
          <button
            onClick={() => {
              setCurrentLessonId(null);
              setCurrentSection(null);
            }}
            className="p-6 border-b border-base-300 flex items-center gap-2 shrink-0 w-full hover:bg-base-300/30 transition-colors text-left"
          >
            <SectionIcon
              sectionId={currentSection || 'react'}
              className="text-3xl"
              size={30}
              style={{ color: currentSectionConfig?.color || '#61dafb' }}
            />
            <span className="font-bold text-lg">{currentSectionConfig?.title || 'Tutorial'}</span>
            <HiOutlineHome className="ml-auto text-base-content/40" size={18} />
          </button>

          {/* Section Switcher */}
          <div className="px-4 py-3 border-b border-base-300">
            <div className="flex gap-2">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSection(section.id);
                    setCurrentLessonId(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                    currentSection === section.id
                      ? 'bg-base-300 text-base-content'
                      : 'text-base-content/60 hover:bg-base-300/50'
                  }`}
                  style={{
                    borderBottom:
                      currentSection === section.id ? `2px solid ${section.color}` : undefined,
                  }}
                >
                  <SectionIcon sectionId={section.id} size={18} />
                  <span className="hidden sm:inline">
                    {section.id === 'react' ? 'React' : 'CSS'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Lessons List */}
          <nav className="p-4 flex-1 overflow-auto">
            {sectionModules.map((mod) => {
              const moduleLessons = sectionLessons.filter((l) => l.module === mod.id);
              if (moduleLessons.length === 0) return null;
              return (
                <div key={`${mod.section}-${mod.id}`} className="mb-6">
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
                      const displayId = lesson.id.replace(/^(react|css)-/, '');
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
                            {isCompleted ? '✓' : displayId}
                          </span>
                          <span className="flex-1">
                            {displayId} {lesson.title}
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
            <div className="text-xs text-base-content/60 mb-2">
              {currentSectionConfig?.title || 'Section'} Progress
            </div>
            <div className="h-1.5 bg-base-300 rounded overflow-hidden">
              <div
                className="h-full bg-success rounded transition-all duration-300"
                style={{
                  width: `${(sectionLessons.filter((l) => completedLessons.has(l.id)).length / sectionLessons.length) * 100}%`,
                }}
              />
            </div>
            <div className="text-xs text-base-content/70 mt-2">
              {sectionLessons.filter((l) => completedLessons.has(l.id)).length} /{' '}
              {sectionLessons.length} lessons complete
            </div>
          </div>

          {/* Add Lesson Link */}
          <button
            onClick={() => {
              setShowAddLesson(true);
              setCurrentLessonId(null);
              setCurrentSection(null);
            }}
            className="p-4 px-6 border-t border-base-300 shrink-0 w-full flex items-center gap-3 text-left hover:bg-base-300/30 transition-colors text-base-content/70 hover:text-base-content"
          >
            <HiOutlineDocumentAdd size={20} className="text-primary" />
            <span className="text-sm">Add a Lesson</span>
          </button>
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
                {currentSectionConfig?.title} · Module {currentLesson?.module} · Lesson{' '}
                {currentLesson?.id.replace(/^(react|css)-/, '')}
              </div>
              <div className="font-semibold">{currentLesson?.title}</div>
            </div>
            {currentLesson?.component && currentLessonId && (
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
                  href={getLessonStorybookLink(currentLessonId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm text-xs tooltip tooltip-bottom"
                  data-tip="View in Storybook"
                >
                  <HiOutlineTemplate size={18} />
                </a>
                <ViewSourceButton
                  href={getLessonSourceLink(currentLessonId, settings)}
                  settings={settings}
                  size="sm"
                  tooltipPosition="bottom"
                />
              </>
            )}
          </div>

          <div className="flex gap-2">
            {/* Section switcher in header for quick access */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm gap-2 tooltip tooltip-bottom"
                data-tip="Switch Section"
              >
                <HiOutlineSwitchHorizontal size={18} />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-box w-52"
              >
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => {
                        setCurrentSection(section.id);
                        setCurrentLessonId(null);
                      }}
                      className={currentSection === section.id ? 'active' : ''}
                    >
                      <SectionIcon sectionId={section.id} size={18} />
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <SettingsModal settings={settings} onSave={setSettings} />
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
            <Suspense fallback={<LessonSkeleton />}>
              <CurrentComponent />
            </Suspense>
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
