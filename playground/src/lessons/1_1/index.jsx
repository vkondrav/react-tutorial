// Module 1, Lesson 1: What is React?

import { LessonHeader, Section, TakeawayList } from '../components';
import ComparisonDemo from './ComparisonDemo';
import ComponentTreeDemo from './ComponentTreeDemo';
import VirtualDomDemo from './VirtualDomDemo';

export default function Lesson1_1() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="1" title="What is React & Why Use It?" />

      <Section title="🎯 The Big Idea">
        <p className="leading-relaxed text-base-content/70">
          React lets you describe <strong className="text-primary">what</strong> your UI should look
          like, not <strong className="text-accent">how</strong> to build it step by step. This is
          called <em>declarative programming</em>.
        </p>
      </Section>

      <Section title="⚔️ Imperative vs Declarative">
        <ComparisonDemo />
      </Section>

      <Section title="🧱 Components in Action">
        <p className="leading-relaxed text-base-content/70 mb-6">
          Everything you see on this page is built from{' '}
          <strong className="text-primary">components</strong>. Components can contain other
          components - this is called <strong className="text-success">composition</strong>.
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
