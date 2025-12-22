import { LessonHeader, Section, TakeawayList } from '../components';
import StateBasicsDemo from './StateBasicsDemo';
import StateVsPropsDemo from './StateVsPropsDemo';
import MultipleStateDemo from './MultipleStateDemo';
import StateUpdatesDemo from './StateUpdatesDemo';
import StatePlayground from './StatePlayground';

export default function Lesson2_2() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="2" lesson="2" title="State with useState" />

      <Section title="🎯 What is State?">
        <p className="text-slate-400 leading-relaxed">
          <strong className="text-blue-500">State</strong> is data that changes over time in your
          component. Unlike props (which come from parent), state is{' '}
          <strong className="text-green-500">owned and managed by the component itself</strong>.
          When state changes, React automatically re-renders the component!
        </p>
        <StateBasicsDemo />
      </Section>

      <Section title="⚖️ State vs Props">
        <p className="text-slate-400 leading-relaxed">
          Both state and props hold data, but they serve different purposes. Understanding when to
          use each is key to React mastery:
        </p>
        <StateVsPropsDemo />
      </Section>

      <Section title="📦 Multiple State Values">
        <p className="text-slate-400 leading-relaxed">
          Components often need to track multiple pieces of data. You can call{' '}
          <code className="text-pink-500">useState</code> multiple times!
        </p>
        <MultipleStateDemo />
      </Section>

      <Section title="🔄 Updating State Correctly">
        <p className="text-slate-400 leading-relaxed">
          State updates have some gotchas! Learn about{' '}
          <strong className="text-amber-500">functional updates</strong> and why they matter:
        </p>
        <StateUpdatesDemo />
      </Section>

      <Section title="🎮 State Playground">
        <p className="text-slate-400 leading-relaxed">
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
