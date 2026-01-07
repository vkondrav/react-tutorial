import { DiReact, DiCss3 } from 'react-icons/di';
import {
  HiOutlineDesktopComputer,
  HiOutlineTerminal,
  HiOutlineLightBulb,
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineExternalLink,
  HiOutlineChevronRight,
  HiOutlineFolder,
  HiOutlineArrowRight,
  HiOutlineTemplate,
} from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import config from './lessons/config.json';
import SettingsModal from './SettingsModal';
import { type AppSettings, getHomepageSourceLink, getStorybookBaseUrl } from './settings';
import ViewSourceButton from './lessons/components/ViewSourceButton';

// Lesson descriptions for the course outline
const LESSON_DESCRIPTIONS: Record<string, string> = {
  // React lessons
  '1.1': 'Discover why React powers modern web apps and how its component model works',
  '1.2': 'Scaffold a React project with Vite, explore the file structure, and run your first app',
  '1.3': 'Learn the syntax that blends HTML with JavaScript and makes React intuitive',
  '1.4': 'Build reusable UI pieces and understand the component mental model',
  '2.1': 'Pass data between components and make them configurable',
  '2.2': "Add interactivity with React's core state management hook",
  '2.3': 'Respond to clicks, inputs, and other user interactions',
  '2.4': 'Show or hide content based on state and props',
  '2.5': 'Render dynamic collections efficiently with proper key usage',
  '3.1': 'Sync with external systems, handle side effects, and manage component lifecycle',
  '3.2': 'Share state across your app without prop drilling',
  '3.3': 'Access DOM elements and persist values across renders',
  '3.4': 'Optimize expensive calculations and prevent unnecessary re-renders',
  '3.5': 'Extract and share stateful logic between components',
  '4.1': 'Load data from APIs and display it in your components',
  '4.2': 'Handle loading spinners, error messages, and empty states gracefully',
  '4.3': 'Send data to APIs with POST, PUT, and DELETE requests',
  '4.4': 'Build a reusable hook for all your data fetching needs',
  '5.1': 'Manage form inputs with React state for full control',
  '5.2': 'Validate user input and display helpful error messages',
  '5.3': 'Handle complex forms with multiple fields efficiently',
  '6.1': 'Combine components like LEGO blocks for flexible UIs',
  '6.2': 'Share rendering logic between components with functions as children',
  '6.3': 'Enhance components with reusable behavior wrappers',
  '6.4': 'Build components that work together with implicit shared state',
  '6.5': "Use React 19's Activity component to preserve state when hiding content",
  '7.1': 'Move state to common ancestors for shared access',
  '7.2': 'Manage complex state transitions with reducer functions',
  '7.3': 'Combine Context and useReducer for app-wide state management',
  '7.4': 'Know when to reach for Redux, Zustand, or other solutions',
  '8.1': 'Render React on the server for better performance and SEO',
  '8.2': 'Write component tests with Storybook and interaction testing',
  '8.3': 'Simplify server state with caching, refetching, and mutations',
  '8.4': 'Explore the future of React with server components',
  // CSS lessons
  'css-1.1': 'Understand how CSS matches nodes in the DOM tree and efficient selector strategies',
  'css-1.2': 'Master the specificity calculation and understand inheritance patterns',
  'css-1.3': 'Deep dive into box-sizing, margin collapse, and display properties',
  'css-2.1': 'Learn relative, absolute, fixed, sticky positioning and stacking contexts',
  'css-2.2': 'Master the one-dimensional layout system with flex properties',
  'css-2.3': 'Create two-dimensional layouts with grid areas and fractional units',
  'css-2.4': 'Build responsive designs with media queries and fluid typography',
  'css-3.1': 'Create gradients, layered backgrounds, and CSS shapes',
  'css-3.2': 'Animate performantly with transforms and keyframes',
  'css-4.1': 'Use custom properties for theming and dynamic layouts',
  'css-4.2': 'Learn BEM naming conventions and utility-first CSS approaches',
  'css-4.3': 'Build accessible interfaces with proper focus management',
};

interface HomepageProps {
  onStartLearning: (sectionId?: string) => void;
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
}

// Section icon component
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

