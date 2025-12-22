// ============================================
// Lesson 2.4: Conditional Rendering
// ============================================

import { LessonHeader, Section, TakeawayList } from '../components';
import ConditionalBasicsDemo from './ConditionalBasicsDemo';
import TernaryDemo from './TernaryDemo';
import LogicalAndDemo from './LogicalAndDemo';
import PatternComparisonDemo from './PatternComparisonDemo';
import ConditionalPlayground from './ConditionalPlayground';

export default function Lesson2_4() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <LessonHeader 
        module="2" 
        lesson="4" 
        title="Conditional Rendering" 
      />
      
      {/* Section 1: Concept Introduction */}
      <Section title="📖 What is Conditional Rendering?">
        <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
          In React, you often need to <strong>show or hide</strong> parts of your UI based on conditions.
          This is called <em>conditional rendering</em> — deciding what to render based on state, props, or any expression.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
          Just like JavaScript has <code>if</code>, <code>? :</code>, and <code>&&</code> for conditionals,
          React uses these same operators inside JSX. The difference? You're deciding what <em>UI</em> to show!
        </p>
        <ConditionalBasicsDemo />
      </Section>

      {/* Section 2: Ternary Operator */}
      <Section title="🔀 The Ternary Operator">
        <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
          The <strong>ternary operator</strong> (<code>condition ? ifTrue : ifFalse</code>) is the most common
          way to conditionally render in React. It's perfect for "either this OR that" situations.
        </p>
        <TernaryDemo />
      </Section>

      {/* Section 3: Logical && */}
      <Section title="✨ Short-Circuit with &&">
        <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
          When you only want to show something <em>if a condition is true</em> (and nothing otherwise),
          the <strong>logical AND</strong> (<code>&&</code>) operator is your friend!
        </p>
        <LogicalAndDemo />
      </Section>

      {/* Section 4: Pattern Comparison */}
      <Section title="🎯 Choosing the Right Pattern">
        <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
          There are several ways to conditionally render. Each has its place.
          Let's compare them side-by-side!
        </p>
        <PatternComparisonDemo />
      </Section>

      {/* Section 5: Interactive Playground */}
      <Section title="🎮 Conditional Rendering Playground">
        <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
          Practice building conditional UIs! Try different patterns and see the results.
        </p>
        <ConditionalPlayground />
      </Section>

      {/* Takeaways */}
      <Section title="✅ Key Takeaways">
        <TakeawayList items={[
          "Ternary (? :) is best for showing one thing OR another",
          "&& is best for showing something OR nothing",
          "Early returns clean up complex conditions in component functions",
          "Avoid deeply nested ternaries — extract to variables or components",
          "null, undefined, and false render nothing in JSX (but 0 renders '0'!)"
        ]} />
      </Section>
    </div>
  );
}

