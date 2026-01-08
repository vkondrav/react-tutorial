// ============================================
// CSS Module 1, Lesson 1: Syntax, Parsing & The DOM
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineCollection,
  HiOutlineLightningBolt,
  HiOutlineSparkles,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import SelectorMatchingDemo from './SelectorMatchingDemo';
import SelectorPerformanceDemo from './SelectorPerformanceDemo';
import PseudoDemo from './PseudoDemo';

export default function CSSLesson1_1(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="1" title="Syntax, Parsing & The DOM" />

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
          CSS isn't just a list of styles—it's a{' '}
          <strong className="text-primary">matching algorithm</strong>. The browser reads your CSS,
          walks the DOM tree, and for each element asks:{' '}
          <em className="text-accent">"Do any selectors match this node?"</em>
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          Understanding this matching process is the key to writing efficient, predictable CSS.
        </p>
      </Section>

      {/* Section 2: How Selectors Match the DOM */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCollection className="text-primary" size={20} />
            How Selectors Match the DOM
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-6">
          The DOM (Document Object Model) is a tree of nodes. CSS selectors describe{' '}
          <strong className="text-primary">patterns</strong> that match specific nodes in this tree.
          When a selector matches, its styles are applied.
        </p>
        <SelectorMatchingDemo />
      </Section>

      {/* Section 3: Selector Performance */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            Selector Performance: Right-to-Left Parsing
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-6">
          Here's a secret: browsers parse selectors{' '}
          <strong className="text-warning">right-to-left</strong>. For the selector{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">.nav ul li a</code>, the browser
          first finds <em>all</em> <code className="text-primary">&lt;a&gt;</code> elements, then
          checks if each has a <code className="text-primary">&lt;li&gt;</code> parent, and so on.
        </p>
        <SelectorPerformanceDemo />
      </Section>

      {/* Section 4: Pseudo-classes vs Pseudo-elements */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSparkles className="text-primary" size={20} />
            Pseudo-classes vs Pseudo-elements
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          <strong className="text-primary">Pseudo-classes</strong> (single colon) select elements in
          a specific <em>state</em>—like{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">:hover</code>,{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">:focus</code>, or{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">:first-child</code>.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          <strong className="text-secondary">Pseudo-elements</strong> (double colon) create{' '}
          <em>virtual elements</em> that don't exist in your HTML—like{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">::before</code>,{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">::after</code>, or{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">::first-letter</code>.
        </p>
        <PseudoDemo />
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
            'CSS works by matching selectors to nodes in the DOM tree',
            'Browsers parse selectors right-to-left—keep rightmost selectors specific',
            'Avoid universal selectors (*) and overly complex descendant chains',
            'Pseudo-classes (:hover) select STATE, pseudo-elements (::before) create CONTENT',
            'Use data-* attributes with ::after to build CSS-only tooltips',
          ]}
        />
      </Section>
    </div>
  );
}
