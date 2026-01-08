// ============================================
// Lesson 6.1: Component Composition
// ============================================

import {
  HiOutlinePuzzle,
  HiOutlineViewGrid,
  HiOutlineTemplate,
  HiOutlineColorSwatch,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import WhyCompositionDemo from './WhyCompositionDemo';
import ChildrenPropDemo from './ChildrenPropDemo';
import SlotPatternDemo from './SlotPatternDemo';
import SpecializationDemo from './SpecializationDemo';
import CompositionPlayground from './CompositionPlayground';

export default function Lesson6_1(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="6" lesson="1" title="Component Composition" />

      {/* Section 1: Why Composition? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePuzzle className="text-primary" size={20} />
            Why Composition Over Inheritance?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          React favors <strong className="text-primary">composition</strong> over class inheritance.
          Instead of creating complex component hierarchies, you{' '}
          <strong className="text-secondary">compose</strong> small, focused components together
          like building blocks.
        </p>
        <WhyCompositionDemo />
      </Section>

      {/* Section 2: Children Prop */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineViewGrid className="text-primary" size={20} />
            The Children Prop
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          The <code className="text-secondary">children</code> prop is React's built-in way to pass
          content between opening and closing tags. It's the foundation of{' '}
          <strong className="text-primary">containment</strong> patterns.
        </p>
        <ChildrenPropDemo />
      </Section>

      {/* Section 3: Slot Pattern */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTemplate className="text-primary" size={20} />
            The Slot Pattern
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          When you need <strong className="text-primary">multiple insertion points</strong>, use
          named props instead of just children. This gives you{' '}
          <strong className="text-secondary">precise control</strong> over where content appears.
        </p>
        <SlotPatternDemo />
      </Section>

      {/* Section 4: Specialization */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineColorSwatch className="text-primary" size={20} />
            Specialization Pattern
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Create <strong className="text-primary">specialized versions</strong> of generic
          components by wrapping them with pre-configured props. This is composition in action!
        </p>
        <SpecializationDemo />
      </Section>

      {/* Section 5: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Composition Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Build a real component library using composition! Create{' '}
          <strong className="text-primary">flexible, reusable components</strong> that can be
          combined in different ways.
        </p>
        <CompositionPlayground />
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
            'React favors composition over inheritance - build up, not down',
            'The children prop enables containment - wrap content in reusable containers',
            'Use named props (slots) when you need multiple insertion points',
            'Specialization creates specific components from generic ones',
            'Props can accept any type including JSX elements and components',
            'Composition leads to more flexible and reusable components',
            'Think of components as LEGO blocks that snap together',
          ]}
        />
      </Section>
    </div>
  );
}
