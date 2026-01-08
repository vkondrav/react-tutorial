// ============================================
// CSS Module 2, Lesson 4: Responsive Strategy
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineDeviceMobile,
  HiOutlineCode,
  HiOutlineScale,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import ViewportMetaDemo from './ViewportMetaDemo';
import MediaQueryDemo from './MediaQueryDemo';
import FluidTypographyDemo from './FluidTypographyDemo';

export default function CSSLesson2_4(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="2" lesson="4" title="Responsive Strategy" />

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
          Responsive design isn't about making things "work on mobile." It's about creating a{' '}
          <strong className="text-primary">single codebase</strong> that adapts fluidly across all
          screen sizes—from watches to 4K monitors.
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          The modern approach has three pillars:{' '}
          <strong className="text-success">viewport configuration</strong>,{' '}
          <strong className="text-warning">mobile-first media queries</strong>, and{' '}
          <strong className="text-accent">fluid typography</strong>. Master these, and you'll write
          less CSS while supporting more devices.
        </p>
      </Section>

      {/* Section 2: The Viewport Meta Tag */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineDeviceMobile className="text-primary" size={20} />
            The Viewport Meta Tag
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          Without the viewport meta tag, mobile browsers assume your site was designed for desktop
          and zoom out to show the full page at ~980px width. This makes everything tiny and
          unreadable.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          The <code className="bg-base-200 px-2 py-0.5 rounded text-sm">viewport</code> meta tag
          tells browsers to use the device's actual width and not to zoom out.
        </p>
        <ViewportMetaDemo />
      </Section>

      {/* Section 3: Media Query Ranges */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCode className="text-primary" size={20} />
            Media Queries: Mobile-First Strategy
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          There are two approaches to writing media queries:{' '}
          <strong className="text-error">desktop-first</strong> (using <code>max-width</code>) and{' '}
          <strong className="text-success">mobile-first</strong> (using <code>min-width</code>).
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Mobile-first is preferred because it forces you to design for constraints first, then
          progressively enhance for larger screens. It also produces{' '}
          <strong className="text-accent">less CSS</strong> because base styles are simpler.
        </p>
        <MediaQueryDemo />
      </Section>

      {/* Section 4: Fluid Typography */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineScale className="text-primary" size={20} />
            Fluid Typography with clamp()
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          Traditional responsive typography uses breakpoints:{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">16px</code> on mobile,{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">18px</code> on tablet,{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">20px</code> on desktop. That's a
          lot of code for a small change.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          The <code className="bg-base-200 px-2 py-0.5 rounded text-sm">clamp()</code> function
          creates <strong className="text-success">fluid scaling</strong> between a minimum and
          maximum value—no breakpoints needed.
        </p>
        <FluidTypographyDemo />
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
            'The viewport meta tag is required for responsive design to work on mobile',
            'width=device-width tells browsers to use actual device width, not 980px',
            'initial-scale=1 prevents automatic zooming',
            'Mobile-first (min-width) produces less CSS than desktop-first (max-width)',
            'Start with base styles for mobile, add complexity as screens get larger',
            'clamp(min, preferred, max) creates fluid values without breakpoints',
            'The "preferred" value typically uses vw units for viewport-relative scaling',
            'Fluid typography: clamp(1rem, 2.5vw, 2rem) for headings that scale smoothly',
          ]}
        />
      </Section>
    </div>
  );
}
