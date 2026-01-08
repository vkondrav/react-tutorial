// ============================================
// Module 2, Lesson 1: Props
// ============================================

import {
  HiOutlineCube,
  HiOutlineCursorClick,
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import PropsBasicsDemo from './PropsBasicsDemo';
import DestructuringDemo from './DestructuringDemo';
import DefaultPropsDemo from './DefaultPropsDemo';
import ChildrenDemo from './ChildrenDemo';
import PropsPlayground from './PropsPlayground';

export default function Lesson2_1(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="2" lesson="1" title="Props: Passing Data to Components" />

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCube className="text-primary" size={20} />
            What are Props?
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          <strong className="text-primary">Props</strong> (short for "properties") are how you pass
          data from a parent component to a child component. They're like function arguments, but
          for components!
        </p>
        <PropsBasicsDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCursorClick className="text-primary" size={20} />
            Destructuring Props
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          Instead of accessing <code className="text-success">props.name</code> every time, you can{' '}
          <strong className="text-warning">destructure</strong> props directly in the function
          parameters:
        </p>
        <DestructuringDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCog className="text-primary" size={20} />
            Default Props
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          What if a prop isn't passed? You can provide{' '}
          <strong className="text-secondary">default values</strong> so your component always has
          something to work with:
        </p>
        <DefaultPropsDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineUser className="text-primary" size={20} />
            The Children Prop
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          The special <code className="text-accent">children</code> prop lets you pass content
          between component tags - just like HTML elements!
        </p>
        <ChildrenDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Props Playground
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          Experiment with props! Change the values and see how the component updates:
        </p>
        <PropsPlayground />
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
