import { LessonHeader, Section, TakeawayList } from '../components';
import EventBasicsDemo from './EventBasicsDemo';
import EventTypesDemo from './EventTypesDemo';
import EventPropagationDemo from './EventPropagationDemo';
import EventHandlersDemo from './EventHandlersDemo';
import EventPlayground from './EventPlayground';

export default function Lesson2_3() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <LessonHeader module="2" lesson="3" title="Event Handling" />

      <Section title="🎯 Handling Events">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          React lets you handle user interactions like clicks, typing, and form submissions. Event
          handlers are functions that run when events occur. In React, event names are{' '}
          <strong style={{ color: '#3b82f6' }}>camelCase</strong> (like{' '}
          <code style={{ color: '#22c55e' }}>onClick</code> instead of{' '}
          <code style={{ color: '#ef4444' }}>onclick</code>).
        </p>
        <EventBasicsDemo />
      </Section>

      <Section title="📝 Common Event Types">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          Different HTML elements trigger different events. Here are the most common ones you'll
          use:
        </p>
        <EventTypesDemo />
      </Section>

      <Section title="🌊 Event Propagation">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          Events in React bubble up from child to parent elements. Sometimes you need to{' '}
          <strong style={{ color: '#f59e0b' }}>stop propagation</strong> or{' '}
          <strong style={{ color: '#f59e0b' }}>prevent default</strong> behavior:
        </p>
        <EventPropagationDemo />
      </Section>

      <Section title="⚙️ Handler Patterns">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          There are several ways to write event handlers. Each has its place:
        </p>
        <EventHandlersDemo />
      </Section>

      <Section title="🎮 Event Playground">
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          Practice handling events! Build an interactive form with validation:
        </p>
        <EventPlayground />
      </Section>

      <Section title="✅ Key Takeaways">
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
