// ============================================
// StorybookSetupDemo: Storybook Configuration Walkthrough
// ============================================

import { useState } from 'react';
import { HiOutlineChevronRight, HiOutlineChevronDown } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import storyBasicsCode from './examples/StoryBasics.tsx?raw';
import previewCode from './examples/StorybookPreview.tsx?raw';

interface Step {
  id: string;
  title: string;
  description: string;
  code?: string;
  language?: string;
  codeTitle?: string;
}

const SETUP_STEPS: Step[] = [
  {
    id: 'structure',
    title: '1. Story File Structure',
    description:
      'Each story file exports a meta object (component info) and individual stories (component states). Stories live alongside components or in a dedicated folder.',
    code: storyBasicsCode,
    language: 'tsx',
    codeTitle: 'Button.stories.tsx',
  },
  {
    id: 'preview',
    title: '2. Global Configuration',
    description:
      'The preview.ts file configures global settings: CSS imports, backgrounds, MSW initialization, and default parameters.',
    code: previewCode,
    language: 'typescript',
    codeTitle: '.storybook/preview.ts',
  },
  {
    id: 'run',
    title: '3. Running Storybook',
    description:
      'Start the Storybook dev server to view your components in isolation. Each story appears in the sidebar, and you can interact with components live.',
    code: `# Start Storybook dev server
npm run storybook

# Storybook opens at http://localhost:6006
# - Browse components in the sidebar
# - Switch between stories (states)
# - Use Controls panel to tweak props
# - Run tests with the Test panel`,
    language: 'bash',
    codeTitle: 'Terminal commands',
  },
];

export default function StorybookSetupDemo(): React.ReactElement {
  const [expandedStep, setExpandedStep] = useState<string>('structure');

  return (
    <div className="space-y-4">
      {/* Steps */}
      {SETUP_STEPS.map((step) => {
        const isExpanded = expandedStep === step.id;
        return (
          <div key={step.id} className="card bg-base-300 overflow-hidden">
            <button
              onClick={() => setExpandedStep(isExpanded ? '' : step.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-base-200/50 transition-colors"
            >
              <span className="font-medium">{step.title}</span>
              {isExpanded ? (
                <HiOutlineChevronDown size={20} className="text-primary" />
              ) : (
                <HiOutlineChevronRight size={20} />
              )}
            </button>
            {isExpanded && (
              <div className="px-4 pb-4 space-y-4">
                <p className="text-base-content/70">{step.description}</p>
                {step.code && (
                  <CodeSnippet
                    code={step.code}
                    language={step.language || 'tsx'}
                    title={step.codeTitle}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Key Concepts */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">Key Storybook Concepts</h4>
        <div className="grid gap-3">
          <div className="flex items-start gap-3">
            <span className="badge badge-primary badge-sm mt-0.5">Meta</span>
            <p className="text-sm text-base-content/70">
              Describes the component, its title in the sidebar, and default configuration
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="badge badge-secondary badge-sm mt-0.5">Story</span>
            <p className="text-sm text-base-content/70">
              Each named export is a story - a specific state or variant of your component
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="badge badge-accent badge-sm mt-0.5">Args</span>
            <p className="text-sm text-base-content/70">
              Props passed to your component. Storybook creates controls to edit these live
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="badge badge-info badge-sm mt-0.5">Play</span>
            <p className="text-sm text-base-content/70">
              A function that runs interactions and assertions - your actual tests!
            </p>
          </div>
        </div>
      </div>

      {/* File Organization */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">Recommended File Organization</h4>
        <div className="bg-base-200 rounded-lg p-4 font-mono text-sm">
          <div className="text-base-content/60">src/</div>
          <div className="ml-4">
            <div className="text-base-content/60">stories/</div>
            <div className="ml-4">
              <div className="text-base-content/60">components/</div>
              <div className="ml-4 text-success">Button.stories.tsx</div>
              <div className="ml-4 text-success">Card.stories.tsx</div>
            </div>
            <div className="ml-4">
              <div className="text-base-content/60">lessons/</div>
              <div className="ml-4">
                <div className="text-base-content/60">4_1/</div>
                <div className="ml-4 text-success">FetchDemo.stories.tsx</div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-base-content/60 mt-3">
          Stories are organized by feature/lesson to match the component structure
        </p>
      </div>
    </div>
  );
}