export default function Homepage({
  onStartLearning,
  settings,
  onSaveSettings,
}: HomepageProps): React.ReactElement {
  const sections = config.sections as Array<{
    id: string;
    title: string;
    icon: string;
    color: string;
  }>;
  const reactModules = (
    config.modules as Array<{ id: number; section: string; title: string; color: string }>
  ).filter((m) => m.section === 'react');
  const cssModules = (
    config.modules as Array<{ id: number; section: string; title: string; color: string }>
  ).filter((m) => m.section === 'css');
  const reactLessons = (
    config.lessons as Array<{ id: string; section: string; module: number; title: string }>
  ).filter((l) => l.section === 'react');
  const cssLessons = (
    config.lessons as Array<{ id: string; section: string; module: number; title: string }>
  ).filter((l) => l.section === 'css');

  return (
    <div className="min-h-screen bg-base-100 overflow-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute top-20 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          {/* Floating code symbols */}
          <div className="absolute top-1/4 left-1/4 text-base-content/5 text-6xl font-mono select-none">
            {'</>'}
          </div>
          <div className="absolute top-1/3 right-1/3 text-base-content/5 text-4xl font-mono select-none rotate-12">
            {'{ }'}
          </div>
          <div className="absolute bottom-1/4 left-1/3 text-base-content/5 text-5xl font-mono select-none -rotate-6">
            {'( )'}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-20">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <DiReact
              className="text-primary text-6xl"
              style={{ animation: 'spin 20s linear infinite' }}
            />
            <span className="font-bold text-3xl tracking-tight">Web Dev Tutorial</span>
          </div>

          {/* Tagline */}
          <h1 className="text-center text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Learn by{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent">
              Reading the Source
            </span>
          </h1>

          <p className="text-center text-xl text-base-content/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Interactive courses in React and CSS designed to be run{' '}
            <span className="text-primary font-semibold">locally on your machine</span>. Each lesson
            is real code you can inspect, modify, and learn from.
          </p>

          {/* Course Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {sections.map((section) => {
              const isReact = section.id === 'react';
              const sectionLessons = isReact ? reactLessons : cssLessons;
              const sectionModules = isReact ? reactModules : cssModules;
              return (
                <button
                  key={section.id}
                  onClick={() => onStartLearning(section.id)}
                  className="group bg-base-200/50 hover:bg-base-200 border border-base-content/10 hover:border-base-content/20 rounded-2xl p-8 text-left transition-all hover:shadow-lg"
                  style={{
                    borderTopWidth: 4,
                    borderTopColor: section.color,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${section.color}20` }}
                    >
                      <SectionIcon
                        sectionId={section.id}
                        size={36}
                        className="transition-transform group-hover:scale-110"
                        style={{ color: section.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {section.title}
                      </h2>
                      <p className="text-base-content/60 text-sm mb-4">
                        {isReact
                          ? 'From components to server-side rendering — master modern React development.'
                          : 'From selectors to animations — understand the physics of CSS layout.'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-base-content/50">
                        <span>{sectionLessons.length} lessons</span>
                        <span>•</span>
                        <span>{sectionModules.length} modules</span>
                      </div>
                    </div>
                    <HiOutlineChevronRight
                      size={24}
                      className="text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all mt-2"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {/* Settings Button */}
            <SettingsModal
              settings={settings}
              onSave={onSaveSettings}
              buttonClassName="btn btn-primary btn-lg gap-2"
              buttonLabel="Settings"
            />

            <a
              href={getStorybookBaseUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg gap-2"
            >
              <HiOutlineTemplate size={20} />
              Storybook
            </a>

            <a
              href="https://github.com/vkondrav/react-tutorial"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-lg gap-2"
            >
              <FaGithub size={20} />
              GitHub
              <HiOutlineExternalLink size={16} />
            </a>
          </div>

          {/* The Point - Big Emphasis Box */}
          <div className="relative bg-linear-to-br from-base-200 to-base-300 rounded-2xl p-8 border border-base-content/10">
            <div className="absolute -top-4 left-8 bg-warning text-warning-content px-4 py-1 rounded-full text-sm font-bold">
              THE POINT
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-xl bg-warning/20 flex items-center justify-center">
                  <HiOutlineDesktopComputer className="text-warning" size={32} />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">This isn't a read-only tutorial</h2>
                <p className="text-base-content/70 text-lg leading-relaxed">
                  Every demo you see is a{' '}
                  <span className="text-primary font-semibold">.tsx file</span> in the{' '}
                  <code className="bg-base-100 px-2 py-0.5 rounded text-sm">src/lessons/</code>{' '}
                  folder. Click{' '}
                  <ViewSourceButton
                    href={getHomepageSourceLink(settings)}
                    settings={settings}
                    size="xs"
                    tooltipPosition="top"
                    className="inline-flex mx-1"
                  />{' '}
                  on any lesson to open it in your editor. Change the code. See it update live.
                  <span className="text-accent font-semibold"> That's how you really learn.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-base-200/50 py-8">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-2xl font-bold mb-12">
            <span className="text-base-content/50 font-normal">How it works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold text-sm">
                1
              </div>
              <div className="bg-base-100 rounded-xl p-6 h-full border border-base-content/5">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <HiOutlineTerminal className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Clone & Run</h3>
                <p className="text-base-content/60 text-sm leading-relaxed mb-4">
                  Get the source code and start the dev server locally.
                </p>
                <div className="bg-base-200 rounded-lg p-3 font-mono text-xs text-base-content/80">
                  <div className="text-success">$ git clone ...</div>
                  <div className="text-success">$ cd playground && npm i</div>
                  <div className="text-success">$ npm run dev</div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-content font-bold text-sm">
                2
              </div>
              <div className="bg-base-100 rounded-xl p-6 h-full border border-base-content/5">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <HiOutlineEye className="text-secondary" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Learn Interactively</h3>
                <p className="text-base-content/60 text-sm leading-relaxed mb-4">
                  Work through 40+ lessons across React and CSS with live demos.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-outline badge-sm">Components</span>
                  <span className="badge badge-outline badge-sm">Hooks</span>
                  <span className="badge badge-outline badge-sm">Flexbox</span>
                  <span className="badge badge-outline badge-sm">Grid</span>
                  <span className="badge badge-outline badge-sm">Animations</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-content font-bold text-sm">
                3
              </div>
              <div className="bg-base-100 rounded-xl p-6 h-full border border-base-content/5">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <HiOutlinePencilAlt className="text-accent" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Modify & Experiment</h3>
                <p className="text-base-content/60 text-sm leading-relaxed mb-4">
                  Open any lesson's source code. Tweak it. Break it. Fix it. See instant results.
                </p>
                <div className="flex items-center gap-2 text-sm text-base-content/50">
                  <HiOutlineFolder size={16} />
                  <code className="text-xs">src/lessons/3_2/index.tsx</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Local */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                <HiOutlineLightBulb size={16} />
                Why run it locally?
              </div>
              <h2 className="text-3xl font-bold mb-6">
                You can't learn to code by{' '}
                <span className="text-base-content/40">just reading</span>
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  <div>
                    <span className="font-semibold">Full IDE experience</span>
                    <p className="text-base-content/60 text-sm">
                      Jump to definitions, see TypeScript types, use your favorite extensions
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  <div>
                    <span className="font-semibold">Hot Module Replacement</span>
                    <p className="text-base-content/60 text-sm">
                      Edit code and see changes instantly without refreshing
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  <div>
                    <span className="font-semibold">Real project structure</span>
                    <p className="text-base-content/60 text-sm">
                      Learn patterns you'll use in production apps
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  <div>
                    <span className="font-semibold">Break things safely</span>
                    <p className="text-base-content/60 text-sm">
                      It's your copy. Experiment freely, git reset when needed
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Code window mockup */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-base-300 rounded-xl overflow-hidden border border-base-content/10 shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-base-200 border-b border-base-content/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-error/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <div className="flex-1 text-center text-xs text-base-content/50 font-mono">
                    CounterDemo.tsx
                  </div>
                </div>
                <div className="p-4 font-mono text-sm leading-relaxed">
                  <div>
                    <span className="text-purple-400">function</span>{' '}
                    <span className="text-blue-400">CounterDemo</span>
                    <span className="text-base-content/70">{'() {'}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-base-content">[count, setCount]</span>{' '}
                    <span className="text-base-content/70">=</span>{' '}
                    <span className="text-blue-400">useState</span>
                    <span className="text-base-content/70">(</span>
                    <span className="text-orange-400">0</span>
                    <span className="text-base-content/70">);</span>
                  </div>
                  <div className="pl-4 mt-2">
                    <span className="text-purple-400">return</span>{' '}
                    <span className="text-base-content/70">(</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-base-content/70">{'<'}</span>
                    <span className="text-green-400">button</span>{' '}
                    <span className="text-cyan-400">onClick</span>
                    <span className="text-base-content/70">{'={'}</span>
                    <span className="text-base-content/70">{'() => '}</span>
                    <span className="text-blue-400">setCount</span>
                    <span className="text-base-content/70">{'(c => c + 1)'}</span>
                    <span className="text-base-content/70">{'}'}</span>
                    <span className="text-base-content/70">{'>'}</span>
                  </div>
                  <div className="pl-10">
                    <span className="text-base-content">Clicked </span>
                    <span className="text-base-content/70">{'{count}'}</span>
                    <span className="text-base-content"> times</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-base-content/70">{'</'}</span>
                    <span className="text-green-400">button</span>
                    <span className="text-base-content/70">{'>'}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-base-content/70">);</span>
                  </div>
                  <div>
                    <span className="text-base-content/70">{'}'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Outline - React */}
      <div className="bg-base-200/30 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#61dafb]/10 text-[#61dafb] px-3 py-1 rounded-full text-sm font-medium mb-4">
              <DiReact size={16} />
              React Course
            </div>
            <h2 className="text-3xl font-bold mb-3">
              {reactLessons.length} Lessons Across {reactModules.length} Modules
            </h2>
            <p className="text-base-content/60 max-w-2xl mx-auto">
              From your first component to server-side rendering — a complete journey through modern
              React.
            </p>
          </div>

          <div className="space-y-8">
            {reactModules.map((mod) => {
              const moduleLessons = reactLessons.filter((l) => l.module === mod.id);
              return (
                <div
                  key={`react-${mod.id}`}
                  className="bg-base-100 rounded-xl border border-base-content/10 overflow-hidden"
                >
                  {/* Module Header */}
                  <div
                    className="px-6 py-4 border-b border-base-content/10"
                    style={{ borderLeftWidth: 4, borderLeftColor: mod.color }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: `${mod.color}20`, color: mod.color }}
                      >
                        {mod.id}
                      </span>
                      <div>
                        <h3 className="font-bold text-lg">{mod.title}</h3>
                        <p className="text-xs text-base-content/50">
                          {moduleLessons.length} lessons
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="divide-y divide-base-content/5">
                    {moduleLessons.map((lesson) => (
                      <a
                        key={lesson.id}
                        href={`#${lesson.id}`}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-base-200/50 transition-colors group"
                      >
                        <span
                          className="text-xs font-mono px-2 py-1 rounded"
                          style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
                        >
                          {lesson.id}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium group-hover:text-primary transition-colors">
                            {lesson.title}
                          </div>
                          <p className="text-sm text-base-content/50 truncate">
                            {LESSON_DESCRIPTIONS[lesson.id] || 'Explore this topic in depth'}
                          </p>
                        </div>
                        <HiOutlineArrowRight
                          size={16}
                          className="text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Course Outline - CSS */}
      <div className="bg-base-200/50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#264de4]/10 text-[#264de4] px-3 py-1 rounded-full text-sm font-medium mb-4">
              <DiCss3 size={16} />
              CSS Course
            </div>
            <h2 className="text-3xl font-bold mb-3">
              {cssLessons.length} Lessons Across {cssModules.length} Modules
            </h2>
            <p className="text-base-content/60 max-w-2xl mx-auto">
              Understand the physics of CSS — from the cascade to animations, build layouts with
              confidence.
            </p>
          </div>

          <div className="space-y-8">
            {cssModules.map((mod) => {
              const moduleLessons = cssLessons.filter((l) => l.module === mod.id);
              if (moduleLessons.length === 0) return null;
              return (
                <div
                  key={`css-${mod.id}`}
                  className="bg-base-100 rounded-xl border border-base-content/10 overflow-hidden"
                >
                  {/* Module Header */}
                  <div
                    className="px-6 py-4 border-b border-base-content/10"
                    style={{ borderLeftWidth: 4, borderLeftColor: mod.color }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: `${mod.color}20`, color: mod.color }}
                      >
                        {mod.id}
                      </span>
                      <div>
                        <h3 className="font-bold text-lg">{mod.title}</h3>
                        <p className="text-xs text-base-content/50">
                          {moduleLessons.length} lesson{moduleLessons.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="divide-y divide-base-content/5">
                    {moduleLessons.map((lesson) => {
                      const displayId = lesson.id.replace('css-', '');
                      return (
                        <a
                          key={lesson.id}
                          href={`#${lesson.id}`}
                          className="flex items-center gap-4 px-6 py-4 hover:bg-base-200/50 transition-colors group"
                        >
                          <span
                            className="text-xs font-mono px-2 py-1 rounded"
                            style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
                          >
                            {displayId}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium group-hover:text-primary transition-colors">
                              {lesson.title}
                            </div>
                            <p className="text-sm text-base-content/50 truncate">
                              {LESSON_DESCRIPTIONS[lesson.id] || 'Explore this topic in depth'}
                            </p>
                          </div>
                          <span className="badge badge-warning badge-sm">Coming Soon</span>
                          <HiOutlineArrowRight
                            size={16}
                            className="text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Viewing Online Banner */}
      <div className="bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-lg text-base-content/80 mb-4">
            Viewing this online?{' '}
            <span className="font-semibold text-base-content">You're missing the best part!</span>
          </p>
          <a
            href="https://github.com/vkondrav/react-tutorial"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary gap-2"
          >
            <FaGithub size={18} />
            Clone the repo and run locally
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-base-content/10">
        <div className="max-w-5xl mx-auto px-6 text-center text-base-content/50 text-sm">
          <p className="mb-2">Built with React, TypeScript, Tailwind CSS, and daisyUI</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/vkondrav/react-tutorial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors"
            >
              <FaGithub size={14} />
              GitHub
            </a>
            <span className="text-base-content/30">•</span>
            <a
              href="#add-lesson"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors"
            >
              Add Your Own Lessons
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
