// Module 1, Lesson 1: What is React?

import {
  HiOutlineLightBulb,
  HiOutlineSwitchHorizontal,
  HiOutlineViewGrid,
  HiOutlineLightningBolt,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import ComparisonDemo from './ComparisonDemo';
import ComponentTreeDemo from './ComponentTreeDemo';
import VirtualDomDemo from './VirtualDomDemo';

export default function Lesson1_1() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="1" title="What is React & Why Use It?" />

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightBulb className="text-primary" size={20} />
            The Big Idea
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70">
          React lets you describe <strong className="text-primary">what</strong> your UI should look
          like, not <strong className="text-accent">how</strong> to build it step by step. This is
          called <em>declarative programming</em>.
        </p>
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="text-primary" size={20} />
            Imperative vs Declarative
          </span>
        }
      >
        <ComparisonDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineViewGrid className="text-primary" size={20} />
            Components in Action
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-6">
          Everything you see on this page is built from{' '}
          <strong className="text-primary">components</strong>. Components can contain other
          components - this is called <strong className="text-success">composition</strong>.
        </p>
        <ComponentTreeDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            React's Secret Sauce: Virtual DOM
          </span>
        }
      >
        <VirtualDomDemo />
      </Section>

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
            'React is a library for building UIs with reusable components',
            'Declarative code describes WHAT you want, not HOW to do it',
            'Components are like LEGO blocks - small, reusable, composable',
            "Virtual DOM makes updates fast by only changing what's necessary",
            'One-way data flow keeps your app predictable',
          ]}
        />
      </Section>
    </div>
  );
}
