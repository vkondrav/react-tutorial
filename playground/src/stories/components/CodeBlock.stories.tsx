import type { Meta, StoryObj } from '@storybook/react-vite';
import CodeBlock from '../../lessons/components/CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Shared Components/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The header title',
    },
    code: {
      control: 'text',
      description: 'The code to display',
    },
    variant: {
      control: 'radio',
      options: ['good', 'bad'],
      description: 'Visual variant indicating good or bad practice',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GoodExample: Story = {
  args: {
    title: 'Declarative (React)',
    variant: 'good',
    code: `function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
  },
};

export const BadExample: Story = {
  args: {
    title: 'Imperative (Vanilla JS)',
    variant: 'bad',
    code: `const button = document.getElementById('counter');
let count = 0;
button.addEventListener('click', () => {
  count++;
  button.textContent = count;
});`,
  },
};

export const SideBySideComparison: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <CodeBlock
        title="Imperative (Bad)"
        variant="bad"
        code={`const el = document.getElementById('name');
el.textContent = 'Hello';
el.style.color = 'blue';`}
      />
      <CodeBlock
        title="Declarative (Good)"
        variant="good"
        code={`<span style={{ color: 'blue' }}>
  Hello
</span>`}
      />
    </div>
  ),
};
