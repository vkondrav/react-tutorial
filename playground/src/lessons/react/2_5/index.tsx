// ============================================
// Lesson 2.5: Lists & Keys
// ============================================

import {
  HiOutlineViewList,
  HiOutlineKey,
  HiOutlineExclamationCircle,
  HiOutlineFilter,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import ListBasicsDemo from './ListBasicsDemo';
import KeysExplainedDemo from './KeysExplainedDemo';
import KeyMistakesDemo from './KeyMistakesDemo';
import ListOperationsDemo from './ListOperationsDemo';
import ListPlayground from './ListPlayground';

export default function Lesson2_5(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="2" lesson="5" title="Lists & Keys" />

      {/* Section 1: Rendering Lists with .map() */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineViewList className="text-primary" size={20} />
            Rendering Lists with .map()
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          In React, you'll often need to display <strong>collections of data</strong> — users,
          {/* eslint-disable-next-line local/no-raw-code-element */}
          products, messages, etc. The <code>.map()</code> method transforms an array of data into
          an array of JSX elements.
        </p>
        <ListBasicsDemo />
      </Section>

      {/* Section 2: Why Keys Matter */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineKey className="text-primary" size={20} />
            Why Keys Matter
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          When rendering lists, React needs a way to <strong>identify each item</strong>. The{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code>key</code> prop helps React track which items changed, were added, or removed —
          making updates efficient.
        </p>
        <KeysExplainedDemo />
      </Section>

      {/* Section 3: Common Key Mistakes */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineExclamationCircle className="text-primary" size={20} />
            Common Key Mistakes
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Not all keys are created equal! Using the wrong key can cause <strong>bugs</strong>,
          <strong>performance issues</strong>, and <strong>unexpected behavior</strong>. Let's see
          what to avoid.
        </p>
        <KeyMistakesDemo />
      </Section>

      {/* Section 4: List Operations */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineFilter className="text-primary" size={20} />
            Filtering, Sorting & Transforming
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Real apps don't just display lists — they <strong>filter</strong>, <strong>sort</strong>,
          {/* eslint-disable-next-line local/no-raw-code-element */}
          and <strong>transform</strong> them. Chain array methods before <code>.map()</code> to
          create dynamic list views.
        </p>
        <ListOperationsDemo />
      </Section>

      {/* Section 5: Interactive Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            List Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Build a complete todo list with add, remove, toggle, and filter functionality. See all the
          list concepts working together!
        </p>
        <ListPlayground />
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
            'Use .map() to transform arrays into JSX elements',
            'Always provide a unique, stable key prop to list items',
            'Use IDs from your data as keys (not array index)',
            'Index as key is OK only for static lists that never reorder',
            'Chain .filter(), .sort(), .map() for dynamic list views',
            'Keys help React identify which items changed for efficient updates',
          ]}
        />
      </Section>
    </div>
  );
}
