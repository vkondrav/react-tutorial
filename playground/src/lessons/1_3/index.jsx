// Module 1, Lesson 3: Understanding JSX

import { LessonHeader, Section, TakeawayList } from '../components';
import JSXTransformDemo from './JSXTransformDemo';
import DifferencesExplorer from './DifferencesExplorer';
import EmbeddingDemo from './EmbeddingDemo';
import JSXRulesDemo from './JSXRulesDemo';
import MistakesQuiz from './MistakesQuiz';
import JSXPlayground from './JSXPlayground';

export default function Lesson1_3() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <LessonHeader module="1" lesson="3" title="Understanding JSX" />

      <Section title="🤔 What is JSX?">
        <p style={{ lineHeight: 1.8, color: '#94a3b8', marginBottom: '1rem' }}>
          <strong style={{ color: '#38bdf8' }}>JSX</strong> (JavaScript XML) lets you write
          HTML-like code inside JavaScript. It's not actually HTML - it gets transformed into
          JavaScript function calls!
        </p>
        <JSXTransformDemo />
      </Section>

      <Section title="🆚 JSX vs HTML Differences">
        <p style={{ lineHeight: 1.8, color: '#94a3b8', marginBottom: '1.5rem' }}>
          JSX looks like HTML but has important differences. Click each difference to learn more:
        </p>
        <DifferencesExplorer />
      </Section>

      <Section title="🔀 Embedding JavaScript">
        <p style={{ lineHeight: 1.8, color: '#94a3b8', marginBottom: '1.5rem' }}>
          Use curly braces{' '}
          <code
            style={{
              backgroundColor: '#334155',
              padding: '0.125rem 0.5rem',
              borderRadius: '0.25rem',
              color: '#fbbf24',
            }}
          >
            {'{}'}
          </code>{' '}
          to embed any JavaScript expression in JSX:
        </p>
        <EmbeddingDemo />
      </Section>

      <Section title="📏 The 3 JSX Rules">
        <JSXRulesDemo />
      </Section>

      <Section title="⚠️ Common Mistakes">
        <MistakesQuiz />
      </Section>

      <Section title="🧪 JSX Playground">
        <p style={{ lineHeight: 1.8, color: '#94a3b8', marginBottom: '1rem' }}>
          Experiment with JSX! Edit the values and see the output change in real-time:
        </p>
        <JSXPlayground />
      </Section>

      <Section title="✅ Key Takeaways">
        <TakeawayList
          items={[
            'JSX is syntactic sugar for React.createElement() calls',
            'Use className instead of class, htmlFor instead of for',
            'Embed JavaScript expressions with curly braces { }',
            'Every JSX expression must have ONE root element (use <> fragments)',
            'All tags must be closed, including self-closing ones like <img />',
            'Use camelCase for attributes: onClick, tabIndex, autoFocus',
          ]}
        />
      </Section>
    </div>
  );
}
