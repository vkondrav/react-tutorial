import {
  HiOutlineCube,
  HiOutlineDocumentText,
  HiOutlinePuzzle,
  HiOutlineCog,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import ComponentBasicsDemo from './ComponentBasicsDemo';
import ComponentRulesDemo from './ComponentRulesDemo';
import CompositionDemo from './CompositionDemo';
import ComponentBuilder from './ComponentBuilder';

export default function Lesson1_4() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="4" title="Components: Your First Building Block" />

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCube className="text-primary" size={20} />
            What is a Component?
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          A <strong className="text-primary">component</strong> is a reusable piece of UI. Think of
          it as a custom HTML element you create yourself. Components are the heart of React -
          everything you build is made of components!
        </p>
        <ComponentBasicsDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineDocumentText className="text-primary" size={20} />
            The 3 Component Rules
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          React components must follow three simple rules. Click each rule to see what happens when
          you break it:
        </p>
        <ComponentRulesDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePuzzle className="text-primary" size={20} />
            Component Composition
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          Components can contain other components - this is called{' '}
          <strong className="text-success">composition</strong>. It's how you build complex UIs from
          simple pieces:
        </p>
        <CompositionDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCog className="text-primary" size={20} />
            Component Builder
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          Try building your own component! Edit the name and content to see how components work:
        </p>
        <ComponentBuilder />
      </Section>

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
            'Components are reusable pieces of UI - like custom HTML elements',
            'Use function components (not class components) - they are simpler and modern',
            'Component names MUST start with a capital letter (PascalCase)',
            'Components must return JSX (or null) - forgetting return is a common mistake',
            'Components must return a single root element - use <> fragments if needed',
            'Compose complex UIs by nesting components inside each other',
          ]}
        />
      </Section>
    </div>
  );
}
