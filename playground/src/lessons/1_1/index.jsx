// Module 1, Lesson 1: What is React?

import { LessonHeader, Section, TakeawayList } from '../components';
import ComparisonDemo from './ComparisonDemo';
import ComponentTreeDemo from './ComponentTreeDemo';
import VirtualDomDemo from './VirtualDomDemo';

export default function Lesson1_1() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <LessonHeader module="1" lesson="1" title="What is React & Why Use It?" />

      <Section title="🎯 The Big Idea">
        <p style={{ lineHeight: 1.8, color: '#94a3b8' }}>
          React lets you describe <strong style={{ color: '#38bdf8' }}>what</strong> your UI should
          look like, not <strong style={{ color: '#f472b6' }}>how</strong> to build it step by step.
          This is called <em>declarative programming</em>.
        </p>
      </Section>

      <Section title="⚔️ Imperative vs Declarative">
        <ComparisonDemo />
      </Section>

      <Section title="🧱 Components in Action">
        <p style={{ lineHeight: 1.8, color: '#94a3b8', marginBottom: '1.5rem' }}>
          Everything you see on this page is built from{' '}
          <strong style={{ color: '#38bdf8' }}>components</strong>. Components can contain other
          components - this is called <strong style={{ color: '#22c55e' }}>composition</strong>.
        </p>
        <ComponentTreeDemo />
      </Section>

      <Section title="⚡ React's Secret Sauce: Virtual DOM">
        <VirtualDomDemo />
      </Section>

      <Section title="✅ Key Takeaways">
        <TakeawayList
          items={[
            'React is a library for building UIs with reusable components',
            'Declarative code describes WHAT you want, not HOW to do it',
            'Components are like LEGO blocks - small, reusable, composable',
            "Virtual DOM makes updates fast by only changing what's necessary",
            'One-way data flow keeps your app predictable',
          ]}
        />
      </Section>
    </div>
  );
}
