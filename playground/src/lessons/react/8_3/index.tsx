// ============================================
// Lesson 8.3: Server State Management with TanStack Query
// ============================================

import {
  HiOutlineDatabase,
  HiOutlineRefresh,
  HiOutlineLightningBolt,
  HiOutlinePencilAlt,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList, CodeSnippet } from '@components';
import QueryBasicsDemo from './QueryBasicsDemo';
import QueryStatesDemo from './QueryStatesDemo';
import MutationsDemo from './MutationsDemo';
import QueryPlayground from './QueryPlayground';
import fullQueryPatternCode from './examples/FullQueryPattern.tsx?raw';

export default function Lesson8_3(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="8" lesson="3" title="Server State with TanStack Query" />

      {/* Section 1: Why TanStack Query? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineDatabase className="text-primary" size={20} />
            Why TanStack Query?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">TanStack Query</strong> (formerly React Query) transforms
          how you handle server state. Instead of manually managing loading, error, and caching
          logic, it handles all of this declaratively.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-error mb-2">Manual useEffect Fetching</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Manual loading/error state</li>
              <li>• No automatic caching</li>
              <li>• Manual refetch logic</li>
              <li>• Race conditions to handle</li>
              <li>• Duplicate requests</li>
            </ul>
          </div>
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-success mb-2">TanStack Query</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Automatic state management</li>
              <li>• Smart caching & deduplication</li>
              <li>• Background refetching</li>
              <li>• Race conditions solved</li>
              <li>• Optimistic updates</li>
            </ul>
          </div>
        </div>
        <QueryBasicsDemo />
      </Section>

      {/* Section 2: Query States & Caching */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineRefresh className="text-primary" size={20} />
            Query States & Caching
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          TanStack Query distinguishes between <strong className="text-primary">stale</strong> and{' '}
          <strong className="text-primary">fresh</strong> data. Stale data is shown instantly while
          fresh data is fetched in the background — giving you the best of both worlds.
        </p>
        <QueryStatesDemo />
      </Section>

      {/* Section 3: Mutations */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePencilAlt className="text-primary" size={20} />
            Mutations & Cache Updates
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">Mutations</strong> handle POST, PUT, DELETE operations.
          After a mutation succeeds, you can invalidate queries to refetch fresh data, or
          optimistically update the cache for instant UI feedback.
        </p>
        <MutationsDemo />
      </Section>

      {/* Section 4: Interactive Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            TanStack Query Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Experiment with TanStack Query's features! These demos show real-world patterns you'll use
          in production applications.
        </p>
        <QueryPlayground />
      </Section>

      {/* Section 5: The Complete Pattern */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            The Complete TanStack Query Pattern
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Here's a complete example showing queries, mutations, and cache invalidation working
          together:
        </p>
        <CodeSnippet
          title="Complete TanStack Query Pattern"
          language="tsx"
          code={fullQueryPatternCode}
        />
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
            'TanStack Query handles loading, error, and caching automatically',
            'useQuery for GET requests — reads data from server',
            'useMutation for POST/PUT/DELETE — modifies data on server',
            'queryKey uniquely identifies cached data (e.g., ["users", userId])',
            'staleTime controls how long data is considered "fresh"',
            'invalidateQueries refetches data after mutations',
            'isLoading (first load) vs isFetching (any fetch, including background)',
            'Deduplication: same queryKey only fetches once across components',
            'Error retry is automatic (3 times by default)',
            'DevTools help debug query state during development',
          ]}
        />
      </Section>
    </div>
  );
}
