// ============================================
// CSS Module 3, Lesson 2: Transitions & Animations
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineLightningBolt,
  HiOutlineAdjustments,
  HiOutlineRefresh,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import PerformanceLayerDemo from './PerformanceLayerDemo';
import BezierCurvesDemo from './BezierCurvesDemo';
import KeyframesDemo from './KeyframesDemo';

export default function CSSLesson3_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="3" lesson="2" title="Transitions & Animations" />

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
          CSS animations bring interfaces to life, but{' '}
          <strong className="text-error">not all animations are equal</strong>. Understanding the{' '}
          <strong className="text-primary">browser rendering pipeline</strong> is the key to smooth,
          60fps animations. Some properties are cheap to animate (GPU-accelerated), while others
          cause expensive layout recalculations.
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          Master <strong className="text-success">transitions</strong> for simple state changes,{' '}
          <strong className="text-warning">timing functions</strong> for natural motion, and{' '}
          <strong className="text-accent">keyframe animations</strong> for complex sequences.
        </p>
      </Section>

      {/* Section 2: The Performance Layer */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            The Performance Layer
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          The browser renders in three phases: <strong className="text-error">Layout</strong>{' '}
          (geometry), <strong className="text-warning">Paint</strong> (pixels), and{' '}
          <strong className="text-success">Composite</strong> (GPU layers). Animating{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">transform</code> and{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">opacity</code> only triggers
          Composite—the fastest phase.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Properties like <code className="bg-base-200 px-2 py-0.5 rounded text-sm">left</code>,{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">width</code>, or{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">margin</code> trigger Layout,
          forcing the browser to recalculate geometry for every frame—a recipe for jank.
        </p>
        <PerformanceLayerDemo />
      </Section>

      {/* Section 3: Bezier Curves */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineAdjustments className="text-primary" size={20} />
            Timing Functions & Bezier Curves
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          Timing functions control the <strong className="text-primary">acceleration</strong> of
          animations. The built-in keywords (
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">ease</code>,{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">ease-in-out</code>) are just
          presets for{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">cubic-bezier()</code>.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          A bezier curve has four control points. The first and last are fixed at (0,0) and (1,1).
          You control the two middle points:{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">
            cubic-bezier(x1, y1, x2, y2)
          </code>
          .
        </p>
        <BezierCurvesDemo />
      </Section>

      {/* Section 4: Keyframe Animations */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineRefresh className="text-primary" size={20} />
            Keyframe Animations
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          While transitions animate between two states,{' '}
          <strong className="text-primary">@keyframes</strong> define multi-step animations with
          precise control. Use percentage-based stops (0%, 50%, 100%) or keywords (
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">from</code>,{' '}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">to</code>).
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          The <code className="bg-base-200 px-2 py-0.5 rounded text-sm">animation-fill-mode</code>{' '}
          property determines what styles apply before/after the animation:{' '}
          <strong className="text-success">forwards</strong> keeps end state,{' '}
          <strong className="text-warning">backwards</strong> applies start state during delay.
        </p>
        <KeyframesDemo />
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
            'Only animate transform and opacity for 60fps performance',
            'Layout triggers (left, width, margin) cause expensive recalculations',
            'Use translate() instead of left/top for movement',
            'scale() and rotate() are GPU-accelerated alternatives to width/height',
            'cubic-bezier(x1, y1, x2, y2) creates custom timing curves',
            'ease-out is best for entrances, ease-in for exits',
            '@keyframes allows multi-step animations with percentage stops',
            'animation-fill-mode: forwards keeps the end state after animation',
            'will-change hints the browser to optimize, but use sparingly',
          ]}
        />
      </Section>
    </div>
  );
}
