// ============================================
// Module 2, Lesson 2: State with useState
// ============================================

import {
  HiOutlineCursorClick,
  HiOutlineSwitchHorizontal,
  HiOutlineCube,
  HiOutlineRefresh,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import StateBasicsDemo from './StateBasicsDemo';
import StateVsPropsDemo from './StateVsPropsDemo';
import MultipleStateDemo from './MultipleStateDemo';
import StateUpdatesDemo from './StateUpdatesDemo';
import StatePlayground from './StatePlayground';

export default function Lesson2_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="2" lesson="2" title="State with useState" />

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCursorClick className="text-primary" size={20} />
            What is State?
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          <strong className="text-primary">State</strong> is data that changes over time in your
          component. Unlike props (which come from parent), state is{' '}
          <strong className="text-success">owned and managed by the component itself</strong>. When
          state changes, React automatically re-renders the component!
        </p>
        <StateBasicsDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="text-primary" size={20} />
            State vs Props
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          Both state and props hold data, but they serve different purposes. Understanding when to
          use each is key to React mastery:
        </p>
        <StateVsPropsDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCube className="text-primary" size={20} />
            Multiple State Values
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          Components often need to track multiple pieces of data. You can call{' '}
          <code className="text-accent">useState</code> multiple times!
        </p>
        <MultipleStateDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineRefresh className="text-primary" size={20} />
            Updating State Correctly
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          State updates have some gotchas! Learn about{' '}
          <strong className="text-warning">functional updates</strong> and why they matter:
        </p>
        <StateUpdatesDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            State Playground
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          Build a mini app using state! See how different state values work together:
        </p>
        <StatePlayground />
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
            'State is data owned by a component that can change over time',
            'useState returns [currentValue, setterFunction] - always destructure both!',
            'Calling the setter triggers a re-render with the new value',
            'State is private - only the component that owns it can change it',
            'Use functional updates (prev => ...) when new state depends on old state',
            'Never mutate state directly - always use the setter function',
          ]}
        />
      </Section>
    </div>
  );
}
