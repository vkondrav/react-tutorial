// ============================================
// Lesson 5.2: Form Validation Patterns
// ============================================

import {
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineExclamationCircle,
  HiOutlineGlobeAlt,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import ValidationApproachesDemo from './ValidationApproachesDemo';
import ValidationRulesDemo from './ValidationRulesDemo';
import ErrorDisplayDemo from './ErrorDisplayDemo';
import AsyncValidationDemo from './AsyncValidationDemo';
import ValidationPlayground from './ValidationPlayground';

export default function Lesson5_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="5" lesson="2" title="Form Validation Patterns" />

      {/* Section 1: When to Validate */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineClock className="text-primary" size={20} />
            When to Validate: Timing Matters
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Validation can happen at different times:{' '}
          <strong className="text-primary">on submit</strong> (all at once),{' '}
          <strong className="text-secondary">on blur</strong> (when leaving a field), or{' '}
          <strong className="text-accent">on change</strong> (as you type). Each has trade-offs.
        </p>
        <ValidationApproachesDemo />
      </Section>

      {/* Section 2: Validation Rules */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineShieldCheck className="text-primary" size={20} />
            Common Validation Rules
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Most forms need similar validations: <strong className="text-primary">required</strong>{' '}
          fields, <strong className="text-secondary">length</strong> constraints,{' '}
          <strong className="text-accent">pattern</strong> matching, and{' '}
          <strong className="text-success">custom</strong> logic.
        </p>
        <ValidationRulesDemo />
      </Section>

      {/* Section 3: Displaying Errors */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineExclamationCircle className="text-primary" size={20} />
            Displaying Validation Errors
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          How you show errors affects user experience. Compare{' '}
          <strong className="text-primary">inline errors</strong>,{' '}
          <strong className="text-secondary">summary lists</strong>, and{' '}
          <strong className="text-accent">toast notifications</strong>.
        </p>
        <ErrorDisplayDemo />
      </Section>

      {/* Section 4: Async Validation */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineGlobeAlt className="text-primary" size={20} />
            Async Validation
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Some validations require a server check — like{' '}
          <strong className="text-primary">username availability</strong> or{' '}
          <strong className="text-secondary">email uniqueness</strong>. Learn to handle async
          validation with debouncing and loading states.
        </p>
        <AsyncValidationDemo />
      </Section>

      {/* Section 5: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Validation Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Practice building a complete validated form! This signup form combines all the patterns:
          required fields, patterns, async validation, and good error UX.
        </p>
        <ValidationPlayground />
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
            'On-blur validation balances UX (not too early) with feedback (not too late)',
            'Common rules: required, minLength/maxLength, pattern (regex), custom functions',
            'Show errors inline, next to the field — users find them faster',
            'Use "touched" state to avoid showing errors on pristine fields',
            'Debounce async validation to reduce server calls',
            'Always validate on both client AND server (client can be bypassed)',
            'Disable submit button while form is invalid or submitting',
          ]}
        />
      </Section>
    </div>
  );
}
