// ============================================
// Module 1, Lesson 3: Understanding JSX
// ============================================

import {
  HiOutlineQuestionMarkCircle,
  HiOutlineSwitchHorizontal,
  HiOutlineCode,
  HiOutlineDocumentText,
  HiOutlineExclamationCircle,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import JSXTransformDemo from './JSXTransformDemo';
import DifferencesExplorer from './DifferencesExplorer';
import EmbeddingDemo from './EmbeddingDemo';
import JSXRulesDemo from './JSXRulesDemo';
import MistakesQuiz from './MistakesQuiz';
import JSXPlayground from './JSXPlayground';
import TSXDemo from './TSXDemo';

export default function Lesson1_3(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="3" title="Understanding JSX" />

      {/* Section 1: What is JSX? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineQuestionMarkCircle className="text-primary" size={20} />
            What is JSX?
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          <strong className="text-primary">JSX</strong> (JavaScript XML) lets you write HTML-like
          code inside JavaScript. It's not actually HTML - it gets transformed into JavaScript
          function calls!
        </p>
        <JSXTransformDemo />
      </Section>

      {/* Section 2: JSX vs HTML Differences */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="text-primary" size={20} />
            JSX vs HTML Differences
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-6">
          JSX looks like HTML but has important differences. Click each difference to learn more:
        </p>
        <DifferencesExplorer />
      </Section>

      {/* Section 3: Embedding JavaScript */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCode className="text-primary" size={20} />
            Embedding JavaScript
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-6">
          Use curly braces{' '}
          <code className="bg-base-300 px-2 py-0.5 rounded text-warning">{'{}'}</code> to embed any
          JavaScript expression in JSX:
        </p>
        <EmbeddingDemo />
      </Section>

      {/* Section 4: The 3 JSX Rules */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineDocumentText className="text-primary" size={20} />
            The 3 JSX Rules
          </span>
        }
      >
        <JSXRulesDemo />
      </Section>

      {/* Section 5: Common Mistakes */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineExclamationCircle className="text-primary" size={20} />
            Common Mistakes
          </span>
        }
      >
        <MistakesQuiz />
      </Section>

      {/* Section 6: JSX Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            JSX Playground
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          Experiment with JSX! Edit the values and see the output change in real-time:
        </p>
        <JSXPlayground />
      </Section>

      {/* Section 7: What About TSX? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSparkles className="text-primary" size={20} />
            What About TSX?
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          <strong className="text-success">TSX</strong> is JSX for TypeScript files. The syntax is
          identical — you just get the bonus of type safety!
        </p>
        <TSXDemo />
      </Section>

      {/* Section 8: Key Takeaways */}
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
            'JSX is syntactic sugar for React.createElement() calls',
            'Use className instead of class, htmlFor instead of for',
            'Embed JavaScript expressions with curly braces { }',
            'Every JSX expression must have ONE root element (use <> fragments)',
            'All tags must be closed, including self-closing ones like <img />',
            'Use camelCase for attributes: onClick, tabIndex, autoFocus',
            'TSX = JSX + TypeScript — same syntax with added type safety',
          ]}
        />
      </Section>
    </div>
  );
}
