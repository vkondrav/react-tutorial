import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ActionPatternsDemo from '@lessons/react/7_2/ActionPatternsDemo';

const meta: Meta<typeof ActionPatternsDemo> = {
  title: 'Lessons/react-7.2/ActionPatternsDemo',
  component: ActionPatternsDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Demonstrates action patterns and TypeScript integration with useReducer including simple actions, payloads, and discriminated unions.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view shows simple actions pattern
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show pattern tabs
    expect(canvas.getByRole('button', { name: 'Simple Actions' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'With Payload' })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'TypeScript Union' })).toBeInTheDocument();

    // Should show Simple Action pattern by default
    expect(canvas.getByText('Simple Action (no payload)')).toBeInTheDocument();
    expect(canvas.getByText("For actions that don't need additional data")).toBeInTheDocument();
  },
};

/**
 * Good vs Avoid patterns shown
 */
export const GoodVsAvoid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show Good and Avoid labels
    const goodLabels = canvas.getAllByText('Good');
    expect(goodLabels.length).toBeGreaterThan(0);

    const avoidLabels = canvas.getAllByText('Avoid');
    expect(avoidLabels.length).toBeGreaterThan(0);
  },
};

/**
 * With Payload pattern tab
 */
export const WithPayloadPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click With Payload tab
    await user.click(canvas.getByRole('button', { name: 'With Payload' }));

    // Should show payload pattern
    await waitFor(() => {
      expect(canvas.getByText('Action with Payload')).toBeInTheDocument();
      expect(
        canvas.getByText('When the action needs data to perform the update')
      ).toBeInTheDocument();
    });
  },
};

/**
 * TypeScript Union pattern tab
 */
export const TypeScriptUnionPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click TypeScript Union tab
    await user.click(canvas.getByRole('button', { name: 'TypeScript Union' }));

    // Should show discriminated union pattern
    await waitFor(() => {
      expect(canvas.getByText('TypeScript Discriminated Union')).toBeInTheDocument();
      expect(
        canvas.getByText('Use discriminated unions for exhaustive type checking')
      ).toBeInTheDocument();
    });
  },
};

/**
 * Type-safe form example
 */
export const TypeSafeFormExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the form example
    expect(canvas.getByText('Type-Safe Form with useReducer')).toBeInTheDocument();
    expect(canvas.getByText('Current State')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Enter name')).toBeInTheDocument();
    expect(canvas.getByPlaceholderText('Enter email')).toBeInTheDocument();
  },
};

/**
 * Form interaction updates state and shows last action
 */
export const FormInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Type in name field
    const nameInput = canvas.getByPlaceholderText('Enter name');
    await user.type(nameInput, 'John Doe');

    // Should show last dispatched action section
    await waitFor(() => {
      expect(canvas.getByText('Last Dispatched Action')).toBeInTheDocument();
    });

    // Should show SET_FIELD action type in the JSON display
    expect(canvas.getByText(/SET_FIELD/)).toBeInTheDocument();
  },
};

/**
 * Form email validation shows error
 */
export const FormEmailValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Type invalid email
    const emailInput = canvas.getByPlaceholderText('Enter email');
    await user.type(emailInput, 'invalid');
    await user.tab(); // Trigger blur

    // Should show error
    await waitFor(() => {
      expect(canvas.getByText('Invalid email')).toBeInTheDocument();
    });
  },
};

/**
 * Form reset works
 */
export const FormReset: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Fill in some fields
    await user.type(canvas.getByPlaceholderText('Enter name'), 'Test');
    await user.type(canvas.getByPlaceholderText('Enter email'), 'test@test.com');

    // Click Reset Form
    await user.click(canvas.getByRole('button', { name: 'Reset Form' }));

    // Fields should be empty
    await waitFor(() => {
      expect(canvas.getByPlaceholderText('Enter name')).toHaveValue('');
      expect(canvas.getByPlaceholderText('Enter email')).toHaveValue('');
    });
  },
};

/**
 * Action creator pattern section
 */
export const ActionCreatorPattern: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show action creators section
    expect(canvas.getByText('Action Creators (Optional Pattern)')).toBeInTheDocument();
    expect(
      canvas.getByText(/Action creators are functions that return action objects/)
    ).toBeInTheDocument();
  },
};

/**
 * Best practice tip
 */
export const BestPracticeTip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the tip
    expect(canvas.getByText('Best Practice:')).toBeInTheDocument();
    expect(canvas.getByText(/SCREAMING_SNAKE_CASE/)).toBeInTheDocument();
  },
};
