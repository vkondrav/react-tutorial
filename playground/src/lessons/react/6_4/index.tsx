// ============================================
// Lesson 6.4: Compound Components
// ============================================

import {
  HiOutlinePuzzle,
  HiOutlineCollection,
  HiOutlineTemplate,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import CompoundBasicsDemo from './CompoundBasicsDemo';
import ContextPatternDemo from './ContextPatternDemo';
import FlexibleAPIDemo from './FlexibleAPIDemo';
import CompoundPlayground from './CompoundPlayground';

export default function Lesson6_4(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="6" lesson="4" title="Compound Components" />

      {/* Section 1: What are Compound Components? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePuzzle className="text-primary" size={20} />
            What are Compound Components?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">Compound components</strong> are a pattern where multiple
          components work together to form a{' '}
          <strong className="text-secondary">cohesive unit</strong>. Think of HTML's{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="text-accent">&lt;select&gt;</code> and{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="text-accent">&lt;option&gt;</code> — they only make sense together!
        </p>
        <CompoundBasicsDemo />
      </Section>

      {/* Section 2: The Context Pattern */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCollection className="text-primary" size={20} />
            Sharing State with Context
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Compound components use <strong className="text-primary">React Context</strong> to share
          state implicitly between parent and children — no props drilling required!
        </p>
        <ContextPatternDemo />
      </Section>

      {/* Section 3: Flexible API Design */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTemplate className="text-primary" size={20} />
            Flexible API Design
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Compound components give users <strong className="text-primary">flexibility</strong> in
          how they structure their UI while keeping the logic encapsulated.
        </p>
        <FlexibleAPIDemo />
      </Section>

      {/* Section 4: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Compound Components Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Build and explore real compound component patterns:{' '}
          <strong className="text-primary">Tabs</strong>,{' '}
          <strong className="text-secondary">Accordion</strong>, and{' '}
          <strong className="text-accent">Menu</strong>.
        </p>
        <CompoundPlayground />
      </Section>

      {/* Takeaways */}
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
            'Compound components are multiple components that work together as a unit',
            'Use Context to share implicit state between parent and children',
            'Attach sub-components as static properties: Tabs.Panel, Accordion.Item',
            'Give users flexibility in layout while keeping logic encapsulated',
            'Great for: tabs, accordions, menus, forms, modals, cards',
            'Provides cleaner API than passing complex config objects as props',
            'Combine with TypeScript for excellent developer experience',
          ]}
        />
      </Section>
    </div>
  );
}
