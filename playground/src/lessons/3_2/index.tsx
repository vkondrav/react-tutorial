// ============================================
// Lesson 3.2: useContext - Sharing State
// ============================================

import {
  HiOutlineExclamationCircle,
  HiOutlinePuzzle,
  HiOutlineLightningBolt,
  HiOutlineCollection,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import PropDrillingDemo from './PropDrillingDemo';
import ContextBasicsDemo from './ContextBasicsDemo';
import ContextWithStateDemo from './ContextWithStateDemo';
import MultipleContextsDemo from './MultipleContextsDemo';
import ContextPlayground from './ContextPlayground';

export default function Lesson3_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="3" lesson="2" title="useContext: Sharing State" />

      {/* Section 1: The Prop Drilling Problem */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineExclamationCircle className="text-primary" size={20} />
            The Prop Drilling Problem
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          As your app grows, you'll often need to pass data through many levels of components. This
          is called <strong className="text-error">prop drilling</strong> — and it gets messy fast.
          Every component in the chain needs to know about and pass along props it doesn't even use.
        </p>
        <PropDrillingDemo />
      </Section>

      {/* Section 2: Context Basics */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePuzzle className="text-primary" size={20} />
            Context to the Rescue
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">Context</strong> provides a way to pass data through the
          component tree without having to pass props manually at every level. It's like a
          "teleport" for your data!
        </p>
        <div className="card bg-base-300 p-4 mb-4">
          <h4 className="font-semibold text-success mb-2">Three Steps to Use Context:</h4>
          <ol className="text-sm space-y-2 text-base-content/70 list-decimal list-inside">
            <li>
              <strong className="text-base-content">Create</strong> the context with{' '}
              <code className="text-secondary">createContext()</code>
            </li>
            <li>
              <strong className="text-base-content">Provide</strong> the context with{' '}
              <code className="text-secondary">&lt;Context.Provider&gt;</code>
            </li>
            <li>
              <strong className="text-base-content">Consume</strong> the context with{' '}
              <code className="text-secondary">useContext()</code>
            </li>
          </ol>
        </div>
        <ContextBasicsDemo />
      </Section>

      {/* Section 3: Context + State */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            Context with State
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Context becomes truly powerful when combined with{' '}
          <strong className="text-primary">useState</strong>. This pattern lets you share both{' '}
          <em>state</em> and <em>state updaters</em> across your component tree.
        </p>
        <ContextWithStateDemo />
      </Section>

      {/* Section 4: Multiple Contexts */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCollection className="text-primary" size={20} />
            Using Multiple Contexts
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          You can use <strong className="text-primary">multiple contexts</strong> to separate
          different concerns. This keeps your code organized and allows components to subscribe only
          to the data they need.
        </p>
        <MultipleContextsDemo />
      </Section>

      {/* Section 5: Interactive Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Context Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Build a mini app with theme and user contexts! See how deeply nested components can access
          shared state without prop drilling.
        </p>
        <ContextPlayground />
      </Section>

      {/* Takeaways */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineClipboardCheck className="text-primary" size={20} />
            Key Takeaways
          </span>
        }
      >
        <TakeawayList
          items={[
            'Context solves prop drilling by "teleporting" data to any component',
            'Three steps: createContext() → Provider → useContext()',
            'Combine Context + useState to share dynamic state',
            'Use multiple contexts to separate concerns (theme, auth, etc.)',
            'Context re-renders ALL consumers when the value changes',
            "Don't overuse context — props are fine for 1-2 levels deep",
            'Consider context for: themes, user auth, locale, and app-wide settings',
          ]}
        />
      </Section>
    </div>
  );
}
