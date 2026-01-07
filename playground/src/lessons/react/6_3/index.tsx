// ============================================
// Lesson 6.3: Higher-Order Components (HOCs)
// ============================================

import {
  HiOutlineCode,
  HiOutlineCollection,
  HiOutlineDocumentText,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../../components';
import HOCBasicsDemo from './HOCBasicsDemo';
import CommonHOCsDemo from './CommonHOCsDemo';
import HOCPatternsDemo from './HOCPatternsDemo';
import HOCPlayground from './HOCPlayground';

export default function Lesson6_3(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="6" lesson="3" title="Higher-Order Components" />

      {/* Section 1: What are HOCs? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCode className="text-primary" size={20} />
            What is a Higher-Order Component?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          A <strong className="text-primary">Higher-Order Component (HOC)</strong> is a function
          that takes a component and returns a{' '}
          <strong className="text-secondary">new enhanced component</strong>. It's a pattern for
          reusing component logic.
        </p>
        <HOCBasicsDemo />
      </Section>

      {/* Section 2: Common HOCs */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCollection className="text-primary" size={20} />
            Common HOC Patterns
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          HOCs are commonly used to add{' '}
          <strong className="text-primary">cross-cutting concerns</strong> like authentication,
          loading states, theming, and logging to components.
        </p>
        <CommonHOCsDemo />
      </Section>

      {/* Section 3: HOC Patterns & Conventions */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineDocumentText className="text-primary" size={20} />
            HOC Patterns & Conventions
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Follow these <strong className="text-primary">conventions</strong> to write HOCs that are
          easy to use and debug.
        </p>
        <HOCPatternsDemo />
      </Section>

      {/* Section 4: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            HOC Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          See HOCs in action! Combine multiple HOCs and see how they{' '}
          <strong className="text-primary">enhance</strong> simple components.
        </p>
        <HOCPlayground />
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
            'HOCs are functions: (Component) => EnhancedComponent',
            'They add behavior without modifying the original component',
            'Use the "with" prefix naming convention (withAuth, withLoading)',
            'Always pass through unrelated props using {...props}',
            'Set displayName for better debugging in React DevTools',
            'Modern alternative: custom hooks often replace HOCs',
            'HOCs still useful for class components and certain patterns',
          ]}
        />
      </Section>
    </div>
  );
}
