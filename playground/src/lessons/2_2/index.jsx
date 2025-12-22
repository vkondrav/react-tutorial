import { LessonHeader, Section, TakeawayList } from '../components';
import StateBasicsDemo from './StateBasicsDemo';
import StateVsPropsDemo from './StateVsPropsDemo';
import MultipleStateDemo from './MultipleStateDemo';
import StateUpdatesDemo from './StateUpdatesDemo';
import StatePlayground from './StatePlayground';

export default function Lesson2_2() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <LessonHeader module="2" lesson="2" title="State with useState" />

      <Section title="🎯 What is State?">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          <strong style={{ color: '#3b82f6' }}>State</strong> is data that changes over time in your
          component. Unlike props (which come from parent), state is{' '}
          <strong style={{ color: '#22c55e' }}>owned and managed by the component itself</strong>.
          When state changes, React automatically re-renders the component!
        </p>
        <StateBasicsDemo />
      </Section>

      <Section title="⚖️ State vs Props">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          Both state and props hold data, but they serve different purposes. Understanding when to
          use each is key to React mastery:
        </p>
        <StateVsPropsDemo />
      </Section>

      <Section title="📦 Multiple State Values">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          Components often need to track multiple pieces of data. You can call{' '}
          <code style={{ color: '#ec4899' }}>useState</code> multiple times!
        </p>
        <MultipleStateDemo />
      </Section>

      <Section title="🔄 Updating State Correctly">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          State updates have some gotchas! Learn about{' '}
          <strong style={{ color: '#f59e0b' }}>functional updates</strong> and why they matter:
        </p>
        <StateUpdatesDemo />
      </Section>

      <Section title="🎮 State Playground">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          Build a mini app using state! See how different state values work together:
        </p>
        <StatePlayground />
      </Section>

      <Section title="✅ Key Takeaways">
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
