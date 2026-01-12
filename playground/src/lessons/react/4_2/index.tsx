// ============================================
// Lesson 4.2: Loading, Error & Empty States
// ============================================

import {
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
  HiOutlineInbox,
  HiOutlineTemplate,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import LoadingStatesDemo from './LoadingStatesDemo';
import ErrorStatesDemo from './ErrorStatesDemo';
import EmptyStatesDemo from './EmptyStatesDemo';
import StateCompositionDemo from './StateCompositionDemo';
import StatesPlayground from './StatesPlayground';

export default function Lesson4_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="4" lesson="2" title="Loading, Error & Empty States" />

      {/* Section 1: Loading States */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineRefresh className="text-primary" size={20} />
            Loading States
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Users need feedback while waiting for data. Good loading states prevent confusion and make
          your app feel <strong className="text-primary">responsive</strong>. The key patterns are{' '}
          <strong className="text-secondary">spinners</strong>,{' '}
          <strong className="text-secondary">skeletons</strong>, and{' '}
          <strong className="text-secondary">progress indicators</strong>.
        </p>
        <LoadingStatesDemo />
      </Section>

      {/* Section 2: Error States */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineExclamationCircle className="text-primary" size={20} />
            Error States
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Things go wrong — networks fail, servers error, data is invalid. Good error handling shows{' '}
          <strong className="text-primary">what happened</strong> and{' '}
          <strong className="text-primary">what to do next</strong>. Always give users a path
          forward.
        </p>
        <ErrorStatesDemo />
      </Section>

      {/* Section 3: Empty States */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineInbox className="text-primary" size={20} />
            Empty States
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Empty states happen when there's no data to show. They're opportunities to{' '}
          <strong className="text-primary">guide users</strong> — explain why it's empty and what
          they can do. Great empty states turn dead ends into starting points.
        </p>
        <EmptyStatesDemo />
      </Section>

      {/* Section 4: Composing States */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTemplate className="text-primary" size={20} />
            Composing States
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Real components need to handle <strong className="text-primary">all three states</strong>{' '}
          gracefully. The order of conditionals matters: typically{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="text-secondary">loading → error → empty → data</code>.
        </p>
        <StateCompositionDemo />
      </Section>

      {/* Section 5: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            States Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Practice building UIs that handle all states! Simulate different scenarios and see how
          your components respond.
        </p>
        <StatesPlayground />
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
            'Loading states: Use skeletons for predictable content, spinners for unknown duration',
            'Error states: Always explain what happened and provide a retry option',
            'Empty states: Distinguish between "no data yet" and "no results found"',
            'Check states in order: loading → error → empty → data',
            'Keep loading states visible for at least 200-300ms to avoid flicker',
            'Use optimistic UI updates for better perceived performance',
            'Test your states! Simulate slow networks and errors during development',
          ]}
        />
      </Section>
    </div>
  );
}
