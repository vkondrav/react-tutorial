import { LessonHeader, Section, TakeawayList } from '../components';
import ComponentBasicsDemo from './ComponentBasicsDemo';
import ComponentRulesDemo from './ComponentRulesDemo';
import CompositionDemo from './CompositionDemo';
import ComponentBuilder from './ComponentBuilder';

export default function Lesson1_4() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <LessonHeader module="1" lesson="4" title="Components: Your First Building Block" />

      <Section title="🧱 What is a Component?">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          A <strong style={{ color: '#3b82f6' }}>component</strong> is a reusable piece of UI. Think
          of it as a custom HTML element you create yourself. Components are the heart of React -
          everything you build is made of components!
        </p>
        <ComponentBasicsDemo />
      </Section>

      <Section title="📏 The 3 Component Rules">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          React components must follow three simple rules. Click each rule to see what happens when
          you break it:
        </p>
        <ComponentRulesDemo />
      </Section>

      <Section title="🧩 Component Composition">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          Components can contain other components - this is called{' '}
          <strong style={{ color: '#22c55e' }}>composition</strong>. It's how you build complex UIs
          from simple pieces:
        </p>
        <CompositionDemo />
      </Section>

      <Section title="🔨 Component Builder">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          Try building your own component! Edit the name and content to see how components work:
        </p>
        <ComponentBuilder />
      </Section>

      <Section title="✅ Key Takeaways">
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
