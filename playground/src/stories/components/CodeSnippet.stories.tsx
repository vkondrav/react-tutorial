import type { Meta, StoryObj } from '@storybook/react-vite';
import CodeSnippet from '../../lessons/components/CodeSnippet';

const meta: Meta<typeof CodeSnippet> = {
  title: 'Shared Components/CodeSnippet',
  component: CodeSnippet,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    code: {
      control: 'text',
      description: 'The code to display',
    },
    language: {
      control: 'select',
      options: ['tsx', 'typescript', 'javascript', 'jsx', 'json', 'bash', 'css', 'html'],
      description: 'The programming language for syntax highlighting',
    },
    title: {
      control: 'text',
      description: 'Optional title bar',
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Whether to show line numbers',
    },
    showCopy: {
      control: 'boolean',
      description: 'Whether to show the copy button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const reactCode = `function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`;

const jsCode = `const button = document.getElementById('counter');
let count = 0;

button.addEventListener('click', () => {
  count++;
  button.textContent = 'Count: ' + count;
});`;

export const Default: Story = {
  args: {
    code: reactCode,
    language: 'tsx',
  },
};

export const WithTitle: Story = {
  args: {
    code: reactCode,
    language: 'tsx',
    title: 'Counter.tsx',
  },
};

export const WithLineNumbers: Story = {
  args: {
    code: reactCode,
    language: 'tsx',
    title: 'Counter.tsx',
    showLineNumbers: true,
  },
};

export const JavaScript: Story = {
  args: {
    code: jsCode,
    language: 'javascript',
    title: 'counter.js',
  },
};

export const NoCopyButton: Story = {
  args: {
    code: reactCode,
    language: 'tsx',
    showCopy: false,
  },
};

export const JSON: Story = {
  args: {
    code: `{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}`,
    language: 'json',
    title: 'package.json',
  },
};

export const Bash: Story = {
  args: {
    code: `npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev`,
    language: 'bash',
    title: 'Terminal',
  },
};
