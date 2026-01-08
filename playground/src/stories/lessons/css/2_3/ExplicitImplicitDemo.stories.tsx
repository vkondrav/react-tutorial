import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import ExplicitImplicitDemo from '../../../../lessons/css/2_3/ExplicitImplicitDemo';

const meta: Meta<typeof ExplicitImplicitDemo> = {
  title: 'Lessons/CSS/2.3 CSS Grid/ExplicitImplicitDemo',
  component: ExplicitImplicitDemo,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof ExplicitImplicitDemo>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check grid type buttons are present
    await expect(canvas.getByRole('button', { name: 'Explicit Grid' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Implicit Grid' })).toBeInTheDocument();

    // Check items slider is present
    await expect(canvas.getByText('Items:')).toBeInTheDocument();
  },
};

export const ToggleGridTypes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Start with explicit grid
    const explicitBtn = canvas.getByRole('button', { name: 'Explicit Grid' });
    await expect(explicitBtn).toHaveClass('btn-primary');

    // Switch to implicit grid
    const implicitBtn = canvas.getByRole('button', { name: 'Implicit Grid' });
    await user.click(implicitBtn);

    await waitFor(() => {
      expect(implicitBtn).toHaveClass('btn-warning');
    });

    // Check auto row height control appears
    await expect(canvas.getByText('Auto Row Height:')).toBeInTheDocument();
  },
};

export const ExplicitGridOverflow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Ensure we're on explicit grid
    const explicitBtn = canvas.getByRole('button', { name: 'Explicit Grid' });
    await user.click(explicitBtn);

    // Increase items to trigger overflow (more than 6 items for 2x3 grid)
    const slider = canvas.getAllByRole('slider')[0];
    await user.click(slider);

    // Check the overflow warning in legend
    await waitFor(() => {
      expect(canvas.getByText('Explicit (defined)')).toBeInTheDocument();
    });
  },
};

export const ImplicitGridAutoRows: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Switch to implicit grid
    const implicitBtn = canvas.getByRole('button', { name: 'Implicit Grid' });
    await user.click(implicitBtn);

    await waitFor(() => {
      expect(implicitBtn).toHaveClass('btn-warning');
    });

    // Check the header shows Implicit Grid
    const header = canvasElement.querySelector('h4');
    expect(header?.textContent).toContain('Implicit Grid');

    // Check auto row height control appears
    await expect(canvas.getByText('Auto Row Height:')).toBeInTheDocument();
  },
};

export const CodeSnippetsPresent: Story = {
  play: async ({ canvasElement }) => {
    // Check code snippets are rendered (title + code)
    const codeTitle = canvasElement.querySelector('.text-xs.text-base-content\\/60');
    expect(codeTitle).toBeInTheDocument();

    // Check code content is present in pre elements
    const preElements = canvasElement.querySelectorAll('pre');
    const codeContent = Array.from(preElements)
      .map((el) => el.textContent)
      .join(' ');
    expect(codeContent.length).toBeGreaterThan(0);
  },
};

export const ProTipPresent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check pro tip is present
    await expect(canvas.getByText('Pro Tip')).toBeInTheDocument();
    await expect(canvas.getByText(/minmax/)).toBeInTheDocument();
  },
};
