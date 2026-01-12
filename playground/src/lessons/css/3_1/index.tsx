// ============================================
// CSS Module 3, Lesson 1: Backgrounds & Borders
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineColorSwatch,
  HiOutlinePhotograph,
  HiOutlineSparkles,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import GradientDemo from './GradientDemo';
import BackgroundLayeringDemo from './BackgroundLayeringDemo';
import CSSShapesDemo from './CSSShapesDemo';

export default function CSSLesson3_1(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="3" lesson="1" title="Backgrounds & Borders" />

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
          CSS backgrounds and borders are far more powerful than solid colors. With{' '}
          <strong className="text-primary">gradients</strong>,{' '}
          <strong className="text-success">layered backgrounds</strong>, and{' '}
          <strong className="text-accent">clip-path shapes</strong>, you can create stunning visual
          effects without images.
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          Understanding these properties unlocks creative possibilities: hero sections with gradient
          overlays, decorative shapes, text effects, and modern UI patterns—all with pure CSS.
        </p>
      </Section>

      {/* Section 2: Gradients */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineColorSwatch className="text-primary" size={20} />
            Gradient Syntax
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          CSS offers three gradient types: <strong className="text-success">linear-gradient</strong>{' '}
          (straight lines), <strong className="text-warning">radial-gradient</strong>{' '}
          (circular/elliptical), and <strong className="text-accent">conic-gradient</strong> (around
          a center point).
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Each supports <strong>color stops</strong> with optional positions. Hard stops (same
          position) create sharp edges; spread stops create smooth transitions.
        </p>
        <GradientDemo />
      </Section>

      {/* Section 3: Background Layering */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePhotograph className="text-primary" size={20} />
            Background Layering
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          CSS backgrounds can be <strong className="text-primary">stacked</strong>. The first
          background in the list renders on top. This enables effects like gradient overlays on
          images, pattern combinations, and decorative layers.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          Use <code className="bg-base-200 px-2 py-0.5 rounded text-sm">
            background-blend-mode
          </code>{' '}
          to control how layers interact—similar to Photoshop blend modes.
        </p>
        <BackgroundLayeringDemo />
      </Section>

      {/* Section 4: CSS Shapes */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSparkles className="text-primary" size={20} />
            CSS Shapes with clip-path
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          The <code className="bg-base-200 px-2 py-0.5 rounded text-sm">clip-path</code> property
          clips an element to a shape. Combined with{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">shape-outside</code>, you can
          wrap text around non-rectangular objects.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Common shapes include <strong className="text-success">circle()</strong>,{' '}
          <strong className="text-warning">ellipse()</strong>,{' '}
          <strong className="text-accent">polygon()</strong>, and{' '}
          <strong className="text-primary">inset()</strong>.
        </p>
        <CSSShapesDemo />
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
            'linear-gradient: direction + color stops (e.g., to right, #f00 0%, #00f 100%)',
            'radial-gradient: shape (circle/ellipse) + size + position + color stops',
            'conic-gradient: from angle at position + color stops (great for pie charts)',
            'Hard stops: same position = sharp edge (e.g., red 50%, blue 50%)',
            'Multiple backgrounds stack: first is on top, last is on bottom',
            'background-blend-mode: multiply, overlay, screen, etc. for layer effects',
            'clip-path: circle(), ellipse(), polygon(), inset() to clip elements',
            'shape-outside: makes text wrap around floated elements with shapes',
          ]}
        />
      </Section>
    </div>
  );
}
