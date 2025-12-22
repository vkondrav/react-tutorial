# 🤖 LLM Guide: React Tutorial Course

> This document provides context for AI assistants helping users learn React through this interactive course.

## Overview

This is an **interactive React tutorial** designed to be taught through an AI assistant (like Claude in Cursor). The course combines:

1. **Markdown lesson content** in `/modules/` - explanations and concepts
2. **Live React playground** in `/playground/` - interactive examples the user can see in their browser
3. **Progress tracking** in `PROGRESS.md` - current lesson and completion status

## How This Course Works

### Teaching Approach

1. **Read `PROGRESS.md` first** to understand where the user left off
2. **Create/update lesson files** in `playground/src/lessons/`
3. **Walk the user through concepts** with explanations
4. **Use the browser tools** to demonstrate the live examples
5. **Update `PROGRESS.md`** after completing each lesson

### File Structure

```
react-tutorial/
├── STARTING_POINT.md      ← You are here (LLM instructions)
├── PROGRESS.md            ← Track user's progress (UPDATE THIS)
├── COURSE_OUTLINE.md      ← Full curriculum overview
├── modules/               ← Lesson content (Markdown - reference)
│   ├── 01-foundation/
│   ├── 02-core-concepts/
│   └── ...
└── playground/            ← Live React app
    ├── index.html
    ├── package.json
    ├── tsconfig.json      ← TypeScript config (strict, no JS allowed)
    ├── vite.config.js
    └── src/
        ├── main.tsx       ← TypeScript entry point
        ├── App.tsx        ← LESSON NAVIGATOR (TypeScript)
        ├── index.css
        └── lessons/
            ├── config.json       ← Lesson metadata (titles, status, modules, projectPath)
            ├── components/       ← Shared UI components (TypeScript)
            │   ├── index.ts
            │   ├── LessonHeader.tsx
            │   ├── Section.tsx
            │   ├── TakeawayList.tsx
            │   ├── CodeBlock.tsx
            │   └── CodeSnippet.tsx
            ├── 1_1/              ← Lesson 1.1: What is React? (TypeScript)
            │   ├── index.tsx
            │   └── ...
            ├── 3_5/              ← Lesson 3.5: Custom Hooks (TypeScript)
            │   ├── index.tsx     ← Main lesson component
            │   ├── CustomHookBasicsDemo.tsx
            │   ├── ExtractingLogicDemo.tsx
            │   ├── CommonHooksDemo.tsx
            │   └── CustomHooksPlayground.tsx
            └── 4_1/              ← All lessons use TypeScript
                ├── index.tsx
                └── ...
```

### Key Architecture

1. **Each lesson is a folder** (e.g., `1_1/`, `1_2/`) with its own `index.tsx` and helper components
2. **Shared components** live in `lessons/components/` for reuse across lessons
3. **Lesson metadata** is in `config.json` - edit this for titles, status, modules, and project path
4. **Component registration** is in `App.jsx` - add imports and `LESSON_COMPONENTS` mapping
5. **URL hash routing** - Direct links like `http://localhost:5173/#1.3` load specific lessons
6. **View Source button** - Each lesson has a link to open its source file in Cursor
7. **Copy to Chat button** - When on the last implemented lesson, the "Next" button becomes a green "📋 Copy to Chat" button that copies a message like "Let's continue to Lesson X.X: Title" to the clipboard for pasting in the AI chat

### TypeScript Guidelines

**All new lessons should be written in TypeScript** (`.tsx` files).

| Rule | Details |
|------|---------|
| **File extension** | Use `.tsx` for components, `.ts` for utilities |
| **Props** | Define interfaces for all component props |
| **Hook returns** | Define return type interfaces for custom hooks |
| **Generics** | Use generics for reusable hooks (e.g., `useLocalStorage<T>`) |
| **Code samples** | Show TypeScript syntax in displayed code snippets |

