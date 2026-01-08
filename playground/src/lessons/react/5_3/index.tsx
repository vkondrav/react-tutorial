// ============================================
// Lesson 5.3: Handling Multiple Inputs
// ============================================

import {
  HiOutlineCollection,
  HiOutlineTag,
  HiOutlinePlusSm,
  HiOutlineTemplate,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import SingleStateDemo from './SingleStateDemo';
import NameAttributeDemo from './NameAttributeDemo';
import DynamicFieldsDemo from './DynamicFieldsDemo';
import FormPatternsDemo from './FormPatternsDemo';
import MultiInputPlayground from './MultiInputPlayground';

export default function Lesson5_3(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="5" lesson="3" title="Handling Multiple Inputs" />

      {/* Section 1: Single State Object */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCollection className="text-primary" size={20} />
            Managing Multiple Inputs with One State
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Instead of creating separate <code className="text-secondary">useState</code> for each
          field, use a <strong className="text-primary">single state object</strong>. This scales
          better and keeps related data together.
        </p>
        <SingleStateDemo />
      </Section>

      {/* Section 2: Name Attribute */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTag className="text-primary" size={20} />
            The Name Attribute Pattern
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          The <code className="text-secondary">name</code> attribute identifies which field changed.
          Combined with <strong className="text-primary">computed property names</strong>, you can
          handle all inputs with a single function.
        </p>
        <NameAttributeDemo />
      </Section>

      {/* Section 3: Dynamic Fields */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePlusSm className="text-primary" size={20} />
            Dynamic Form Fields
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Sometimes you need to <strong className="text-primary">add or remove</strong> fields
          dynamically — like adding multiple phone numbers, addresses, or team members.
        </p>
        <DynamicFieldsDemo />
      </Section>

      {/* Section 4: Form Patterns */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTemplate className="text-primary" size={20} />
            Common Form Patterns
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Learn patterns for handling <strong className="text-primary">nested objects</strong>,{' '}
          <strong className="text-secondary">arrays of items</strong>, and{' '}
          <strong className="text-accent">form reset</strong>.
        </p>
        <FormPatternsDemo />
      </Section>

      {/* Section 5: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Multi-Input Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Build a complete form with multiple inputs! This contact form demonstrates all the
          patterns: object state, name attributes, and dynamic fields.
        </p>
        <MultiInputPlayground />
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
            'Use a single state object for forms with multiple related fields',
            'The name attribute identifies which field changed in onChange',
            'Computed property names [e.target.name] enable one handler for all inputs',
            'Spread operator { ...prev, [name]: value } preserves other fields',
            'For checkboxes, use e.target.checked instead of e.target.value',
            'Dynamic fields use array state with add/remove operations',
            'Always generate unique keys for dynamic fields (not index!)',
          ]}
        />
      </Section>
    </div>
  );
}
