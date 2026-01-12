// ============================================
// CSS Module 1, Lesson 2: Cascade, Specificity & Inheritance
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineScale,
  HiOutlineCalculator,
  HiOutlineExclamation,
  HiOutlineLink,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import CascadeOriginsDemo from './CascadeOriginsDemo';
import SpecificityCalculatorDemo from './SpecificityCalculatorDemo';
import ImportantDemo from './ImportantDemo';
import InheritanceDemo from './InheritanceDemo';

export default function CSSLesson1_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="2" title="Cascade, Specificity & Inheritance" />

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
          When multiple CSS rules target the same element, which one wins? The browser uses a{' '}
          <strong className="text-primary">cascade algorithm</strong> that considers three factors:{' '}
          <em className="text-accent">origin</em>, <em className="text-accent">specificity</em>, and{' '}
          <em className="text-accent">order</em>.
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          Understanding the cascade is essential for debugging CSS and writing predictable
          stylesheets.
        </p>
      </Section>

      {/* Section 2: The Three Origins */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineScale className="text-primary" size={20} />
            The Three Style Origins
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-6">
          Styles don't just come from your CSS files. Every webpage has{' '}
          <strong className="text-primary">three sources</strong> of styles that compete for
          control.
        </p>
        <CascadeOriginsDemo />
      </Section>

      {/* Section 3: Specificity */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCalculator className="text-primary" size={20} />
            Specificity: The Tiebreaker
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          When rules from the same origin conflict,{' '}
          <strong className="text-primary">specificity</strong> determines the winner. Think of it
          as a scoring system: {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">(ID, Class, Element)</code>.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Higher scores always win. If scores tie, the <em>last rule</em> in the stylesheet wins.
        </p>
        <SpecificityCalculatorDemo />
      </Section>

      {/* Section 4: !important */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineExclamation className="text-primary" size={20} />
            The !important Escape Hatch
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          The <code className="bg-base-200 px-2 py-0.5 rounded text-sm text-error">
            !important
          </code>{' '}
          declaration is a nuclear option that overrides normal specificity rules. It's powerful but
          dangerous—overuse leads to <strong className="text-error">specificity wars</strong> and
          unmaintainable CSS.
        </p>
        <ImportantDemo />
      </Section>

      {/* Section 5: Inheritance */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLink className="text-primary" size={20} />
            Inheritance: Styles That Flow Down
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          Some CSS properties are automatically <strong className="text-primary">inherited</strong>{' '}
          from parent to child elements. Others must be explicitly set on each element.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Generally, <span className="text-success">text-related properties inherit</span> while{' '}
          <span className="text-warning">box-model properties don't</span>.
        </p>
        <InheritanceDemo />
      </Section>

      {/* Section 6: Key Takeaways */}
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
            'Styles come from 3 origins: User Agent (browser), User (OS/extensions), Author (you)',
            'Specificity is scored as (ID, Class, Element) — higher numbers win',
            'Inline styles beat IDs, IDs beat classes, classes beat elements',
            '!important overrides specificity but creates maintenance nightmares',
            'Text properties (color, font) inherit; box properties (margin, padding) do not',
            'Use inherit, initial, unset, and revert to control inheritance explicitly',
          ]}
        />
      </Section>
    </div>
  );
}