```tsx
// Example: Typed custom hook
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function useCounter(initialValue: number = 0, step: number = 1): UseCounterReturn {
  const [count, setCount] = useState(initialValue);
  // ...
  return { count, increment, decrement, reset };
}
```

**Note:** All lessons and shared components are TypeScript. The `tsconfig.json` does **not** allow JavaScript files to prevent accidental introduction of `.js/.jsx` files.

## Instructions for Creating a New Lesson

### Step 1: Update config.json

```json
{
  "projectPath": "/path/to/playground/src/lessons",  // For "View Source" links
  "lessons": [
    // ... existing lessons ...
    { "id": "1.4", "module": 1, "title": "Components", "status": "current" }
  ],
  "modules": [...]
}
```

### Step 2: Create the Lesson Folder

```
mkdir playground/src/lessons/1_4
```

### Step 3: Create index.tsx (Main Lesson)

```tsx
// playground/src/lessons/1_4/index.tsx
import { HiOutlineBookOpen, HiOutlineClipboardCheck } from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import MyDemo from './MyDemo';

export default function Lesson1_4(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="4" title="Components" />
      
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBookOpen className="text-primary" size={20} />
            Concept
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70">
          Explanation with <strong className="text-primary">highlighted</strong> terms...
        </p>
        <MyDemo />
      </Section>

      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineClipboardCheck className="text-primary" size={20} />
            Key Takeaways
          </span>
        }
      >
        <TakeawayList items={["Takeaway 1", "Takeaway 2"]} />
      </Section>
    </div>
  );
}
```

### Step 4: Create Helper Components (with daisyUI + TypeScript)

```tsx
// playground/src/lessons/1_4/MyDemo.tsx
import { useState } from 'react';

interface MyDemoProps {
  initialValue?: number;
}

export default function MyDemo({ initialValue = 0 }: MyDemoProps): React.ReactElement {
  const [value, setValue] = useState<number>(initialValue);
  
  return (
    <div className="card bg-base-200 p-6">
      <p className="text-xl mb-4">
        Value: <span className="text-primary font-bold">{value}</span>
      </p>
      <button 
        onClick={() => setValue(v => v + 1)}
        className="btn btn-primary"
      >
        Increment
      </button>
    </div>
  );
}
```

### Step 5: Register in App.tsx

```tsx
// Add import
import Lesson1_4 from './lessons/1_4';

// Add to LESSON_COMPONENTS
const LESSON_COMPONENTS: Record<string, LessonComponent> = {
  '1.1': Lesson1_1,
  '1.2': Lesson1_2,
  '1.3': Lesson1_3,
  '1.4': Lesson1_4,  // ← Add here
};
```

### Step 6: Update Progress

Update `PROGRESS.md` to mark the previous lesson complete and set the new one as current.

## Design Guidelines

### Tech Stack
- **TypeScript** - All new lessons use `.tsx` files with proper type annotations
- **Tailwind CSS v4** - Utility-first CSS framework
- **daisyUI v5** - Component library for Tailwind (provides `btn`, `card`, `input`, etc.)
- **react-icons** - Icon library (using Heroicons set: `HiOutlineMenuAlt2`, etc.)

### Visual Style (daisyUI Dark Theme)
- **Theme**: `dark` theme enabled via `@plugin "daisyui" { themes: dark --default; }`
- **Semantic colors**: Use daisyUI color names that adapt to theme:
  - `text-primary` / `bg-primary` - Main accent (blue)
  - `text-secondary` / `bg-secondary` - Secondary accent (purple)
  - `text-accent` / `bg-accent` - Tertiary accent (pink)
  - `text-success` / `bg-success` - Success states (green)
  - `text-error` / `bg-error` - Error states (red)
  - `text-base-content` - Default text color
  - `text-base-content/70` - Muted text (70% opacity)
  - `bg-base-100` - Page background
  - `bg-base-200` - Card/section background
  - `bg-base-300` - Elevated elements

### daisyUI Components to Use

