// ============================================
// Lesson 6.2: Render Props Pattern
// ============================================

import {
  HiOutlineCode,
  HiOutlineCube,
  HiOutlineCollection,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import RenderPropsBasicsDemo from './RenderPropsBasicsDemo';
import ChildrenAsFunctionDemo from './ChildrenAsFunctionDemo';
import CommonUseCasesDemo from './CommonUseCasesDemo';
import RenderPropsPlayground from './RenderPropsPlayground';

export default function Lesson6_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="6" lesson="2" title="Render Props Pattern" />

      {/* Section 1: What are Render Props? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCode className="text-primary" size={20} />
            What are Render Props?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          A <strong className="text-primary">render prop</strong> is a function prop that a component
          uses to know what to render. Instead of hardcoding the output, the component{' '}
          <strong className="text-secondary">delegates rendering</strong> to whoever uses it.
        </p>
        <RenderPropsBasicsDemo />
      </Section>

      {/* Section 2: Children as a Function */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCube className="text-primary" size={20} />
            Children as a Function
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          The most common render prop pattern uses <code className="text-secondary">children</code> as
          the function. This creates a clean API where you pass a function between the component tags.
        </p>
        <ChildrenAsFunctionDemo />
      </Section>

      {/* Section 3: Common Use Cases */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCollection className="text-primary" size={20} />
            Common Use Cases
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Render props shine when you need to{' '}
          <strong className="text-primary">share stateful logic</strong> without dictating the UI.
          Here are the most common patterns you'll encounter.
        </p>
        <CommonUseCasesDemo />
      </Section>

      {/* Section 4: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Render Props Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Combine render props in creative ways! See how{' '}
          <strong className="text-primary">flexible</strong> your components become when you let the
          consumer decide what to render.
        </p>
        <RenderPropsPlayground />
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
            'Render props let a component share its state via a function prop',
            'The pattern separates logic (the component) from presentation (the function)',
            'children-as-a-function is the most ergonomic render prop syntax',
            'Great for: mouse tracking, toggles, data fetching, animations',
            'Modern alternative: custom hooks often replace render props',
            'Render props still useful when you need conditional rendering control',
            'Avoid excessive nesting - extract to custom hooks if it gets complex',
          ]}
        />
      </Section>
    </div>
  );
}

