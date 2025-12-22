// ============================================
// Lesson 7.3: Context + Reducer Pattern
// ============================================

import {
  HiOutlinePuzzle,
  HiOutlineTemplate,
  HiOutlineCube,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import WhyContextReducerDemo from './WhyContextReducerDemo';
import PatternSetupDemo from './PatternSetupDemo';
import CustomProviderDemo from './CustomProviderDemo';
import ContextReducerPlayground from './ContextReducerPlayground';

export default function Lesson7_3(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="7" lesson="3" title="Context + Reducer Pattern" />

      {/* Section 1: Why Combine Them? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePuzzle className="text-primary" size={20} />
            Why Context + Reducer?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">useReducer</strong> gives us structured state updates,
          but the state is still local. <strong className="text-secondary">useContext</strong>{' '}
          shares state globally. Together, they create a powerful{' '}
          <strong className="text-accent">state management pattern</strong>.
        </p>
        <WhyContextReducerDemo />
      </Section>

      {/* Section 2: Setting Up the Pattern */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTemplate className="text-primary" size={20} />
            Setting Up the Pattern
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          The pattern follows a clear structure: create context, build a reducer, wrap with a
          provider, and expose via <strong className="text-primary">custom hooks</strong>.
        </p>
        <PatternSetupDemo />
      </Section>

      {/* Section 3: Creating a Custom Provider */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCube className="text-primary" size={20} />
            Building Reusable Providers
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Encapsulate the reducer logic in a{' '}
          <strong className="text-primary">custom provider</strong> component. Export custom hooks
          for clean, type-safe access throughout your app.
        </p>
        <CustomProviderDemo />
      </Section>

      {/* Section 4: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Context + Reducer Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          See the pattern in action with real examples:{' '}
          <strong className="text-primary">theme switcher</strong>,{' '}
          <strong className="text-secondary">todo app</strong>, and{' '}
          <strong className="text-accent">shopping cart</strong>.
        </p>
        <ContextReducerPlayground />
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
            'Context + Reducer = global state with structured updates (like mini Redux)',
            'Create separate contexts for state and dispatch to optimize re-renders',
            'Custom hooks (useAppState, useAppDispatch) provide clean API and type safety',
            'Wrap your app (or subtree) with the provider to enable access',
            'Great for: auth, themes, shopping carts, notifications, user preferences',
            'For very large apps, consider dedicated libraries (Zustand, Redux Toolkit)',
            'Keep reducers pure — side effects belong in components or middleware',
          ]}
        />
      </Section>
    </div>
  );
}
