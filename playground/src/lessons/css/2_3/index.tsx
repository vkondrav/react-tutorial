// ============================================
// CSS Module 2, Lesson 3: CSS Grid
// ============================================

import {
  HiOutlineLightBulb,
  HiOutlineViewGrid,
  HiOutlineTemplate,
  HiOutlineSwitchHorizontal,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import ExplicitImplicitDemo from './ExplicitImplicitDemo';
import FrUnitDemo from './FrUnitDemo';
import GridAreasDemo from './GridAreasDemo';
import GridAlignmentDemo from './GridAlignmentDemo';

export default function CSSLesson2_3(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="2" lesson="3" title="CSS Grid" />

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
          CSS Grid is a <strong className="text-primary">two-dimensional layout system</strong>.
          Unlike Flexbox which handles one axis at a time, Grid lets you control both rows and
          columns simultaneously. It's the most powerful layout tool in CSS.
        </p>
        <p className="leading-relaxed text-base-content/70 mt-4">
          Think of Grid as placing items on a <strong className="text-accent">spreadsheet</strong>.
          You define the grid structure (rows and columns), then place items into cells—or let the
          browser auto-place them for you.
        </p>
      </Section>

      {/* Section 2: Explicit vs Implicit Grid */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineViewGrid className="text-primary" size={20} />
            Explicit vs. Implicit Grid
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          The <strong className="text-success">explicit grid</strong> is what you define with{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">
            grid-template-columns
          </code> and {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">grid-template-rows</code>.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          The <strong className="text-warning">implicit grid</strong> is what the browser creates
          automatically when content overflows your explicit grid. Control it with{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">grid-auto-rows</code> and{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">grid-auto-columns</code>.
        </p>
        <ExplicitImplicitDemo />
      </Section>

      {/* Section 3: The fr Unit */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTemplate className="text-primary" size={20} />
            The fr Unit: Fractional Free Space
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          The <code className="bg-base-200 px-2 py-0.5 rounded text-sm">fr</code> unit is unique to
          Grid. It represents a fraction of the{' '}
          <strong className="text-accent">available free space</strong>—not the total space.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          This distinction matters: fixed-size columns are calculated first, then{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="text-success">fr</code> units divide the remaining space.
        </p>
        <FrUnitDemo />
      </Section>

      {/* Section 4: Grid Template Areas */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineViewGrid className="text-primary" size={20} />
            Grid Template Areas: Visual Layout
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          The <code className="bg-base-200 px-2 py-0.5 rounded text-sm">
            grid-template-areas
          </code>{' '}
          property lets you define your layout using a visual, ASCII-art-like syntax. It's the
          fastest way to prototype complex layouts.
        </p>
        <p className="leading-relaxed text-base-content/70 mb-6">
          Each string represents a row, and each word represents a column. Use{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="bg-base-200 px-2 py-0.5 rounded text-sm">.</code> for empty cells.
        </p>
        <GridAreasDemo />
      </Section>

      {/* Section 5: Grid Alignment */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="text-primary" size={20} />
            Alignment: Items vs. Content
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-4">
          Grid has two levels of alignment that often confuse developers:
        </p>
        <ul className="list-disc list-inside text-base-content/70 mb-6 space-y-2">
          <li>
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="text-success">justify-items</code> /{' '}
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="text-success">align-items</code> — Align items{' '}
            <strong>within their cells</strong>
          </li>
          <li>
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="text-warning">justify-content</code> /{' '}
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="text-warning">align-content</code> — Align the{' '}
            <strong>entire grid</strong> within its container
          </li>
        </ul>
        <GridAlignmentDemo />
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
            'Grid is two-dimensional: controls rows AND columns simultaneously',
            'Explicit grid = what you define; Implicit grid = what browser creates for overflow',
            'Use grid-auto-rows/columns to control implicit grid sizing',
            'fr units divide FREE space (after fixed sizes are calculated)',
            '1fr 2fr 1fr = 25%, 50%, 25% of remaining space',
            'grid-template-areas enables visual, ASCII-art layouts',
            'justify-items/align-items = items within cells',
            'justify-content/align-content = grid within container',
          ]}
        />
      </Section>
    </div>
  );
}
