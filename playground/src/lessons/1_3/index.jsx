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
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="3" title="Understanding JSX" />

      <Section title="🤔 What is JSX?">
        <p className="leading-relaxed text-slate-400 mb-4">
          <strong className="text-cyan-400">JSX</strong> (JavaScript XML) lets you write
          HTML-like code inside JavaScript. It's not actually HTML - it gets transformed into
          JavaScript function calls!
        </p>
        <JSXTransformDemo />
      </Section>

      <Section title="🆚 JSX vs HTML Differences">
        <p className="leading-relaxed text-slate-400 mb-6">
          JSX looks like HTML but has important differences. Click each difference to learn more:
        </p>
        <DifferencesExplorer />
      </Section>

      <Section title="🔀 Embedding JavaScript">
        <p className="leading-relaxed text-slate-400 mb-6">
          Use curly braces{' '}
          <code className="bg-slate-700 px-2 py-0.5 rounded text-amber-400">{'{}'}</code>{' '}
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
        <p className="leading-relaxed text-slate-400 mb-4">
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
