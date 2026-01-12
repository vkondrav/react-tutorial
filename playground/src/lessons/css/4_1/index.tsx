// ============================================
// CSS Module 4, Lesson 1: CSS Variables
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineVariable,
  HiOutlineMoon,
  HiOutlineCalculator,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import VariableScopeDemo from './VariableScopeDemo';
import ThemeSwitchDemo from './ThemeSwitchDemo';
import CalcDemo from './CalcDemo';

export default function CSSLesson4_1(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="4" lesson="1" title="CSS Variables" />

      {/* Section 1: The Big Idea */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightBulb className="text-primary" size={20} />
            The Big Idea
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70">
          CSS Variables (officially called{' '}
          <strong className="text-primary">Custom Properties</strong>) let you store values and
          reuse them throughout your stylesheet. Unlike preprocessor variables (Sass, Less), CSS
          variables are <strong className="text-success">live in the browser</strong>—they can be
          changed at runtime with JavaScript or media queries.
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          This makes them perfect for <strong className="text-accent">theming</strong>,{' '}
          <strong className="text-warning">responsive designs</strong>, and{' '}
          <strong className="text-secondary">component-scoped styling</strong>.
        </p>
      </Section>

      {/* Section 2: Variable Scope */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineVariable className="text-primary" size={20} />
            Scope: Global vs Local
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          Variables defined on {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">:root</code> are{' '}
          <strong className="text-success">global</strong>—available everywhere. Variables defined
          on a specific selector are <strong className="text-warning">local</strong>—only available
          to that element and its children.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          This follows CSS's normal cascade: child elements can{' '}
          <strong className="text-primary">override</strong> parent variables without affecting
          siblings.
        </p>
        <VariableScopeDemo />
      </Section>

      {/* Section 3: Theming */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineMoon className="text-primary" size={20} />
            Theming with CSS Variables
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          The killer feature: build a complete{' '}
          <strong className="text-primary">dark mode switch</strong> using only CSS variables and a
          single HTML attribute. No JavaScript manipulation of individual styles needed.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          The pattern: define theme colors as variables on{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">:root</code>, then override them
          with an attribute selector like {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">[data-theme="dark"]</code>.
        </p>
        <ThemeSwitchDemo />
      </Section>

      {/* Section 4: Calculations */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCalculator className="text-primary" size={20} />
            Calculations with calc()
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          CSS variables become even more powerful with{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">calc()</code>. Store a header
          height, then calculate the remaining viewport:{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">
            calc(100vh - var(--header-height))
          </code>
          .
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          You can even do math with unitless variables:{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">
            calc(var(--spacing) * 2)
          </code>{' '}
          for consistent spacing scales.
        </p>
        <CalcDemo />
      </Section>

      {/* Section 5: Key Takeaways */}
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
            'Declare with --name: value; Access with var(--name)',
            ':root variables are global; element variables are scoped',
            'Variables cascade: children inherit, can override',
            'Fallback values: var(--color, #000) uses #000 if --color is undefined',
            'Theme switching: define colors on :root, override with [data-theme="dark"]',
            'calc() works with variables: calc(100vh - var(--header-height))',
            'Variables are live: change with JS or media queries at runtime',
            'Use semantic names: --color-primary not --blue',
          ]}
        />
      </Section>
    </div>
  );
}
