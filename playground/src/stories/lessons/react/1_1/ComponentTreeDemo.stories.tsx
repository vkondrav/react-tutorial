import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import ComponentTreeDemo from '@lessons/react/1_1/ComponentTreeDemo';

const meta: Meta<typeof ComponentTreeDemo> = {
  title: 'Lessons/react-1.1/ComponentTreeDemo',
  component: ComponentTreeDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive demo showing how React applications are composed of a tree of components. Click on component buttons to learn about each one.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to find a component button by name
const getComponentButton = (canvasElement: HTMLElement, componentName: string): HTMLElement => {
  const buttons = canvasElement.querySelectorAll('button');
  const button = Array.from(buttons).find((btn) => btn.textContent?.includes(componentName));
  if (!button) throw new Error(`Button for ${componentName} not found`);
  return button;
};

/**
 * The default interactive component tree demo.
 * Click on the component buttons to see descriptions.
 */
export const Default: Story = {};

/**
 * Tests clicking on the App component shows its description.
 */
export const SelectAppComponent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially shows "Click a component above"
    expect(canvas.getByText('Click a component above')).toBeInTheDocument();

    // Click on App component button
    const appButton = getComponentButton(canvasElement, 'App');
    await userEvent.click(appButton);

    // Should show the App component description
    expect(
      canvas.getByText('The root component - everything lives inside App')
    ).toBeInTheDocument();
  },
};

/**
 * Tests clicking on the Header component shows its description.
 */
export const SelectHeaderComponent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const headerButton = getComponentButton(canvasElement, 'Header');
    await userEvent.click(headerButton);

    expect(canvas.getByText('Contains the logo and navigation')).toBeInTheDocument();
  },
};

/**
 * Tests clicking on the Section component shows reusability message.
 */
export const SelectSectionComponent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const sectionButton = getComponentButton(canvasElement, 'Section');
    await userEvent.click(sectionButton);

    expect(
      canvas.getByText('Reusable section wrapper - used 5 times on this page!')
    ).toBeInTheDocument();
  },
};

/**
 * Tests toggling selection (click again to deselect).
 */
export const ToggleSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const mainButton = getComponentButton(canvasElement, 'Main');

    // Select
    await userEvent.click(mainButton);
    expect(canvas.getByText('The main content area with all sections')).toBeInTheDocument();

    // Deselect by clicking again
    await userEvent.click(mainButton);
    expect(canvas.getByText('Click a component above')).toBeInTheDocument();
  },
};

/**
 * Displayed in a contained card for emphasis.
 */
export const InCard: Story = {
  decorators: [
    (Story) => (
      <div className="card bg-base-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Component Composition</h3>
        <Story />
      </div>
    ),
  ],
};
