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
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx        ← LESSON NAVIGATOR (imports from lessons/)
        ├── index.css
        └── lessons/
            ├── config.json       ← Lesson metadata (titles, status, modules, projectPath)
            ├── components/       ← Shared UI components
            │   ├── index.js
            │   ├── LessonHeader.jsx
            │   ├── Section.jsx
            │   ├── TakeawayList.jsx
            │   └── CodeBlock.jsx
            ├── 1_1/              ← Lesson 1.1: What is React?
            │   ├── index.jsx     ← Main lesson component
            │   ├── ComparisonDemo.jsx
            │   ├── ComponentTreeDemo.jsx
            │   └── VirtualDomDemo.jsx
            ├── 1_2/              ← Lesson 1.2: Setting Up
            │   ├── index.jsx
            │   └── ...
            └── 1_3/              ← Lesson 1.3: Understanding JSX
                ├── index.jsx
                └── ...
```

### Key Architecture

1. **Each lesson is a folder** (e.g., `1_1/`, `1_2/`) with its own `index.jsx` and helper components
2. **Shared components** live in `lessons/components/` for reuse across lessons
3. **Lesson metadata** is in `config.json` - edit this for titles, status, modules, and project path
4. **Component registration** is in `App.jsx` - add imports and `LESSON_COMPONENTS` mapping
5. **URL hash routing** - Direct links like `http://localhost:5173/#1.3` load specific lessons
6. **View Source button** - Each lesson has a link to open its source file in Cursor
7. **Copy to Chat button** - When on the last implemented lesson, the "Next" button becomes a green "📋 Copy to Chat" button that copies a message like "Let's continue to Lesson X.X: Title" to the clipboard for pasting in the AI chat

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

### Step 3: Create index.jsx (Main Lesson)

```jsx
// playground/src/lessons/1_4/index.jsx
import { LessonHeader, Section, TakeawayList } from '../components';
import MyDemo from './MyDemo';

export default function Lesson1_4() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="4" title="Components" />
      
      <Section title="📖 Concept">
        <p className="leading-relaxed text-base-content/70">
          Explanation with <strong className="text-primary">highlighted</strong> terms...
        </p>
        <MyDemo />
      </Section>

      <Section title="✅ Key Takeaways">
        <TakeawayList items={["Takeaway 1", "Takeaway 2"]} />
      </Section>
    </div>
  );
}
```

### Step 4: Create Helper Components (with daisyUI)

```jsx
// playground/src/lessons/1_4/MyDemo.jsx
import { useState } from 'react';

export default function MyDemo() {
  const [value, setValue] = useState(0);
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

### Step 5: Register in App.jsx

```jsx
// Add import
import Lesson1_4 from './lessons/1_4';

// Add to LESSON_COMPONENTS
const LESSON_COMPONENTS = {
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
| `Section` | `<Section title="📖 Topic">content</Section>` |
| `TakeawayList` | `<TakeawayList items={["Point 1", "Point 2"]} />` |
| `CodeBlock` | `<CodeBlock title="Example" code={codeString} variant="good" />` |

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

### Interactive Demos Should:
- Be self-contained in their own `.jsx` file
- Have clear instructions ("Click to...", "Type to...")
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
| `tailwindcss` | v4 | Utility-first CSS framework |
| `daisyui` | v5 | Component library for Tailwind |
| `react-icons` | latest | Icon library (Heroicons, etc.) |

### CSS Setup (`playground/src/index.css`)

```css
@import 'tailwindcss';
@plugin "daisyui" {
  themes: dark --default;
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
