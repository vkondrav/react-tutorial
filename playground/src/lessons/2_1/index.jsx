import { LessonHeader, Section, TakeawayList } from '../components';
import PropsBasicsDemo from './PropsBasicsDemo';
import DestructuringDemo from './DestructuringDemo';
import DefaultPropsDemo from './DefaultPropsDemo';
import ChildrenDemo from './ChildrenDemo';
import PropsPlayground from './PropsPlayground';

export default function Lesson2_1() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <LessonHeader module="2" lesson="1" title="Props: Passing Data to Components" />

      <Section title="📦 What are Props?">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          <strong style={{ color: '#3b82f6' }}>Props</strong> (short for "properties") are how you
          pass data from a parent component to a child component. They're like function arguments,
          but for components!
        </p>
        <PropsBasicsDemo />
      </Section>

      <Section title="🎯 Destructuring Props">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          Instead of accessing <code style={{ color: '#22c55e' }}>props.name</code> every time, you
          can <strong style={{ color: '#f59e0b' }}>destructure</strong> props directly in the
          function parameters:
        </p>
        <DestructuringDemo />
      </Section>

      <Section title="⚙️ Default Props">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          What if a prop isn't passed? You can provide{' '}
          <strong style={{ color: '#8b5cf6' }}>default values</strong> so your component always has
          something to work with:
        </p>
        <DefaultPropsDemo />
      </Section>

      <Section title="👶 The Children Prop">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          The special <code style={{ color: '#ec4899' }}>children</code> prop lets you pass content
          between component tags - just like HTML elements!
        </p>
        <ChildrenDemo />
      </Section>

      <Section title="🎮 Props Playground">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          Experiment with props! Change the values and see how the component updates:
        </p>
        <PropsPlayground />
      </Section>

      <Section title="✅ Key Takeaways">
        <TakeawayList
          items={[
            'Props are how data flows from parent to child components',
            'Props are read-only - a component cannot modify its own props',
            'Use destructuring for cleaner code: function Button({ label, onClick })',
            'Provide default values with = in destructuring: { size = "medium" }',
            'The children prop passes content between opening and closing tags',
            'Props can be any JavaScript value: strings, numbers, objects, functions, even components!',
          ]}
        />
      </Section>
    </div>
  );
}
