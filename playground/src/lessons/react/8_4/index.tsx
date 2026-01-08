// ============================================
// Lesson 8.4: RSC - Intro to React Server Components
// ============================================

import {
  HiOutlineServer,
  HiOutlineDesktopComputer,
  HiOutlineSwitchHorizontal,
  HiOutlineLightningBolt,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import RSCBasicsDemo from './RSCBasicsDemo';
import ServerVsClientDemo from './ServerVsClientDemo';
import UseClientDirectiveDemo from './UseClientDirectiveDemo';
import RSCBenefitsDemo from './RSCBenefitsDemo';
import RSCPlayground from './RSCPlayground';

export default function Lesson8_4(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="8" lesson="4" title="RSC: Intro to React Server Components" />

      {/* Section 1: What are RSC? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineServer className="text-primary" size={20} />
            What are React Server Components?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">React Server Components (RSC)</strong> are a new paradigm
          where components can run{' '}
          <strong className="text-secondary">exclusively on the server</strong>. Unlike SSR where
          all components run on both server and client, RSC components never ship JavaScript to the
          browser — they render to HTML and that's it.
        </p>
        <RSCBasicsDemo />
      </Section>

      {/* Section 2: Server vs Client Components */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="text-primary" size={20} />
            Server vs Client Components
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          In the RSC model, components are{' '}
          <strong className="text-primary">Server Components</strong> by default. To make a
          component interactive (with state, effects, or event handlers), you must explicitly mark
          it as a <strong className="text-secondary">Client Component</strong>.
        </p>
        <ServerVsClientDemo />
      </Section>

      {/* Section 3: The "use client" Directive */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineDesktopComputer className="text-primary" size={20} />
            The "use client" Directive
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          The <code className="text-secondary">"use client"</code> directive marks the boundary
          between server and client code. When you add it at the top of a file, that component and
          all its imports become part of the client bundle.
        </p>
        <UseClientDirectiveDemo />
      </Section>

      {/* Section 4: Benefits & Trade-offs */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            Benefits & Trade-offs
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          RSC offer significant advantages for data fetching and bundle size, but come with
          constraints. Understanding these trade-offs helps you decide when to use each type.
        </p>
        <RSCBenefitsDemo />
      </Section>

      {/* Section 5: RSC Patterns Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            RSC Patterns
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Explore common RSC patterns! These examples demonstrate how Server and Client Components
          work together in real applications.
        </p>
        <RSCPlayground />
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
            'React Server Components run exclusively on the server — no JS sent to client',
            'Components are Server Components by default in RSC-enabled frameworks',
            '"use client" marks a component as a Client Component',
            'Server Components can directly access databases, file systems, and APIs',
            'Server Components cannot use hooks (useState, useEffect) or event handlers',
            'Client Components can be children of Server Components, but not vice versa',
            'RSC reduce bundle size by keeping heavy dependencies server-side',
            'async/await works directly in Server Components for data fetching',
            'Props passed from Server → Client must be serializable (no functions)',
            'Next.js App Router and other frameworks provide RSC support',
          ]}
        />
      </Section>
    </div>
  );
}
