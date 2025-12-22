// ============================================
// Lesson 8.1: Server-Side Rendering
// ============================================

import {
  HiOutlineServer,
  HiOutlineLightningBolt,
  HiOutlineRefresh,
  HiOutlineQuestionMarkCircle,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import RenderingComparisonDemo from './RenderingComparisonDemo';
import HowSSRWorksDemo from './HowSSRWorksDemo';
import HydrationDemo from './HydrationDemo';
import WhenToUseSSRDemo from './WhenToUseSSRDemo';
import SSRPlayground from './SSRPlayground';

export default function Lesson8_1(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="8" lesson="1" title="Server-Side Rendering" />

      {/* Section 1: What is SSR? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineServer className="text-primary" size={20} />
            What is Server-Side Rendering?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">Server-Side Rendering (SSR)</strong> means generating
          HTML on the server instead of in the browser. Instead of sending an empty HTML file and
          waiting for JavaScript to render your content, SSR sends{' '}
          <strong className="text-secondary">fully-rendered HTML</strong> that users can see
          immediately.
        </p>
        <RenderingComparisonDemo />
      </Section>

      {/* Section 2: How SSR Works */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            How SSR Works
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          SSR involves a <strong className="text-primary">Node.js server</strong> that runs your
          React code to generate HTML. The process has distinct phases that work together to deliver
          a fast, interactive experience.
        </p>
        <HowSSRWorksDemo />
      </Section>

      {/* Section 3: Hydration */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineRefresh className="text-primary" size={20} />
            Hydration: Making HTML Interactive
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">Hydration</strong> is the process where React "attaches"
          to server-rendered HTML and makes it interactive. It's like giving life to a statue – the
          HTML already exists, React just adds the ability to respond to clicks and updates.
        </p>
        <HydrationDemo />
      </Section>

      {/* Section 4: When to Use SSR */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineQuestionMarkCircle className="text-primary" size={20} />
            When to Use SSR
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          SSR isn't always the right choice. It adds complexity and server costs. Use this decision
          framework to determine if SSR is right for your project.
        </p>
        <WhenToUseSSRDemo />
      </Section>

      {/* Section 5: Live SSR Demo */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Live SSR Demo
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          See SSR in action! This demo loads a page that was actually rendered on a Node.js server.
          Watch the hydration process and inspect the source to see real server-rendered HTML.
        </p>
        <SSRPlayground />
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
            'SSR renders React to HTML on the server, sending content immediately',
            'CSR (Client-Side Rendering) sends empty HTML and renders in the browser',
            'SSR improves SEO, First Contentful Paint, and social media previews',
            'Hydration attaches React to server-rendered HTML to make it interactive',
            'Use renderToString() or renderToPipeableStream() for SSR',
            'Use hydrateRoot() instead of createRoot() on the client',
            'SSR adds complexity – only use when benefits outweigh costs',
            'Frameworks like Next.js and Remix simplify SSR significantly',
          ]}
        />
      </Section>
    </div>
  );
}
