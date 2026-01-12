// ============================================
// CSS Module 4, Lesson 3: Accessibility
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineEye,
  HiOutlineColorSwatch,
  HiOutlineEyeOff,
  HiOutlineSparkles,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import FocusIndicatorsDemo from './FocusIndicatorsDemo';
import ColorContrastDemo from './ColorContrastDemo';
import VisuallyHiddenDemo from './VisuallyHiddenDemo';
import ReducedMotionDemo from './ReducedMotionDemo';

export default function CSSLesson4_3(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="4" lesson="3" title="Accessibility" />

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
          <strong className="text-primary">CSS accessibility</strong> ensures that your styles work
          for <em>everyone</em>—including users with disabilities, those using keyboards, and people
          with motion sensitivities. Good CSS respects user preferences and never removes critical
          functionality.
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          The core principle: <strong className="text-success">enhance, don't exclude</strong>.
          Every visual design choice should have an accessible fallback. Focus indicators, color
          contrast, and motion preferences aren't optional—they're requirements for inclusive
          design.
        </p>
      </Section>

      {/* Section 2: Focus Indicators */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineEye className="text-primary" size={20} />
            Focus Indicators
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          Keyboard users <strong className="text-primary">must</strong> be able to see where they
          are on the page. The browser provides a default focus outline, but many developers remove
          it for "cleaner" designs. This breaks accessibility.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          The rule: <strong className="text-warning">never use</strong>{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">outline: none</code> without
          providing a visible alternative. Better yet, use{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">:focus-visible</code> to show
          focus only for keyboard navigation.
        </p>
        <FocusIndicatorsDemo />
      </Section>

      {/* Section 3: Color Contrast */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineColorSwatch className="text-primary" size={20} />
            Color Contrast
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          <strong className="text-primary">WCAG</strong> (Web Content Accessibility Guidelines)
          defines minimum contrast ratios between text and background colors. These ensure
          readability for users with low vision or color blindness.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          The targets: <strong className="text-success">4.5:1</strong> for normal text (AA),{' '}
          <strong className="text-success">3:1</strong> for large text (18pt+ or 14pt bold),{' '}
          <strong className="text-accent">7:1</strong> for enhanced contrast (AAA).
        </p>
        <ColorContrastDemo />
      </Section>

      {/* Section 4: Visually Hidden Content */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineEyeOff className="text-primary" size={20} />
            Visually Hidden Content
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          Sometimes you need content for{' '}
          <strong className="text-primary">screen readers only</strong>—like "Skip to main content"
          links or additional context for icon-only buttons. The{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">.sr-only</code> pattern hides
          content visually while keeping it accessible.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Important distinction: {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">display: none</code> and{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">visibility: hidden</code> both
          hide content from <em>everyone</em>, including screen readers. The sr-only technique keeps
          content in the accessibility tree.
        </p>
        <VisuallyHiddenDemo />
      </Section>

      {/* Section 5: Reduced Motion */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSparkles className="text-primary" size={20} />
            Reduced Motion
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          Animations can cause <strong className="text-error">discomfort or seizures</strong> for
          users with vestibular disorders or photosensitive epilepsy. The{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">
            prefers-reduced-motion
          </code>{' '}
          media query lets you respect user preferences.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          The approach: design animations first, then provide reduced alternatives. Essential
          animations (like loading indicators) should still work but with minimal motion.
        </p>
        <ReducedMotionDemo />
      </Section>

      {/* Section 6: Key Takeaways */}
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
            'Never use outline: none without a visible focus alternative',
            ':focus-visible shows focus only for keyboard users, not mouse clicks',
            'WCAG contrast: 4.5:1 for normal text, 3:1 for large text',
            'Use contrast checker tools to verify color combinations',
            '.sr-only hides content visually but keeps it accessible to screen readers',
            'display: none and visibility: hidden hide from everyone including assistive tech',
            'prefers-reduced-motion lets users opt out of animations',
            'Provide reduced-motion alternatives for essential animations',
          ]}
        />
      </Section>
    </div>
  );
}
