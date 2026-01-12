// ============================================
// CSS Module 4, Lesson 2: Methodologies (BEM & Utility)
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineTemplate,
  HiOutlineScale,
  HiOutlineSparkles,
  HiOutlineSwitchHorizontal,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import BEMBasicsDemo from './BEMBasicsDemo';
import SpecificityComparisonDemo from './SpecificityComparisonDemo';
import UtilityFirstDemo from './UtilityFirstDemo';
import ApproachComparisonDemo from './ApproachComparisonDemo';

export default function CSSLesson4_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="4" lesson="2" title="Methodologies (BEM & Utility)" />

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
          CSS is easy to write but hard to{' '}
          <strong className="text-primary">maintain at scale</strong>. Without conventions,
          stylesheets become tangled messes of specificity wars and override chains.{' '}
          <strong className="text-warning">Methodologies</strong> provide naming rules that keep CSS
          predictable.
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          We'll explore two dominant approaches: <strong className="text-success">BEM</strong>{' '}
          (semantic class naming) and <strong className="text-accent">Utility-First</strong> (atomic
          single-purpose classes). Understanding both helps you choose the right tool for each
          project.
        </p>
      </Section>

      {/* Section 2: BEM Basics */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTemplate className="text-primary" size={20} />
            BEM: Block__Element--Modifier
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          <strong className="text-primary">BEM</strong> stands for{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">Block__Element--Modifier</code>.
          This strict naming convention creates{' '}
          <strong className="text-success">self-documenting</strong> class names that reveal
          structure at a glance.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          The pattern: <code className="bg-base-200 px-2 py-0.5 rounded text-sm">.card</code> is a
          {/* eslint-disable-next-line local/no-raw-code-element */}
          Block, <code className="bg-base-200 px-2 py-0.5 rounded text-sm">.card__title</code> is an
          {/* eslint-disable-next-line local/no-raw-code-element */}
          Element, <code className="bg-base-200 px-2 py-0.5 rounded text-sm">
            .card--featured
          </code>{' '}
          is a Modifier.
        </p>
        <BEMBasicsDemo />
      </Section>

      {/* Section 3: Specificity Benefits */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineScale className="text-primary" size={20} />
            Flat Specificity
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          The magic of BEM: every selector has{' '}
          <strong className="text-success">exactly the same specificity</strong>. No more wrestling
          with nested selectors or adding IDs to "win" the cascade.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Traditional CSS often ends in <strong className="text-error">specificity wars</strong>—
          each override requires higher specificity until you're forced to use{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">!important</code>. BEM avoids
          this by keeping everything flat.
        </p>
        <SpecificityComparisonDemo />
      </Section>

      {/* Section 4: Utility-First CSS */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSparkles className="text-primary" size={20} />
            Utility-First CSS
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          <strong className="text-primary">Utility-First</strong> (or Atomic CSS) takes a different
          approach: instead of semantic names, use{' '}
          <strong className="text-success">single-purpose classes</strong> like{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">.flex</code>,{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">.p-4</code>,{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">.text-center</code>.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          This is the philosophy behind <strong className="text-accent">Tailwind CSS</strong>: style
          directly in HTML, avoid context-switching to CSS files, and never worry about naming
          again.
        </p>
        <UtilityFirstDemo />
      </Section>

      {/* Section 5: Comparing Approaches */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="text-primary" size={20} />
            Choosing Your Approach
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          Neither approach is "better"—they're <strong className="text-primary">trade-offs</strong>.
          BEM excels at large codebases with multiple developers. Utility-first shines for rapid
          prototyping and component-based frameworks.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Many teams use a <strong className="text-accent">hybrid approach</strong>: BEM for
          component structure, utilities for spacing and layout adjustments.
        </p>
        <ApproachComparisonDemo />
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
            'BEM uses .block__element--modifier naming for clear structure',
            'Block = standalone component, Element = child of block, Modifier = variant',
            'BEM keeps specificity flat: all selectors are single class (0,1,0)',
            'Flat specificity eliminates cascade conflicts and !important abuse',
            'Utility-first uses atomic classes: each class does one thing',
            'Tailwind popularized utility-first with responsive variants',
            'Utility-first: faster prototyping, but longer HTML class lists',
            'Hybrid approach: BEM for structure, utilities for spacing/layout',
          ]}
        />
      </Section>
    </div>
  );
}