| Component | Classes | Example |
|-----------|---------|---------|
| Button | `btn btn-primary btn-lg` | `<button className="btn btn-primary">Click</button>` |
| Input | `input input-bordered` | `<input className="input input-bordered w-full" />` |
| Card | `card bg-base-200 p-6` | `<div className="card bg-base-200 p-6">...</div>` |
| Badge | `badge badge-primary` | `<span className="badge badge-primary">Tag</span>` |
| Checkbox | `checkbox checkbox-primary` | `<input type="checkbox" className="checkbox" />` |

### Shared Components

| Component | Usage |
|-----------|-------|
| `LessonHeader` | `<LessonHeader module="1" lesson="3" title="Understanding JSX" />` |
| `Section` | `<Section title={<span className="flex items-center gap-2"><Icon /> Title</span>}>content</Section>` |
| `TakeawayList` | `<TakeawayList items={["Point 1", "Point 2"]} />` |
| `CodeBlock` | `<CodeBlock title="Example" code={codeString} variant="good" />` |
| `CodeSnippet` | `<CodeSnippet title="Example" language="tsx" code={codeString} />` |

Note: `Section` accepts JSX for the `title` prop, allowing icons to be included.

### Code Snippet Best Practices (NEW)

**For new lessons**, store code examples in separate files and import them using Vite's `?raw` feature:

```
lessons/
└── 6_5/
    ├── index.tsx
    ├── MyDemo.tsx
    └── examples/           ← Store code snippets here
        ├── Example1.tsx
        └── Example2.tsx
```

**Step 1:** Create the example file with `// @ts-nocheck` at the top (to suppress TypeScript errors for incomplete snippets):

```tsx
// lessons/6_5/examples/Example1.tsx
// @ts-nocheck
function MyExample() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Step 2:** Add the `?raw` module declaration (already in `vite-env.d.ts`):

```typescript
// src/vite-env.d.ts
declare module '*?raw' {
  const content: string;
  export default content;
}
```

**Step 3:** Import and use in your demo component:

```tsx
// lessons/6_5/MyDemo.tsx
import exampleCode from './examples/Example1.tsx?raw';
import { CodeSnippet } from '../components';

export default function MyDemo() {
  return (
    <CodeSnippet
      title="Example"
      language="tsx"
      code={exampleCode}
    />
  );
}
```

**Benefits:**
- IDE syntax highlighting in example files
- Easier to read/edit than inline template strings
- `CodeSnippet` automatically strips `// @ts-nocheck` from display
- Keeps demo components clean and focused on logic

**Note:** Existing lessons (1.1 - 6.4) still use inline code strings. A refactor to this pattern is planned.

### Using Icons (react-icons)

```jsx
// Import from the appropriate icon set
import { HiOutlineMenuAlt2, HiOutlineArrowLeft } from 'react-icons/hi';
import { FaReact } from 'react-icons/fa';

// Use as components
<HiOutlineMenuAlt2 size={20} />
<FaReact className="text-primary" />
```

Common icon sets: `hi` (Heroicons), `fa` (Font Awesome), `fi` (Feather), `md` (Material Design)

### Icons vs Emojis Rule
- **Use react-icons** for all UI elements (section titles, buttons, instructions)
- **Emojis are OK** only inside code examples/snippets that users are learning from
- This ensures a professional, consistent look across the app

Common icon replacements:
| Old (Emoji) | New (Icon) | Import |
|-------------|------------|--------|
| 🎯 / 💡 | `HiOutlineLightBulb` | `react-icons/hi` |
| ⚔️ / ↔️ | `HiOutlineSwitchHorizontal` | `react-icons/hi` |
| 🧱 / 📦 | `HiOutlineViewGrid` | `react-icons/hi` |
| ⚡ | `HiOutlineLightningBolt` | `react-icons/hi` |
| ✅ | `HiOutlineClipboardCheck` | `react-icons/hi` |
| 👇 / 👆 | `HiOutlineCursorClick` | `react-icons/hi` |
| 👋 | `HiOutlineHand` | `react-icons/hi` |
| ✓ | `HiCheck` | `react-icons/hi` |
| ✗ | `HiX` | `react-icons/hi` |

