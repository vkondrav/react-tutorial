// ============================================
// Module 2, Lesson 3: Event Handling
// ============================================

import {
  HiOutlineCursorClick,
  HiOutlineDocumentText,
  HiOutlineArrowUp,
  HiOutlineCog,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../../components';
import EventBasicsDemo from './EventBasicsDemo';
import EventTypesDemo from './EventTypesDemo';
import EventPropagationDemo from './EventPropagationDemo';
import EventHandlersDemo from './EventHandlersDemo';
import EventPlayground from './EventPlayground';

export default function Lesson2_3(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="2" lesson="3" title="Event Handling" />

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCursorClick className="text-primary" size={20} />
            Handling Events
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          React lets you handle user interactions like clicks, typing, and form submissions. Event
          handlers are functions that run when events occur. In React, event names are{' '}
          <strong className="text-primary">camelCase</strong> (like{' '}
          <code className="text-success">onClick</code> instead of{' '}
          <code className="text-error">onclick</code>).
        </p>
        <EventBasicsDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineDocumentText className="text-primary" size={20} />
            Common Event Types
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          Different HTML elements trigger different events. Here are the most common ones you'll
          use:
        </p>
        <EventTypesDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineArrowUp className="text-primary" size={20} />
            Event Propagation
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          Events in React bubble up from child to parent elements. Sometimes you need to{' '}
          <strong className="text-warning">stop propagation</strong> or{' '}
          <strong className="text-warning">prevent default</strong> behavior:
        </p>
        <EventPropagationDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCog className="text-primary" size={20} />
            Handler Patterns
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          There are several ways to write event handlers. Each has its place:
        </p>
        <EventHandlersDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Event Playground
          </span>
        }
      >
        <p className="text-base-content/70 leading-relaxed">
          Practice handling events! Build an interactive form with validation:
        </p>
        <EventPlayground />
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
            'Event handlers are functions passed as props: onClick={handleClick}',
            'React events are SyntheticEvents - a wrapper around native events',
            'Event names are camelCase: onClick, onChange, onSubmit (not onclick)',
            'Always pass a function reference, not a function call: onClick={handleClick} not onClick={handleClick()}',
            'Use e.preventDefault() to stop default browser behavior (like form submission)',
            'Use e.stopPropagation() to prevent events from bubbling to parent elements',
            'Access event data via the event parameter: onClick={(e) => console.log(e.target)}',
          ]}
        />
      </Section>
    </div>
  );
}
