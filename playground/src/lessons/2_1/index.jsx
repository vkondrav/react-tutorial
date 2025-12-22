import { LessonHeader, Section, TakeawayList } from '../components';
import PropsBasicsDemo from './PropsBasicsDemo';
import DestructuringDemo from './DestructuringDemo';
import DefaultPropsDemo from './DefaultPropsDemo';
import ChildrenDemo from './ChildrenDemo';
import PropsPlayground from './PropsPlayground';

export default function Lesson2_1() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="2" lesson="1" title="Props: Passing Data to Components" />

      <Section title="📦 What are Props?">
        <p className="text-slate-400 leading-relaxed">
          <strong className="text-blue-500">Props</strong> (short for "properties") are how you
          pass data from a parent component to a child component. They're like function arguments,
          but for components!
        </p>
        <PropsBasicsDemo />
      </Section>

      <Section title="🎯 Destructuring Props">
        <p className="text-slate-400 leading-relaxed">
          Instead of accessing <code className="text-green-500">props.name</code> every time, you
          can <strong className="text-amber-500">destructure</strong> props directly in the
          function parameters:
        </p>
        <DestructuringDemo />
      </Section>

      <Section title="⚙️ Default Props">
        <p className="text-slate-400 leading-relaxed">
          What if a prop isn't passed? You can provide{' '}
          <strong className="text-purple-500">default values</strong> so your component always has
          something to work with:
        </p>
        <DefaultPropsDemo />
      </Section>

      <Section title="👶 The Children Prop">
        <p className="text-slate-400 leading-relaxed">
          The special <code className="text-pink-500">children</code> prop lets you pass content
          between component tags - just like HTML elements!
        </p>
        <ChildrenDemo />
      </Section>

      <Section title="🎮 Props Playground">
        <p className="text-slate-400 leading-relaxed">
          Experiment with props! Change the values and see how the component updates:
        </p>
        <PropsPlayground />
      </Section>

      <Section title="✅ Key Takeaways">
        <TakeawayList
          items={[
            'Props are how data flows from parent to child components',
            'Props are read-only - a component cannot modify its own props',
            'Use destructuring for cleaner code: function Button({ label, onClick })',
            'Provide default values with = in destructuring: { size = "medium" }',
            'The children prop passes content between opening and closing tags',
            'Props can be any JavaScript value: strings, numbers, objects, functions, even components!',
          ]}
        />
      </Section>
    </div>
  );
}
