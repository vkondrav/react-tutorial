# 🚀 React Fundamentals & Best Practices

An interactive React tutorial designed to be taught through an AI assistant. Features live playground examples, Storybook integration, and progress tracking.

## Quick Start

```bash
cd playground
npm install
npm run dev
```

This starts three servers:
- **App**: http://localhost:5173 - Main tutorial interface
- **SSR Demo**: http://localhost:3001 - Server-side rendering examples
- **Storybook**: http://localhost:6006 - Component stories and tests

### IDE Setup

Install the Vite Import Navigator extension for Cmd+Click navigation on `?raw` imports:

1. Open Extensions in Cursor/VS Code
2. Click `...` → "Install from VSIX"
3. Select `vite-import-navigator/vite-import-navigator-0.1.0.vsix`

This enables navigation for imports like `import code from './Example.tsx?raw'`.

---

## Project Structure

```
react-tutorial/
├── README.md              ← You are here
├── PROGRESS.md            ← Track lesson completion status
├── playground/            ← Live React app
│   ├── src/
│   │   ├── App.tsx        ← Lesson router
│   │   ├── lessons/
│   │   │   ├── config.json      ← Lesson metadata
│   │   │   ├── components/      ← Shared components
│   │   │   ├── 1_1/             ← Lesson folders
│   │   │   │   ├── index.tsx
│   │   │   │   ├── MyDemo.tsx
│   │   │   │   └── examples/    ← Code snippets
│   │   │   └── ...
│   │   └── stories/             ← Storybook stories
│   └── package.json
└── vite-import-navigator/       ← VS Code extension
```

---

## Course Modules

| Module | Topic | Lessons |
|--------|-------|---------|
| 1 | Foundation | React intro, JSX, Components |
| 2 | Core Concepts | Props, State, Events, Conditional Rendering, Lists |
| 3 | Hooks | useEffect, useContext, useRef, useMemo/useCallback, Custom Hooks |
| 4 | Data Fetching | Fetch with useEffect, Loading/Error states, CRUD, useFetch hook |
| 5 | Forms | Controlled components, Validation, Multiple inputs |
| 6 | Component Patterns | Composition, Render Props, HOCs, Compound Components |
| 7 | State Management | Lifting state, useReducer, Context + Reducer |
| 8 | Advanced | SSR, Testing, TanStack Query, React Server Components |

---

## Creating a New Lesson

### 1. Update `config.json`

```json
{
  "lessons": [
    { "id": "1.4", "module": 1, "title": "Components", "status": "current" }
  ]
}
```

### 2. Create Lesson Folder

```
playground/src/lessons/1_4/
├── index.tsx           ← Main lesson component
├── MyDemo.tsx          ← Interactive demo
└── examples/           ← Code snippets (with // @ts-nocheck)
    └── Example1.tsx
```

### 3. Create Example Code Snippet

```tsx
// playground/src/lessons/1_4/examples/Example1.tsx
// @ts-nocheck
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}
```

The `// @ts-nocheck` comment suppresses TypeScript errors for incomplete snippets (missing imports, etc.). The `CodeSnippet` component automatically strips this line from display.

### 4. Main Lesson Component

```tsx
// playground/src/lessons/1_4/index.tsx
import { HiOutlineBookOpen, HiOutlineClipboardCheck } from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import MyDemo from './MyDemo';

export default function Lesson1_4(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="4" title="Components" />
      
      <Section title={<><HiOutlineBookOpen className="text-primary" size={20} /> Concept</>}>
        <p className="leading-relaxed text-base-content/70">Explanation...</p>
        <MyDemo />
      </Section>

      <Section title={<><HiOutlineClipboardCheck className="text-primary" size={20} /> Takeaways</>}>
        <TakeawayList items={["Point 1", "Point 2"]} />
      </Section>
    </div>
  );
}
```

### 5. Demo Component with Code Snippets

```tsx
// playground/src/lessons/1_4/MyDemo.tsx
import { useState } from 'react';
import { CodeSnippet } from '../components';
import exampleCode from './examples/Example1.tsx?raw';

export default function MyDemo(): React.ReactElement {
  const [count, setCount] = useState(0);
  
  return (
    <div className="card bg-base-200 p-6">
      <CodeSnippet title="Example" language="tsx" code={exampleCode} />
      <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
    </div>
  );
}
```

### 6. Register in `App.tsx`

```tsx
import Lesson1_4 from './lessons/1_4';

const LESSON_COMPONENTS: Record<string, LessonComponent> = {
  // ...existing lessons
  '1.4': Lesson1_4,
};
```

### 7. Create Storybook Stories

```tsx
// playground/src/stories/lessons/1_4/MyDemo.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from '@storybook/test';
import MyDemo from '../../../lessons/1_4/MyDemo';

const meta: Meta<typeof MyDemo> = {
  title: 'Lessons/1.4/MyDemo',
  component: MyDemo,
};
export default meta;

export const Default: StoryObj<typeof MyDemo> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(button).toHaveTextContent('Count: 1');
  },
};
```

### 8. Update Progress

Update `PROGRESS.md` to reflect completion status.

---

## Tech Stack

| Package | Purpose |
|---------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS v4 | Utility CSS |
| daisyUI v5 | Component library |
| react-icons | Icons (use `hi` set) |
| Storybook 10 | Component development |
| MSW | API mocking for tests |
| Vitest + Playwright | Testing |

---

## Design Guidelines

### Styling

- **Theme**: daisyUI `business` dark theme
- **Colors**: Use semantic names (`text-primary`, `bg-base-200`, etc.)
- **Components**: Use daisyUI classes (`btn`, `card`, `input`, etc.)
- **Icons**: Use `react-icons/hi` (Heroicons), never emojis in UI

### Shared Components

| Component | Usage |
|-----------|-------|
| `LessonHeader` | `<LessonHeader module="1" lesson="4" title="Components" />` |
| `Section` | `<Section title={<>Icon Title</>}>content</Section>` |
| `TakeawayList` | `<TakeawayList items={["Point 1"]} />` |
| `CodeSnippet` | `<CodeSnippet title="Example" language="tsx" code={str} />` |
| `CodeBlock` | `<CodeBlock title="Example" code={str} variant="good" />` |

### Code Snippets

- Store in `examples/` folder with `// @ts-nocheck` header
- Import with `?raw` suffix: `import code from './examples/Ex.tsx?raw'`
- Pass to `CodeSnippet` component (auto-strips `@ts-nocheck`)

---

## Commands

```bash
npm run dev           # Start all servers
npm run dev:app       # App only
npm run dev:storybook # Storybook only
npm run test          # Run all tests
npm run test:lesson -- 1_1  # Test specific lesson
npm run lint          # Lint and fix
npm run format        # Format with Prettier
npm run build         # Build everything
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page | Check browser console for JSX errors |
| `?raw` import errors | Install vite-import-navigator extension |
| Styles not working | Ensure `@plugin "daisyui"` in `index.css` |
| Tests failing | Run `npm run msw:install` if MSW errors |
| View Source broken | Update `projectPath` in `config.json` |

---

## For AI Assistants

1. **Read `PROGRESS.md` first** to see current lesson status
2. **Follow the lesson creation steps** above exactly
3. **Always use TypeScript** (`.tsx` files)
4. **Create Storybook stories** with interaction tests for new demos
5. **Update `PROGRESS.md`** after completing work
6. **URL routing**: `http://localhost:5173/#1.4` loads Lesson 1.4 directly

### Navigation Features

- Hash-based routing (`#1.4`)
- "View Source" button opens lesson in Cursor
- "Copy to Chat" button on last lesson for continuation
