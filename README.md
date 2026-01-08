# 🚀 React & CSS Mastery

An interactive tutorial for React and CSS, designed to be taught through an AI assistant. Features live playground examples, Storybook integration, and progress tracking.

**Two courses available:**
- **React Fundamentals** — 8 modules, 32 lessons (✅ Complete)
- **CSS Mastery** — 4 modules, 12 lessons (⏳ In Progress)

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
│   │   │   ├── react/           ← React lessons
│   │   │   │   ├── 1_1/         ← Lesson folders
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── MyDemo.tsx
│   │   │   │   │   └── examples/
│   │   │   │   └── ...
│   │   │   └── css/             ← CSS lessons
│   │   │       ├── 1_1/
│   │   │       │   ├── index.tsx
│   │   │       │   └── examples/
│   │   │       └── ...
│   │   └── stories/             ← Storybook stories
│   └── package.json
└── vite-import-navigator/       ← VS Code extension
```

---

## Course Modules

### React Fundamentals (✅ Complete)

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

### CSS Mastery (⏳ In Progress)

| Module | Topic | Lessons |
|--------|-------|---------|
| 1 | Core Foundations | Selectors & Parsing, Cascade & Specificity, Box Model |
| 2 | Layout Mastery | Positioning, Flexbox, Grid, Responsive Strategy |
| 3 | Visuals & Interactivity | Backgrounds & Borders, Transitions & Animations |
| 4 | Architecture at Scale | CSS Variables, BEM & Utility CSS, Accessibility |

---

## Creating a New Lesson

### 1. Update `config.json`

```json
{
  "lessons": [
    { "id": "react-1.4", "section": "react", "module": 1, "title": "Components", "description": "..." },
    { "id": "css-2.2", "section": "css", "module": 2, "title": "Flexbox", "description": "..." }
  ]
}
```

### 2. Create Lesson Folder

```
playground/src/lessons/react/1_4/   ← React lessons
├── index.tsx           ← Main lesson component
├── MyDemo.tsx          ← Interactive demo
└── examples/           ← Code snippets (with // @ts-nocheck)
    └── Example1.tsx

playground/src/lessons/css/1_4/     ← CSS lessons
├── index.tsx           ← Main lesson component
├── MyDemo.tsx          ← Interactive demo
└── examples/           ← Code snippets (.css files)
    └── Example1.css
```

### 3. Create Example Code Snippet

**React examples** (`.tsx` files with `// @ts-nocheck`):

```tsx
// playground/src/lessons/react/1_4/examples/Example1.tsx
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

**CSS examples** (`.css` files):

```css
/* playground/src/lessons/css/2_2/examples/FlexCenter.css */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

The `// @ts-nocheck` comment suppresses TypeScript errors for incomplete snippets (missing imports, etc.). The `CodeSnippet` component automatically strips this line from display.

### 4. Main Lesson Component

```tsx
// playground/src/lessons/react/1_4/index.tsx (or css/1_4/index.tsx)
import { HiOutlineBookOpen, HiOutlineClipboardCheck } from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
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
// playground/src/lessons/react/1_4/MyDemo.tsx
import { useState } from 'react';
import { CodeSnippet } from '@components';
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

For CSS lessons, import `.css` files:

```tsx
// playground/src/lessons/css/2_2/FlexDemo.tsx
import { CodeSnippet } from '@components';
import flexCode from './examples/FlexCenter.css?raw';

export default function FlexDemo(): React.ReactElement {
  return (
    <div className="card bg-base-200 p-6">
      <CodeSnippet title="Flexbox Centering" language="css" code={flexCode} />
      {/* Interactive demo */}
    </div>
  );
}
```

### 6. Register in `App.tsx`

Lessons are lazy-loaded. Add to the appropriate section:

```tsx
// React lessons
const ReactLesson1_4 = React.lazy(() => import('./lessons/react/1_4'));

// CSS lessons  
const CSSLesson2_2 = React.lazy(() => import('./lessons/css/2_2'));

const LESSON_COMPONENTS: Record<string, React.LazyExoticComponent<...>> = {
  // React lessons use 'react-X.X' format
  'react-1.4': ReactLesson1_4,
  // CSS lessons use 'css-X.X' format
  'css-2.2': CSSLesson2_2,
};
```

### 7. Create Storybook Stories

```tsx
// playground/src/stories/lessons/react/1_4/MyDemo.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from '@storybook/test';
import MyDemo from '@lessons/react/1_4/MyDemo';

const meta: Meta<typeof MyDemo> = {
  title: 'Lessons/react-1.4/MyDemo',
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

For CSS lessons:

```tsx
// playground/src/stories/lessons/css/2_2/FlexDemo.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import FlexDemo from '@lessons/css/2_2/FlexDemo';

const meta: Meta<typeof FlexDemo> = {
  title: 'Lessons/css-2.2/FlexDemo',
  component: FlexDemo,
};
export default meta;

export const Default: StoryObj<typeof FlexDemo> = {};
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

- Store in `examples/` folder within each lesson
- **React**: `.tsx` files with `// @ts-nocheck` header (auto-stripped)
- **CSS**: `.css` files (no header needed)
- Import with `?raw` suffix: `import code from './examples/Ex.tsx?raw'`
- Pass to `CodeSnippet` component with appropriate `language` prop (`tsx` or `css`)

---

## Commands

```bash
npm run dev                       # Start all servers (app, SSR, storybook)
npm run dev:app                   # App only
npm run dev:storybook             # Storybook only
npm run test                      # Run all tests
npm run test:react                # Run all React lesson tests
npm run test:css                  # Run all CSS lesson tests
npm run test:react:lesson -- 1_1  # Test specific React lesson
npm run test:css:lesson -- 1_1    # Test specific CSS lesson
npm run lint                      # Lint and fix
npm run format                    # Format with Prettier
npm run build                     # Build everything
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
6. **URL routing**: `http://localhost:5173/#react-1.4` or `#css-2.2` loads lessons directly

### Lesson ID Format

- React lessons: `react-X.X` (e.g., `react-1.4`, `react-3.2`)
- CSS lessons: `css-X.X` (e.g., `css-1.1`, `css-2.3`)

### Navigation Features

- Hash-based routing (`#react-1.4`, `#css-2.2`)
- Section switcher dropdown in header (React / CSS)
- "View Source" button opens lesson in Cursor / VSCode / GitHub