### Interactive Demos Should:
- Be self-contained in their own `.jsx` file
- Have clear instructions (with icons, not emojis)
- Show immediate visual feedback
- Teach ONE concept clearly

### Each Lesson Should:
- Take 15-30 minutes to complete
- Have 3-5 interactive demos
- Include practical exercises
- End with clear takeaways

## Course Modules Summary

| Module | Focus | Key Concepts |
|--------|-------|--------------|
| 1 | Foundation | React intro, JSX, Components |
| 2 | Core Concepts | Props, State, Events, Lists |
| 3 | Hooks | useEffect, useContext, useRef, Custom Hooks |
| 4 | Forms | Controlled inputs, Validation |
| 5 | Patterns | Composition, Render Props, HOCs |
| 6 | State Management | Lifting state, useReducer, Context |
| 7 | Best Practices | Structure, Performance, Testing |
| 8 | Capstone | Build a complete Task Manager app |

## Common User Requests

| Request | Action |
|---------|--------|
| "Continue" / "Next lesson" | Load the next lesson from PROGRESS.md |
| "Go back" / "Previous" | Navigate to previous lesson in browser |
| "Explain X again" | Re-explain with different examples |
| "Show me the code" | Display relevant component file |
| "I don't understand Y" | Break down concept with simpler demo |

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | latest | Type safety for React components |
| `@types/react` | latest | React type definitions |
| `@types/react-dom` | latest | React DOM type definitions |
| `tailwindcss` | v4 | Utility-first CSS framework |
| `daisyui` | v5 | Component library for Tailwind |
| `react-icons` | latest | Icon library (Heroicons, etc.) |

### CSS Setup (`playground/src/index.css`)

```css
@import 'tailwindcss';
@plugin "daisyui" {
  themes: business --default;
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Dev server not running | `cd playground && npm run dev` |
| Blank page | Check browser console, fix JSX errors |
| HMR not working | Restart dev server |
| Fast refresh error | Each component file should export only one component |
| View Source not working | Update `projectPath` in `config.json` to match your system |
| Wrong lesson on load | Check URL hash matches a valid lesson ID (e.g., `#1.3`) |
| daisyUI styles not working | Ensure `@plugin "daisyui"` is in `index.css` |
| Icons not showing | Import from correct react-icons package (e.g., `react-icons/hi`) |
| "setState synchronously within effect" linter error | Wrap setState in `queueMicrotask(() => setState(...))` to defer it |
| "Cannot call impure function during render" | Move impure calls (e.g., `Date.now()`) into `useEffect`, not in render or ref initializers |

## Tips for Effective Teaching

1. **Start with "why"** before "how"
2. **Use analogies** (LEGO blocks for components, etc.)
3. **Build on previous lessons** - reference what they learned
4. **Celebrate progress** - acknowledge completed lessons
5. **Be patient** with questions - explain differently if needed
6. **Make it interactive** - don't just lecture, let them click/type

---

## Quick Start for New Session

```
1. Read PROGRESS.md
2. Greet user: "Welcome back! You're on [Lesson X]. Ready to continue?"
3. If dev server not running: cd playground && npm run dev
4. Navigate browser to http://localhost:5173/#X.Y (use hash for specific lesson)
5. Continue teaching from where they left off
```

## Navigation Features

| Feature | Description |
|---------|-------------|
| **URL Hash Routing** | `http://localhost:5173/#1.3` loads Lesson 1.3 directly |
| **View Source Button** | `</> View Source` in header opens lesson file in Cursor |
| **Browser Back/Forward** | Works with lesson navigation |
| **Bookmarkable URLs** | Share or bookmark any lesson URL |

---

*This course is designed to make React learning hands-on and engaging. The combination of explanations + live demos + progress tracking creates an effective learning experience.*
