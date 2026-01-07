// ============================================
// Lesson 8.2: Testing Strategies
// ============================================

import {
  HiOutlineBeaker,
  HiOutlineBookOpen,
  HiOutlineCog,
  HiOutlineServer,
  HiOutlineCursorClick,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../../components';
import TestingApproachesDemo from './TestingApproachesDemo';
import StorybookSetupDemo from './StorybookSetupDemo';
import MSWMockingDemo from './MSWMockingDemo';
import InteractionTestsDemo from './InteractionTestsDemo';
import TestingPlayground from './TestingPlayground';

export default function Lesson8_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="8" lesson="2" title="Testing Strategies" />

      {/* Section 1: Testing Approaches */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBookOpen className="text-primary" size={20} />
            Testing Approaches
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          There are different levels of testing, each with its own trade-offs. Understanding when to
          use each type helps you build a{' '}
          <strong className="text-primary">balanced test suite</strong> that gives you confidence
          without slowing you down.
        </p>
        <TestingApproachesDemo />
      </Section>

      {/* Section 2: Storybook Setup */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCog className="text-primary" size={20} />
            Storybook Setup
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">Storybook</strong> is a tool for developing and testing
          UI components in isolation. Each component gets its own "stories" - different states you
          can view, interact with, and test.
        </p>
        <StorybookSetupDemo />
      </Section>

      {/* Section 3: API Mocking with MSW */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineServer className="text-primary" size={20} />
            API Mocking with MSW
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">Mock Service Worker (MSW)</strong> intercepts network
          requests and returns mock data. This lets you test components that fetch data without
          needing a real API server.
        </p>
        <MSWMockingDemo />
      </Section>

      {/* Section 4: Interaction Tests */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCursorClick className="text-primary" size={20} />
            Interaction Tests
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">Play functions</strong> run after your story renders,
          simulating user interactions and making assertions. They use Testing Library queries and
          Jest-DOM matchers.
        </p>
        <InteractionTestsDemo />
      </Section>

      {/* Section 5: Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Testing Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          See how different testing scenarios work. These interactive demos show the component
          behavior that tests verify.
        </p>
        <TestingPlayground />
      </Section>

      {/* Takeaways */}
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
            'The testing pyramid: more unit tests, fewer E2E tests, integration in between',
            'Storybook enables isolated component development AND testing in one tool',
            'Stories are different states of your component (default, loading, error, etc.)',
            'MSW intercepts fetch() requests and returns mock data - no real server needed',
            'Use delay("infinite") to test loading states, HttpResponse(null, {status: 500}) for errors',
            'Play functions simulate user interactions with userEvent.click(), .type(), etc.',
            'Use Testing Library queries: getByRole, getByLabelText, getByText (accessibility-first)',
            'waitFor() handles async operations - always set a reasonable timeout',
            'Test user behavior, not implementation details',
            'Run tests with: npm test (all), npm run test:lesson -- 4_1 (specific lesson)',
          ]}
        />
      </Section>
    </div>
  );
}
