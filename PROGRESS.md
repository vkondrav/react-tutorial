# 📊 Course Progress Tracker

> Last Updated: December 25, 2025

## Current Status

| Field | Value |
|-------|-------|
| **Current Module** | Module 8: Advanced Topics |
| **Current Lesson** | 8.4 RSC: Intro to React Server Components ✅ |
| **Next Lesson** | TBD |
| **Dev Server** | Running at http://localhost:5173 |
| **SSR Server** | Running at http://localhost:3001 (via proxy at /ssr-demo) |
| **Language** | **TypeScript** (from Lesson 3.5 onward) |

---

## TypeScript Migration ✅ Complete

| Status | Details |
|--------|---------|
| **All Lessons** | Converted to TypeScript (`.tsx`) |
| **Core Files** | `main.tsx`, `App.tsx` — fully typed |
| **Shared Components** | All in TypeScript with prop interfaces |
| **Config** | `tsconfig.json` with `allowJs: false` — JS files will cause errors |

---

## 🔧 Tech Debt Tracker

> **Phase: Cleanup** — Refactoring lessons 1.1 through 7.4 to meet current standards.

### Summary of Standards

| Standard | Description |
|----------|-------------|
| **TypeScript** | All components should be `.tsx` with proper types |
| **CodeSnippet** | Use `CodeSnippet` component for all code displays |
| **examples/ folder** | Store code snippets in separate files with `?raw` imports |
| **react-icons** | Use icons instead of emojis in UI |
| **daisyUI** | Use daisyUI components and semantic colors |
| **Storybook** | Stories for each component + interaction tests |

#### CodeSnippet Usage Notes

- **Static code** → Create files in `examples/` folder, import with `?raw`, pass to `CodeSnippet`
- **Dynamic code** (changes based on user input) → Generate string inline, pass to `CodeSnippet`
- **Never use raw `<pre><code>` elements** — always use `CodeSnippet` for consistent syntax highlighting

#### Storybook Coverage Notes (Added Dec 14, 2025)

**What was done for Lesson 1.1:**
- Installed Storybook 10.1.8 with React + Vite configuration
- Configured Tailwind CSS + daisyUI integration in `.storybook/preview.ts`
- Created stories for shared components: `LessonHeader`, `Section`, `TakeawayList`, `CodeSnippet`, `CodeBlock`
- Created stories for 1.1 components: `ComparisonDemo`, `ComponentTreeDemo`, `VirtualDomDemo`, `Lesson` (full page)
- Added interaction tests (play functions) for all 1.1 interactive components:
  - `ComparisonDemo`: Counter increment/decrement/reset tests
  - `ComponentTreeDemo`: Component selection/toggle tests  
  - `VirtualDomDemo`: Typing, DOM updates counter, empty input tests
- Test command: `npm test` (runs vitest with Playwright browser)

**What needs to be done for all other lessons:**
1. Create story files in `src/stories/lessons/{lesson}/` folder
2. Add stories for each interactive demo component
3. Add play functions for components with user interactions
4. Ensure all stories render correctly with Tailwind/daisyUI styling
5. Run `npm run format` to format all files
6. Run `npm run lint` and fix any errors that arise
7. Run `npm run test` to see that all tests pass. Individual lesson can be run with `npm run test:lesson -- 2_1`
8. Update the table below with status

**Lesson Story Naming Convention (IMPORTANT):**
- All `Lesson.stories.tsx` files MUST use the title format: `'Lessons/{id}/Lesson'`
- Example: `title: 'Lessons/1.1/Lesson'`, `title: 'Lessons/3.2/Lesson'`
- Do NOT include the lesson name in the title (e.g., ❌ `'Lessons/1.1 What is React/Lesson'`)
- This ensures predictable Storybook URLs: `lessons-{id}-lesson--default`
- The app uses this pattern in `getLessonStorybookLink()` to link directly to lesson stories

**MSW Setup for API Mocking (Added Dec 15, 2025):**
- Installed `msw` and `msw-storybook-addon` for API mocking in tests
- Mock handlers in `src/mocks/handlers.ts` for JSONPlaceholder API
- MSW initialized in `.storybook/preview.ts` via `msw-storybook-addon`
- Stories can override handlers per-story using `parameters.msw.handlers`
- Example: Loading state test with infinite delay, Error state with 500 response

### Consolidated Tech Debt by Lesson

| Lesson | TypeScript | CodeSnippet | examples/ | Icons | Storybook      | Status             |
|--------|------------|-------------|-----------|-------|----------------|--------------------|
| 1.1    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 1.2    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 1.3    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 1.4    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 2.1    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 2.2    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 2.3    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 2.4    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 2.5    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 3.1    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 3.2    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 3.3    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 3.4    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 3.5    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 4.1    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 4.2    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 4.3    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 4.4    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 5.1    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 5.2    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 5.3    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 6.1    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 6.2    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 6.3    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 6.4    | ✅ .tsx    | ✅          | ✅         | ✅    | ⬜ Needs Work   | ⚠️ Needs Work      |
| 6.5    | ✅ .tsx    | ✅          | ✅         | ✅    | ⬜ Needs Work   | ⚠️ Needs Work      |
| 7.1    | ✅ .tsx    | ✅          | ✅         | ✅    | ⬜ Needs Work   | ⚠️ Needs Work      |
| 7.2    | ✅ .tsx    | ✅          | ✅         | ✅    | ⬜ Needs Work   | ⚠️ Needs Work      |
| 7.3    | ✅ .tsx    | ✅          | ✅         | ✅    | ⬜ Needs Work   | ⚠️ Needs Work      |
| 7.4    | ✅ .tsx    | ✅          | ✅         | ✅    | ⬜ Needs Work   | ⚠️ Needs Work      |
| 8.1    | ✅ .tsx    | ✅          | N/A        | ✅    | ✅ Done         | ✅ Done            |
| 8.2    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 8.3    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |
| 8.4    | ✅ .tsx    | ✅          | ✅         | ✅    | ✅ Done         | ✅ Done            |

### Shared Components

| Component | TypeScript | Storybook | Status |
|-----------|------------|-----------|--------|
| `LessonHeader.tsx` | ✅ .tsx | ✅ Done | ✅ Done |
| `Section.tsx` | ✅ .tsx | ✅ Done | ✅ Done |
| `TakeawayList.tsx` | ✅ .tsx | ✅ Done | ✅ Done |
| `CodeBlock.tsx` | ✅ .tsx | ✅ Done | ✅ Done |
| `CodeSnippet.tsx` | ✅ .tsx | ✅ Done | ✅ Done |
| `index.ts` | ✅ .ts | N/A | ✅ Done |

### Core App Files

| File | TypeScript | Status |
|------|------------|--------|
| `main.tsx` | ✅ .tsx | ✅ Done |
| `App.tsx` | ✅ .tsx | ✅ Done |

### Refactoring Order

1. **Shared components** → Convert to TypeScript first (used everywhere)
2. **Lesson 1.1** → First lesson, set the pattern
3. **Lessons 1.2 - 3.4** → JavaScript lessons in order
4. **Lessons 3.5 - 6.4** → Add CodeSnippet + examples/ folder
5. **Final pass** → Verify all lessons match standards

---

## Module Progress

### Module 1: Foundation ✅ Complete!

| Lesson | Topic | Status | Notes |
|--------|-------|--------|-------|
| 1.1 | What is React & Why Use It? | ✅ Complete | Interactive demos: counter, component tree, virtual DOM |
| 1.2 | Setting Up Your First React App | ✅ Complete | Project structure explorer, file flow, HMR demo |
| 1.3 | Understanding JSX | ✅ Complete | JSX transform, differences, embedding, rules, playground |
| 1.4 | Components: Your First Building Block | ✅ Complete | Basics demo, 3 rules, composition tree, component builder |

### Module 2: Core Concepts ⏳ In Progress

| Lesson | Topic | Status | Notes |
|--------|-------|--------|-------|
| 2.1 | Props: Passing Data to Components | ✅ Complete | Basics, destructuring, defaults, children, playground |
| 2.2 | State with useState Hook | ✅ Complete |
| 2.3 | Event Handling | ✅ Complete |
| 2.4 | Conditional Rendering | ✅ Complete | Ternary, &&, early returns, pattern comparison, playground |
| 2.5 | Lists & Keys | ✅ Complete | .map() basics, keys explained, key mistakes demo, filter/sort/transform, todo playground |

### Module 3: Hooks Deep Dive ✅ Complete!

| Lesson | Topic | Status | Notes |
|--------|-------|--------|-------|
| 3.1 | useEffect: Side Effects & Lifecycle | ✅ Complete | Effect basics, dependency array, cleanup, timing, playground |
| 3.2 | useContext: Sharing State | ✅ Complete | Prop drilling, context basics, context + state, multiple contexts, playground |
| 3.3 | useRef: DOM Access & Persistence | ✅ Complete | Ref basics, DOM access, persistent values, previous values, playground |
| 3.4 | useMemo & useCallback: Performance | ✅ Complete | Render count, useMemo, useCallback, when to use, playground |
| 3.5 | Custom Hooks: Reusable Logic | ✅ Complete | Hook basics, extracting logic, useToggle/useLocalStorage/useDebounce, playground |

### Module 4: Data Fetching & REST APIs ✅ Complete!

| Lesson | Topic | Status | Notes |
|--------|-------|--------|-------|
| 4.1 | Fetching Data with useEffect | ✅ Complete | Basic fetch pattern, dependencies, race conditions, AbortController, playground |
| 4.2 | Loading, Error & Empty States | ✅ Complete | Spinner/skeleton/progress/shimmer, error types/inline/toast, empty states, composition, playground |
| 4.3 | Creating & Updating Data (POST/PUT/DELETE) | ✅ Complete | POST/PUT/PATCH/DELETE patterns, optimistic vs pessimistic updates, full CRUD playground |
| 4.4 | Building a Custom useFetch Hook | ✅ Complete | Why useFetch, step-by-step implementation, TypeScript generics, React 19 Suspense approach, playground |

### Module 5: Forms & User Input ✅ Complete!

| Lesson | Topic | Status | Notes |
|--------|-------|--------|-------|
| 5.1 | Controlled Components | ✅ Complete | Basics, uncontrolled vs controlled, input types, benefits, playground |
| 5.2 | Form Validation Patterns | ✅ Complete | Timing approaches, rules (required/length/pattern/custom), error display, async validation, playground |
| 5.3 | Handling Multiple Inputs | ✅ Complete | Single state object, name attribute pattern, dynamic fields, nested objects, form reset, playground |

### Module 6: Component Patterns ⏳ In Progress

| Lesson | Topic | Status | Notes |
|--------|-------|--------|-------|
| 6.1 | Component Composition | ✅ Complete | Why composition, children prop, slot pattern, specialization, playground |
| 6.2 | Render Props Pattern | ✅ Complete | Basics, children as function, mouse/fetch/list use cases, playground |
| 6.3 | Higher-Order Components | ✅ Complete | HOC basics, withAuth/withLoading/withTheme, patterns & conventions, playground |
| 6.4 | Compound Components | ✅ Complete | Compound basics, Context pattern, flexible API design, Tabs/Menu/Select playground |
| 6.5 | Activity: Preserving Hidden State | ✅ Complete | State preservation problem, CSS hiding approach, React 19 Activity concept, playground |

### Module 7: State Management ✅ Complete!

| Lesson | Topic | Status | Notes |
|--------|-------|--------|-------|
| 7.1 | Lifting State Up | ✅ Complete | Why lift state, lifting pattern, guidelines, shopping cart/wizard/converter playground |
| 7.2 | useReducer for Complex State | ✅ Complete | useState vs useReducer, reducer basics, action patterns, todo/cart/form demos |
| 7.3 | Context + Reducer Pattern | ✅ Complete | Why combine, 6-step setup, separate contexts, custom providers, theme/todo/cart demos |
| 7.4 | When to Use External State Libraries | ✅ Complete | When built-in is enough, pain points, library overview (Zustand/Redux/Query/Jotai), decision flowchart |

### Module 8: Advanced Topics ⏳ In Progress

| Lesson | Topic | Status | Notes |
|--------|-------|--------|-------|
| 8.1 | Server-Side Rendering | ✅ Complete | CSR vs SSR comparison, hydration demo, decision framework, live SSR server |
| 8.2 | Testing Strategies | ✅ Complete | Testing pyramid, Storybook setup, MSW mocking, play functions, interaction tests |
| 8.3 | Server State with TanStack Query | ✅ Complete | useQuery, useMutation, cache invalidation, stale/fresh data |
| 8.4 | RSC: Intro to React Server Components | ✅ Complete | Server vs Client components, "use client" directive, RSC patterns |

### Module 9: Capstone ⏸️ Deferred

> **Note:** The capstone project is being deferred for now.

---

## Session History

### Session 1 - December 5, 2025
- ✅ Created course outline and project structure
- ✅ Set up Vite + React playground
- ✅ Completed Lesson 1.1 with interactive demos
- ✅ Completed Lesson 1.2 with project structure explorer
- ✅ Completed Lesson 1.3 with JSX transform, differences, embedding, rules, playground
- 📝 User caught inconsistency in Section count (good attention to detail!)
- 📝 Fixed "Components in Action" to use click instead of hover
- 🔧 Refactored to folder-per-lesson structure (e.g., `1_1/index.jsx` with helper components)
- 🔧 Extracted shared components to `lessons/components/`
- 🔧 Moved lesson metadata to `lessons/config.json`

---

### Session 2 - December 6, 2025
**Goal:** Refactoring the application to use Tailwind CSS instead of inline styles

#### Completed:
- ✅ Refactored Module 1 lessons to Tailwind (1_1, 1_2, 1_3, 1_4)
- ✅ Refactored Lesson 2.1 (Props) to Tailwind:
  - `index.jsx` - Main lesson layout
  - `PropsBasicsDemo.jsx` - Props introduction demo
  - `PropsPlayground.jsx` - Interactive props editor
  - `DefaultPropsDemo.jsx` - Default values demo
  - `DestructuringDemo.jsx` - Destructuring comparison
  - `ChildrenDemo.jsx` - Children prop demo
- ✅ Refactored Lesson 2.2 (State with useState) to Tailwind:
  - `index.jsx` - Main lesson layout
  - `StateBasicsDemo.jsx` - Counter demo with code toggle
  - `StateVsPropsDemo.jsx` - Comparison table and interactive demo
  - `MultipleStateDemo.jsx` - Form with multiple state values
  - `StateUpdatesDemo.jsx` - Batching and functional updates demo
  - `StatePlayground.jsx` - Complete todo app example
- 🔧 Fixed CSS conflict in `index.css` - removed global reset (`* { padding: 0 }`) that was overriding Tailwind utility classes
  - Tailwind v4's preflight already handles CSS reset

#### Progress: 6/8 lessons refactored
- Module 1: ✅ Complete (1_1, 1_2, 1_3, 1_4)
- Module 2: 🔄 In Progress (2_1 ✅, 2_2 ✅, 2_3 ⬜, 2_4 ⬜)

---

### Session 3 - December 6, 2025
**Goal:** Refactoring to use daisyUI for cleaner, more maintainable code

#### Completed:
- ✅ Installed daisyUI v5 (compatible with Tailwind CSS 4)
- ✅ Added daisyUI plugin to `index.css` with dark theme
- ✅ Installed react-icons for better iconography
- ✅ **Refactored App.jsx (main navigator):**
  - Converted all inline styles to Tailwind/daisyUI classes
  - Sidebar uses flex layout with fixed logo/progress, scrollable nav
  - Header/footer buttons use `btn` components
  - Toast notification uses daisyUI `toast` and `alert` components
  - Menu toggle uses react-icons (`HiOutlineMenuAlt2`, `HiOutlineArrowLeft`)
  - ~46% code reduction (370 → 200 lines of styling)
- ✅ **Refactored Lesson 1.1 to use daisyUI:**
  - `index.jsx` - Semantic colors (`text-primary`, `text-accent`, `text-success`)
  - `ComparisonDemo.jsx` - `btn btn-primary`, `btn btn-error`, `btn btn-outline`
  - `ComponentTreeDemo.jsx` - daisyUI button variants, `badge` component
  - `VirtualDomDemo.jsx` - `input input-bordered`, `card` component
- ✅ **Refactored Shared Components to use daisyUI + react-icons:**
  - `LessonHeader.jsx` - Tailwind classes, semantic `text-primary`, gradient text
  - `Section.jsx` - daisyUI `card bg-base-200` component, accepts JSX for title prop
  - `TakeawayList.jsx` - react-icons `HiCheck`, daisyUI `bg-success` badge
  - `CodeBlock.jsx` - react-icons `HiCheck`/`HiX`, daisyUI semantic colors (`success`/`error`)
- ✅ **Replaced all emojis with react-icons in Lesson 1.1:**
  - Section titles use icons (`HiOutlineLightBulb`, `HiOutlineSwitchHorizontal`, etc.)
  - Instruction text uses `HiOutlineCursorClick` instead of 👇/👆
  - Hello greeting uses `HiOutlineHand` instead of 👋
- ✅ **Refactored Lesson 1.2 to use daisyUI + react-icons:**
  - `index.jsx` - Replaced emojis with icons (`HiOutlineFolder`, `HiOutlineLink`, `HiOutlineLightningBolt`, `HiOutlineCube`, `HiOutlineClipboardCheck`)
  - `ProjectStructureExplorer.jsx` - daisyUI `card`, `badge` components, semantic colors, react-icons for file icons
  - `FileFlowDemo.jsx` - daisyUI `btn` components with variants, `HiOutlineArrowRight`, `HiOutlineCursorClick`
  - `HMRDemo.jsx` - daisyUI `card`, `btn`, `input` components
  - `PackageJsonExplorer.jsx` - daisyUI `btn` components, `HiOutlinePlay`, `HiOutlineCube` icons
- ✅ **Refactored Lesson 1.3 to use daisyUI + react-icons:**
  - `index.jsx` - Replaced emojis with icons (`HiOutlineQuestionMarkCircle`, `HiOutlineSwitchHorizontal`, `HiOutlineCode`, `HiOutlineDocumentText`, `HiOutlineExclamationCircle`, `HiOutlineBeaker`, `HiOutlineClipboardCheck`)
  - `JSXTransformDemo.jsx` - daisyUI `card`, `btn-circle` components, `HiCheck`, `HiOutlineArrowRight`, `HiOutlineCursorClick` icons
  - `DifferencesExplorer.jsx` - daisyUI `btn`, `card` components, semantic colors (error, warning, success, primary)
  - `EmbeddingDemo.jsx` - daisyUI `input`, `card` components, `HiOutlineArrowRight` icon
  - `JSXRulesDemo.jsx` - daisyUI `btn`, `card`, `badge` components, `HiX`, `HiCheck` icons
  - `MistakesQuiz.jsx` - daisyUI `card` component, `HiOutlineExclamationCircle`, `HiCheck`, `HiOutlineArrowRight` icons
  - `JSXPlayground.jsx` - daisyUI `input`, `card`, `badge`, `checkbox`, `range` components, `HiOutlineCheckCircle`, `HiOutlineXCircle` icons
- ✅ **Refactored Lesson 1.4 to use daisyUI + react-icons:**
  - `index.jsx` - Replaced emojis with icons (`HiOutlineCube`, `HiOutlineDocumentText`, `HiOutlinePuzzle`, `HiOutlineCog`, `HiOutlineClipboardCheck`)
  - `ComponentBasicsDemo.jsx` - daisyUI `card` component, `HiOutlineLightBulb` icon, semantic colors
  - `ComponentRulesDemo.jsx` - daisyUI `btn`, `card`, `badge` components, `HiX`, `HiCheck`, `HiOutlineLightBulb`, `HiOutlineExclamationCircle`, `HiOutlineCursorClick` icons
  - `ComponentBuilder.jsx` - daisyUI `input`, `card`, `btn` components, `HiOutlineExclamationCircle` icon
  - `CompositionDemo.jsx` - daisyUI `card` component, removed emoji from logo, semantic colors
- ✅ **Refactored Lesson 2.1 to use daisyUI + react-icons:**
  - `index.jsx` - Replaced emojis with icons (`HiOutlineCube`, `HiOutlineCursorClick`, `HiOutlineCog`, `HiOutlineUser`, `HiOutlineBeaker`, `HiOutlineClipboardCheck`)
  - `PropsBasicsDemo.jsx` - daisyUI `card`, `input` components, `HiOutlineLightBulb` icon, semantic colors
  - `DestructuringDemo.jsx` - daisyUI `card` component, `HiX`, `HiCheck`, `HiOutlineExclamationCircle`, `HiOutlineLightBulb` icons
  - `DefaultPropsDemo.jsx` - daisyUI `card`, `btn`, `checkbox` components, semantic colors
  - `ChildrenDemo.jsx` - daisyUI `card`, `input` components, semantic colors
  - `PropsPlayground.jsx` - daisyUI `card`, `input`, `btn`, `badge`, `checkbox` components, `HiX`, `HiOutlineCheckCircle`, `HiOutlineXCircle` icons
- ✅ **Refactored Lesson 2.2 to use daisyUI + react-icons:**
  - `index.jsx` - Replaced emojis with icons (`HiOutlineCursorClick`, `HiOutlineSwitchHorizontal`, `HiOutlineCube`, `HiOutlineRefresh`, `HiOutlineBeaker`, `HiOutlineClipboardCheck`)
  - `StateBasicsDemo.jsx` - daisyUI `card`, `btn` components, `HiMinus`, `HiPlus`, `HiChevronDown`, `HiChevronRight`, `HiOutlineLightBulb` icons
  - `StateVsPropsDemo.jsx` - daisyUI `card` component, `HiOutlineKey` icon, semantic colors for table
  - `MultipleStateDemo.jsx` - daisyUI `card`, `input`, `checkbox` components, `HiOutlineLightBulb` icon
  - `StateUpdatesDemo.jsx` - daisyUI `card`, `btn` components, `HiX`, `HiCheck`, `HiOutlineRefresh`, `HiOutlineArrowRight` icons
  - `StatePlayground.jsx` - daisyUI `card`, `input`, `btn`, `checkbox` components, `HiOutlineDocumentText`, `HiX` icons, solid primary header
- ✅ **Refactored Lesson 2.3 to use daisyUI + react-icons:**
  - `index.jsx` - Converted inline styles to Tailwind classes, replaced emojis with icons (`HiOutlineCursorClick`, `HiOutlineDocumentText`, `HiOutlineArrowUp`, `HiOutlineCog`, `HiOutlineBeaker`, `HiOutlineClipboardCheck`)
  - `EventBasicsDemo.jsx` - Converted all inline styles to daisyUI `card`, `btn` components, `HiChevronDown`, `HiChevronRight`, `HiOutlineExclamationCircle` icons
  - `EventHandlersDemo.jsx` - Converted inline styles to daisyUI `card`, `btn` components, `HiCheck`, `HiX` icons
  - `EventTypesDemo.jsx` - Converted inline styles to daisyUI `card`, `input`, `select`, `checkbox`, `btn` components, `HiCheck` icon
  - `EventPropagationDemo.jsx` - Converted inline styles to daisyUI `card`, `input`, `btn` components, `HiOutlineLightBulb` icon
  - `EventPlayground.jsx` - Converted inline styles to daisyUI `card`, `input`, `checkbox`, `btn` components, `HiCheck` icon, form validation with error states
- ✅ **Refactored Lesson 2.4 to use daisyUI + react-icons:**
  - `index.jsx` - Converted inline styles to Tailwind classes, replaced emojis with icons (`HiOutlineBookOpen`, `HiOutlineSwitchHorizontal`, `HiOutlineSparkles`, `HiOutlineCursorClick`, `HiOutlineBeaker`, `HiOutlineClipboardCheck`)
  - `ConditionalBasicsDemo.jsx` - Converted all inline styles to daisyUI `card`, `btn` components, `HiChevronDown`, `HiChevronRight`, `HiOutlineLightBulb`, `HiOutlineLockClosed`, `HiOutlineHandRaised` icons
  - `TernaryDemo.jsx` - Converted inline styles to daisyUI `card`, `btn` components, `HiOutlineSun`, `HiOutlineMoon`, `HiOutlineExclamationCircle`, `HiOutlineCheckCircle`, `HiOutlineXCircle`, `HiOutlineUser` icons
  - `LogicalAndDemo.jsx` - Converted inline styles to daisyUI `card`, `btn`, `badge` components, `HiMinus`, `HiPlus`, `HiCheck`, `HiX`, `HiOutlineLightBulb`, `HiOutlineCrown`, `HiOutlineUser`, `HiOutlineExclamationCircle`, `HiOutlineBell` icons
  - `PatternComparisonDemo.jsx` - Converted inline styles to daisyUI `card`, `btn` components, `HiOutlineRefresh`, `HiX`, `HiCheck`, `HiOutlineCube`, `HiOutlineInbox` icons, loading spinner
  - `ConditionalPlayground.jsx` - Converted inline styles to daisyUI `card`, `input`, `select`, `checkbox`, `btn`, `badge`, `range` components, `HiOutlineLockClosed`, `HiOutlineCrown`, `HiOutlineShieldCheck`, `HiOutlineBell`, `HiOutlineCog`, `HiOutlineUser`, `HiCheck`, `HiX` icons
- 📝 **Established "Icons vs Emojis" rule in STARTING_POINT.md:**
  - Use react-icons for all UI elements
  - Emojis OK only in code examples that users are learning from

#### Code Reduction Results:
| Element | Before | After | Reduction |
|---------|--------|-------|-----------|
| Buttons | 10 classes | 3 classes | 70% |
| Inputs | 12 classes | 4 classes | 67% |
| Color mapping | 15 lines | 5 lines | 67% |
| App.jsx styles | ~370 lines | ~200 lines | 46% |

#### Benefits:
- 🎨 Semantic colors that adapt to theme automatically
- 📦 Cleaner, more readable component code
- 🔄 Consistent styling across components
- 🌙 Theme-aware colors (no hardcoded values)
- 🎯 Icons via react-icons (Heroicons set)

#### daisyUI Refactoring Progress:
| Component | Status | Notes |
|-----------|--------|-------|
| `App.jsx` | ✅ Complete | Main navigator, sidebar, header, footer |
| Lesson 1.1 | ✅ Complete | All 4 files converted |
| Lesson 1.2 | ✅ Complete | All 5 files converted (index, ProjectStructureExplorer, FileFlowDemo, HMRDemo, PackageJsonExplorer) |
| Lesson 1.3 | ✅ Complete | All 7 files converted (index, JSXTransformDemo, DifferencesExplorer, EmbeddingDemo, JSXRulesDemo, MistakesQuiz, JSXPlayground) |
| Lesson 1.4 | ✅ Complete | All 5 files converted (index, ComponentBasicsDemo, ComponentRulesDemo, ComponentBuilder, CompositionDemo) |
| Lesson 2.1 | ✅ Complete | All 6 files converted (index, PropsBasicsDemo, DestructuringDemo, DefaultPropsDemo, ChildrenDemo, PropsPlayground) |
| Lesson 2.2 | ✅ Complete | All 6 files converted (index, StateBasicsDemo, StateVsPropsDemo, MultipleStateDemo, StateUpdatesDemo, StatePlayground) |
| Lesson 2.3 | ✅ Complete | All 6 files converted (index, EventBasicsDemo, EventHandlersDemo, EventTypesDemo, EventPropagationDemo, EventPlayground) - converted from inline styles |
| Lesson 2.4 | ✅ Complete | All 6 files converted (index, ConditionalBasicsDemo, TernaryDemo, LogicalAndDemo, PatternComparisonDemo, ConditionalPlayground) - converted from inline styles |
| Shared components | ✅ Complete | All 4 components converted to daisyUI + react-icons | 

---

### Session 4 - December 9, 2025
**Goal:** Bug fixes for Lesson 2.4 UI issues

#### Completed:
- 🐛 **Fixed welcome message text layout in `ConditionalPlayground.jsx`:**
  - Issue: "Welcome to your dashboard, Alex!" was split across 3 lines (text, name, exclamation mark)
  - Cause: daisyUI `card` class applies `display: flex; flex-direction: column;` which breaks inline text flow
  - Fix: Removed `card` class from welcome message div, kept only `rounded-lg bg-base-200`
  - Also cleaned up redundant ternary operators (e.g., `darkMode ? 'bg-base-200' : 'bg-base-200'`)

- 🐛 **Fixed notification badge covering bell icon in `LogicalAndDemo.jsx` and `ConditionalPlayground.jsx`:**
  - Issue: Badge positioned at `-top-2 -right-2` was overlapping the bell icon too much
  - Fix: Changed to `badge-xs` (smaller), repositioned to `-top-1 -right-3.5`
  - Added `rounded-full` for fully circular badge appearance
  - Added `min-w-[16px] text-[10px]` for proper sizing

#### Files Modified:
- `playground/src/lessons/2_4/ConditionalPlayground.jsx`
- `playground/src/lessons/2_4/LogicalAndDemo.jsx`

- ✅ **Implemented Lesson 2.5: Lists & Keys**
  - `index.jsx` - Main lesson with 6 sections
  - `ListBasicsDemo.jsx` - Simple and object array rendering with .map()
  - `KeysExplainedDemo.jsx` - Interactive demo showing why keys matter (add/remove/reorder)
  - `KeyMistakesDemo.jsx` - Side-by-side comparison of index vs ID keys with input state
  - `ListOperationsDemo.jsx` - Product list with search, filter by category/stock, sort
  - `ListPlayground.jsx` - Complete todo app (add, remove, toggle, filter, clear completed)
  - Updated `config.json` to add lesson 2.5 and mark 2.4 as complete
  - Updated `App.jsx` to import and register Lesson2_5 component

#### Module 2 Complete! 🎉
All 5 lessons in Module 2: Core Concepts are now implemented.

---

### Session 5 - December 9, 2025
**Goal:** Implement Lesson 3.1: useEffect

#### Completed:
- ✅ **Implemented Lesson 3.1: useEffect - Side Effects & Lifecycle**
  - `index.jsx` - Main lesson with 6 sections
  - `EffectBasicsDemo.jsx` - Introduction to side effects, document title example with logs
  - `DependencyArrayDemo.jsx` - 3 tabs comparing [], [deps], and no array
  - `CleanupDemo.jsx` - Timer and keyboard listener cleanup examples
  - `EffectTimingDemo.jsx` - Lifecycle visualization with event log
  - `EffectPlayground.jsx` - 4 interactive demos: document title, stopwatch, window resize, localStorage
  - Updated `config.json` to add lesson 3.1 and mark 2.5 as complete
  - Updated `App.jsx` to import and register Lesson3_1 component

#### Module 3 Started! 🎯
Beginning the Hooks Deep Dive module.

---

### Session 6 - December 9, 2025
**Goal:** Implement Lesson 3.2: useContext

#### Completed:
- ✅ **Implemented Lesson 3.2: useContext - Sharing State**
  - `index.jsx` - Main lesson with 6 sections
  - `PropDrillingDemo.jsx` - Visual demo of the prop drilling problem with 4-level component tree
  - `ContextBasicsDemo.jsx` - Three-step guide: createContext, Provider, useContext with code examples
  - `ContextWithStateDemo.jsx` - Counter example with custom useCounter hook pattern
  - `MultipleContextsDemo.jsx` - Theme + Auth contexts in a mini app
  - `ContextPlayground.jsx` - Full dashboard with Theme, User, and Notification contexts
  - Updated `config.json` to add lesson 3.2 and mark 3.1 as complete
  - Updated `App.jsx` to import and register Lesson3_2 component

---

### Session 7 - December 9, 2025
**Goal:** Implement Lesson 3.3: useRef

#### Completed:
- ✅ **Implemented Lesson 3.3: useRef - DOM Access & Persistence**
  - `index.jsx` - Main lesson with 6 sections
  - `RefBasicsDemo.jsx` - useState vs useRef comparison with render counter
  - `DomAccessDemo.jsx` - 3 tabs: Focus input, Scroll to element, Measure dimensions
  - `PersistentValueDemo.jsx` - Timer demo storing interval ID in ref
  - `PreviousValueDemo.jsx` - Custom usePrevious hook for tracking previous values
  - `RefPlayground.jsx` - 4 demos: Auto-focus search (⌘K), Click outside, Video player, Render counter
  - Updated `config.json` to add lesson 3.3 and mark 3.2 as complete
  - Updated `App.jsx` to import and register Lesson3_3 component

---

### Session 8 - December 9, 2025
**Goal:** Implement Lesson 3.4: useMemo & useCallback

#### Completed:
- ✅ **Implemented Lesson 3.4: useMemo & useCallback - Performance**
  - `index.jsx` - Main lesson with 6 sections covering performance optimization
  - `RenderCountDemo.jsx` - Visual demo showing how parent re-renders affect children
  - `UseMemoDemo.jsx` - Expensive calculation demo with toggle to compare memoized vs non-memoized
  - `UseCallbackDemo.jsx` - React.memo + useCallback demo showing function reference stability
  - `WhenToUseDemo.jsx` - Decision guide for when to use (and NOT use) memoization
  - `PerformancePlayground.jsx` - 3 interactive demos: List filter, Search, Todo list
  - Updated `config.json` to add lesson 3.4 and mark 3.3 as complete
  - Updated `App.jsx` to import and register Lesson3_4 component

---

### Session 9 - December 9, 2025
**Goal:** Implement Lesson 3.5: Custom Hooks

#### Completed:
- ✅ **Implemented Lesson 3.5: Custom Hooks - Reusable Logic**
  - `index.jsx` - Main lesson with 5 sections
  - `CustomHookBasicsDemo.jsx` - useCounter hook demo with independent state
  - `ExtractingLogicDemo.jsx` - Before/after comparison showing useWindowSize extraction
  - `CommonHooksDemo.jsx` - 3 tabs: useToggle, useLocalStorage, useDebounce
  - `CustomHooksPlayground.jsx` - 4 demos: useOnlineStatus, useInterval, useCopyToClipboard, useHover
  - Updated `config.json` to add lesson 3.5 and mark 3.4 as complete
  - Updated `App.jsx` to import and register Lesson3_5 component

#### Module 3 Complete! 🎉
All 5 lessons in Module 3: Hooks Deep Dive are now implemented.

---

### Session 10 - December 9, 2025
**Goal:** Implement Lesson 4.1: Fetching Data with useEffect

#### Completed:
- ✅ **Implemented Lesson 4.1: Fetching Data with useEffect**
  - `index.tsx` - Main lesson with 6 sections covering data fetching fundamentals
  - `FetchBasicsDemo.tsx` - Basic fetch pattern with loading/error states, live JSONPlaceholder API
  - `DependencyFetchDemo.tsx` - Fetch on dependency change with log visualization
  - `RaceConditionDemo.tsx` - Two tabs: "Problem" (race condition bug) vs "Solution" (AbortController)
  - `FetchPlayground.tsx` - 4 interactive demos: Search (debounced), Photos gallery, Comments, Auto-refresh polling
  - Updated `config.json` to add lesson 4.1 and module 4
  - Updated `App.jsx` to import and register Lesson4_1 component

#### Module 4 Started! 🎯
Beginning the Data Fetching & REST APIs module.

---

### Session 11 - December 9, 2025
**Goal:** Implement Lesson 4.2: Loading, Error & Empty States

#### Completed:
- ✅ **Implemented Lesson 4.2: Loading, Error & Empty States**
  - `index.tsx` - Main lesson with 6 sections covering UI state patterns
  - `LoadingStatesDemo.tsx` - 4 loading patterns: Spinner, Skeleton, Progress, Shimmer with code examples
  - `ErrorStatesDemo.tsx` - Error types (network, server, notfound, auth), inline errors, toast errors
  - `EmptyStatesDemo.tsx` - Empty state patterns (no data, no results, first-time, filtered) with interactive demo
  - `StateCompositionDemo.tsx` - Interactive demo showing loading → error → empty → data flow
  - `StatesPlayground.tsx` - 3 interactive demos: Photo Gallery, Search, Shopping Cart
  - Updated `config.json` to mark 4.1 complete and add 4.2 as current
  - Updated `App.jsx` to import and register Lesson4_2 component

---

### Session 12 - December 9, 2025
**Goal:** Implement Lesson 4.3: Creating & Updating Data (POST/PUT/DELETE)

#### Completed:
- ✅ **Implemented Lesson 4.3: Creating & Updating Data (POST/PUT/DELETE)**
  - `index.tsx` - Main lesson with 6 sections covering CRUD operations
  - `CreateDataDemo.tsx` - POST request pattern with form, loading states, success/error feedback
  - `UpdateDataDemo.tsx` - PUT vs PATCH comparison with inline editing, server response display
  - `DeleteDataDemo.tsx` - DELETE with confirmation dialog, best practices
  - `OptimisticUpdatesDemo.tsx` - Side-by-side comparison of optimistic vs pessimistic updates with error simulation
  - `CrudPlayground.tsx` - Full CRUD todo app with add, edit, toggle, delete, optimistic updates
  - Updated `config.json` to mark 4.2 complete and add 4.3 as current
  - Updated `App.jsx` to import and register Lesson4_3 component

---

### Session 13 - December 9, 2025
**Goal:** Implement Lesson 4.4: Building a Custom useFetch Hook

#### Completed:
- ✅ **Implemented Lesson 4.4: Building a Custom useFetch Hook**
  - `index.tsx` - Main lesson with 7 sections covering custom data fetching hook
  - `UseFetchBasicsDemo.tsx` - Before/after comparison showing why to extract fetch logic
  - `BuildingUseFetchDemo.tsx` - Step-by-step implementation (state setup, fetch logic, cleanup, refetch)
  - `GenericUseFetchDemo.tsx` - TypeScript generics for type-safe API responses (Users, Posts, Todos)
  - `SuspenseApproachDemo.tsx` - React 19 `use()` hook + `<Suspense>` + ErrorBoundary pattern
  - `UseFetchPlayground.tsx` - 4 interactive demos: User search, Photo gallery, Comments, Error simulation
  - Updated `config.json` to mark 4.3 complete and add 4.4 as current
  - Updated `App.jsx` to import and register Lesson4_4 component
- 🐛 **Fixed Photo Gallery demo** - Changed image source from JSONPlaceholder's `via.placeholder.com` (often fails to load) to `picsum.photos` (reliable)

#### Module 4 Complete! 🎉
All 4 lessons in Module 4: Data Fetching & REST APIs are now implemented.

---

### Session 14 - December 9, 2025
**Goal:** Implement Lesson 5.1: Controlled Components

#### Completed:
- ✅ **Implemented Lesson 5.1: Controlled Components**
  - `index.tsx` - Main lesson with 6 sections covering form input control
  - `ControlledBasicsDemo.tsx` - Basic controlled input concept with live state preview
  - `UncontrolledVsControlledDemo.tsx` - Side-by-side comparison of ref vs state approach
  - `InputTypesDemo.tsx` - 5 tabs: text, textarea, select, checkbox, radio with code examples
  - `ControlledBenefitsDemo.tsx` - 4 benefit demos: instant validation, auto formatting, conditional logic, computed values
  - `ControlledPlayground.tsx` - Complete registration form with real-time validation
  - Updated `config.json` to mark 4.4 complete, add 5.1 as current, add Module 5
  - Updated `App.jsx` to import and register Lesson5_1 component

#### Module 5 Started! 🎯
Beginning the Forms & User Input module.

---

### Session 15 - December 9, 2025
**Goal:** Implement Lesson 5.2: Form Validation Patterns

#### Completed:
- ✅ **Implemented Lesson 5.2: Form Validation Patterns**
  - `index.tsx` - Main lesson with 6 sections covering validation patterns
  - `ValidationApproachesDemo.tsx` - 3 tabs comparing on-submit, on-blur (recommended), on-change validation timing
  - `ValidationRulesDemo.tsx` - 4 rule types: required, length, pattern (regex), custom (password strength)
  - `ErrorDisplayDemo.tsx` - 3 error display patterns: inline, summary list, toast notifications
  - `AsyncValidationDemo.tsx` - Username availability check with debouncing and loading states
  - `ValidationPlayground.tsx` - Complete signup form with email availability, password strength, age validation
  - Updated `config.json` to mark 5.1 complete and add 5.2 as current
  - Updated `App.jsx` to import and register Lesson5_2 component

---

### Session 16 - December 9, 2025
**Goal:** Implement Lesson 5.3: Handling Multiple Inputs

#### Completed:
- ✅ **Implemented Lesson 5.3: Handling Multiple Inputs**
  - `index.tsx` - Main lesson with 6 sections covering multi-input forms
  - `SingleStateDemo.tsx` - Comparing separate states vs single object state pattern
  - `NameAttributeDemo.tsx` - Using name attribute with computed property names for generic handlers
  - `DynamicFieldsDemo.tsx` - Add/remove phone numbers with unique IDs
  - `FormPatternsDemo.tsx` - 3 patterns: nested objects, array fields, form reset
  - `MultiInputPlayground.tsx` - Complete contact form with all patterns combined
  - Updated `config.json` to mark 5.2 complete and add 5.3 as current
  - Updated `App.jsx` to import and register Lesson5_3 component

#### Module 5 Complete! 🎉
All 3 lessons in Module 5: Forms & User Input are now implemented.

---

### Session 17 - December 10, 2025
**Goal:** Implement Lesson 6.1: Component Composition

#### Completed:
- ✅ **Implemented Lesson 6.1: Component Composition**
  - `index.tsx` - Main lesson with 6 sections
  - `WhyCompositionDemo.tsx` - Composition vs inheritance with code examples and interactive tabs
  - `ChildrenPropDemo.tsx` - Children prop basics, Card/FancyBorder containers, Collapsible component
  - `SlotPatternDemo.tsx` - Named slots with PageLayout, CardWithSlots, Modal examples
  - `SpecializationDemo.tsx` - Creating specialized Button/Alert components from generic ones
  - `CompositionPlayground.tsx` - Full component library: Card/Avatar/Badge/IconButton building blocks, composed UserCard/PostCard/StatCard
  - Updated `config.json` to mark 5.3 complete, add 6.1 as current, add Module 6
  - Updated `App.jsx` to import and register Lesson6_1 component

#### Module 6 Started! 🎯
Beginning the Component Patterns module.

---

### Session 18 - December 10, 2025
**Goal:** Implement Lesson 6.2: Render Props Pattern

#### Completed:
- ✅ **Implemented Lesson 6.2: Render Props Pattern**
  - `index.tsx` - Main lesson with 5 sections
  - `RenderPropsBasicsDemo.tsx` - Hardcoded vs render prop comparison, Counter with 3 different UIs
  - `ChildrenAsFunctionDemo.tsx` - Toggle as switch/button/heart/accordion, Hover and WindowSize demos
  - `CommonUseCasesDemo.tsx` - Mouse tracking with crosshairs, Fetch component with users, SelectableList with 4 UI styles
  - `RenderPropsPlayground.tsx` - Nested render props (theme+counter), mouse-reactive spotlight, live search filter, stopwatch timer with ring progress
  - Updated `config.json` to mark 6.1 complete and add 6.2 as current
  - Updated `App.jsx` to import and register Lesson6_2 component

---

### Session 19 - December 10, 2025
**Goal:** Implement Lesson 6.3: Higher-Order Components

#### Completed:
- ✅ **Implemented Lesson 6.3: Higher-Order Components**
  - `index.tsx` - Main lesson with 5 sections
  - `HOCBasicsDemo.tsx` - HOC formula, withBorder example, live demo with multiple enhanced components
  - `CommonHOCsDemo.tsx` - withAuth (access denied), withLoading (spinner), withTheme (light/dark) with interactive toggles
  - `HOCPatternsDemo.tsx` - 5 patterns: naming convention, displayName, pass props, don't mutate, composition
  - `HOCPlayground.tsx` - Single HOC demos, composed HOCs (4 stacked), DevTools wrapper stack visualization
  - Updated `config.json` to mark 6.2 complete and add 6.3 as current
  - Updated `App.jsx` to import and register Lesson6_3 component

---

### Session 20 - December 10, 2025
**Goal:** Implement Lesson 6.4: Compound Components

#### Completed:
- ✅ **Implemented Lesson 6.4: Compound Components**
  - `index.tsx` - Main lesson with 5 sections
  - `CompoundBasicsDemo.tsx` - Traditional config vs compound comparison, Tabs example, code toggle
  - `ContextPatternDemo.tsx` - 3-step pattern (create context, parent provides, children consume), interactive Accordion
  - `FlexibleAPIDemo.tsx` - Card component with 3 different layouts (image, profile, settings), inversion of control
  - `CompoundPlayground.tsx` - Full Tabs, Menu/Dropdown, and Select component demos with event logging
  - Updated `config.json` to mark 6.3 complete and add 6.4 as current
  - Updated `App.jsx` to import and register Lesson6_4 component

---

### Session 21 - December 10, 2025
**Goal:** Implement Lesson 7.1: Lifting State Up

#### Completed:
- ✅ **Implemented Lesson 7.1: Lifting State Up**
  - `index.tsx` - Main lesson with 5 sections covering state lifting patterns
  - `WhyLiftStateDemo.tsx` - Problem/solution tabs showing isolated vs lifted state (shopping cart example)
  - `LiftingPatternDemo.tsx` - Temperature converter with 4-step explanation, data flow diagram
  - `LiftingGuidelinesDemo.tsx` - Decision tree, comparison table, anti-patterns, quick reference
  - `LiftingPlayground.tsx` - 3 interactive demos: shopping cart, form wizard, currency converter
  - `examples/` folder with code snippets using `?raw` import pattern
  - Updated `config.json` to mark 6.5 complete, add 7.1 as current, add Module 7
  - Updated `App.jsx` to import and register Lesson7_1 component

#### Module 7 Started! 🎯
Beginning the State Management module.

---

### Session 22 - December 10, 2025
**Goal:** Implement Lesson 7.2: useReducer for Complex State

#### Completed:
- ✅ **Implemented Lesson 7.2: useReducer for Complex State**
  - `index.tsx` - Main lesson with 5 sections covering useReducer fundamentals
  - `WhyReducerDemo.tsx` - Side-by-side comparison of useState vs useReducer with undo/redo counter
  - `ReducerBasicsDemo.tsx` - Interactive counter with action log, anatomy breakdown, key concepts visual
  - `ActionPatternsDemo.tsx` - Action patterns (simple, payload, TypeScript union), type-safe form example
  - `ReducerPlayground.tsx` - 3 interactive demos: Todo list, Shopping cart, Multi-step form
  - `examples/` folder with code snippets using `?raw` import pattern
  - Updated `config.json` to mark 7.1 complete and add 7.2 as current
  - Updated `App.jsx` to import and register Lesson7_2 component

---

### Session 23 - December 10, 2025
**Goal:** Implement Lesson 7.3: Context + Reducer Pattern

#### Completed:
- ✅ **Implemented Lesson 7.3: Context + Reducer Pattern**
  - `index.tsx` - Main lesson with 5 sections combining Context and Reducer
  - `WhyContextReducerDemo.tsx` - Side-by-side prop drilling vs context+reducer, visual "mini Redux" explanation
  - `PatternSetupDemo.tsx` - 6-step guide with interactive tabs, separate contexts explanation, live example
  - `CustomProviderDemo.tsx` - Pattern 1: named actions, Pattern 2: selector hooks with cart/notification demos
  - `ContextReducerPlayground.tsx` - 3 interactive demos: Theme switcher, Todo list, Shopping cart
  - `examples/` folder with code snippets
  - Updated `config.json` to mark 7.2 complete and add 7.3 as current
  - Updated `App.jsx` to import and register Lesson7_3 component

---

### Session 24 - December 10, 2025
**Goal:** Implement Lesson 7.4: When to Use External State Libraries

#### Completed:
- ✅ **Implemented Lesson 7.4: When to Use External State Libraries**
  - `index.tsx` - Main lesson with 5 sections covering state library decisions
  - `WhenBuiltInDemo.tsx` - Scenarios grid showing when useState/useReducer/Context is enough, code examples
  - `SignsYouNeedLibraryDemo.tsx` - 6 pain points (prop drilling, context hell, performance, server state, debugging, team scale) with expandable details
  - `LibraryOverviewDemo.tsx` - Zustand, Redux Toolkit, TanStack Query, Jotai comparison with code examples, pros/cons
  - `DecisionFrameworkDemo.tsx` - Interactive flowchart to choose the right state management approach
  - Updated `config.json` to mark 7.3 complete and add 7.4 as current
  - Updated `App.jsx` to import and register Lesson7_4 component

#### Module 7 Complete! 🎉
All 4 lessons in Module 7: State Management are now implemented.

---

### Session 25 - December 16, 2025
**Goal:** Implement Lesson 8.1: Server-Side Rendering

#### Completed:
- ✅ **Implemented Lesson 8.1: Server-Side Rendering**
  - `index.tsx` - Main lesson with 6 sections covering SSR fundamentals
  - `RenderingComparisonDemo.tsx` - Animated side-by-side CSR vs SSR timeline comparison
  - `HowSSRWorksDemo.tsx` - 6-step walkthrough of SSR process with code examples
  - `HydrationDemo.tsx` - Interactive simulation of React hydration process
  - `WhenToUseSSRDemo.tsx` - Decision tree for choosing SSR/CSR/SSG
  - `SSRPlayground.tsx` - Live SSR demo embedded in iframe
- ✅ **Built Express SSR Server**
  - `server/index.ts` - Express server on port 3001
  - `server/render.tsx` - React renderToString() logic
  - `server/template.html` - HTML template with placeholders
  - `server/template.ts` - Template processing with data injection
  - `shared/SSRDemoApp.tsx` - Isomorphic component (runs on server + client)
  - `src/ssr-client.tsx` - Client hydration entry point
- ✅ **Configured Build Pipeline**
  - `vite.config.js` - Added proxy for /ssr-demo route
  - `vite.ssr.config.js` - Separate Vite config for SSR client bundle
  - `tsconfig.server.json` - TypeScript config for server code
  - Added npm scripts: ssr:dev, ssr:server, build:ssr-client
- ✅ **Added Storybook Stories + Tests**
  - 6 story files covering all demos
  - 26 interaction tests (all passing)
  - Updated config.json and App.tsx

#### Module 8 Started! 🎯
Beginning the Advanced Topics module with Server-Side Rendering.

---

### Session 26 - December 16, 2025
**Goal:** Implement Lesson 8.2: Testing Strategies

#### Completed:
- ✅ **Implemented Lesson 8.2: Testing Strategies**
  - `index.tsx` - Main lesson with 6 sections covering testing strategies
  - `TestingApproachesDemo.tsx` - Interactive testing pyramid (unit, integration, E2E)
  - `StorybookSetupDemo.tsx` - Story file structure, global config, running Storybook
  - `MSWMockingDemo.tsx` - MSW handlers, per-story overrides for loading/error states
  - `InteractionTestsDemo.tsx` - Play functions, query methods, async testing, assertions
  - `TestingPlayground.tsx` - Interactive counter, async data, and form validation demos
  - `examples/` folder with code snippets (StoryBasics, PlayFunction, MSWHandler, etc.)
- ✅ **Added Storybook Stories + Tests**
  - 6 story files covering all demos
  - 15+ interaction tests covering user flows
  - Updated config.json and App.tsx

---

### Session 27 - December 17, 2025
**Goal:** Add Storybook stories and tests for Lesson 2.5: Lists & Keys

#### Completed:
- ✅ **Added Storybook Stories + Tests for Lesson 2.5**
  - `Lesson.stories.tsx` - Full page tests (header, sections, takeaways)
  - `ListBasicsDemo.stories.tsx` - .map() basics, code toggle
  - `KeysExplainedDemo.stories.tsx` - Key manipulation (add, remove, move, reset)
  - `KeyMistakesDemo.stories.tsx` - Index vs ID key comparison demo
  - `ListOperationsDemo.stories.tsx` - Filter, sort, search interactions
  - `ListPlayground.stories.tsx` - Full todo app tests (add, toggle, filter, clear)
- ✅ **40 passing tests** covering all list and key concepts

---

### Session 28 - December 21, 2025
**Goal:** Implement Lesson 8.4: RSC - Intro to React Server Components

#### Completed:
- ✅ **Implemented Lesson 8.4: RSC - Intro to React Server Components**
  - `index.tsx` - Main lesson with 6 sections covering RSC fundamentals
  - `RSCBasicsDemo.tsx` - Evolution of rendering (CSR → SSR → RSC), two worlds mental model
  - `ServerVsClientDemo.tsx` - Feature comparison table, composition pattern, boundary rule
  - `UseClientDirectiveDemo.tsx` - Directive syntax, boundary behavior, common gotchas
  - `RSCBenefitsDemo.tsx` - Benefits (bundle size, data access, security, streaming), trade-offs
  - `RSCPlayground.tsx` - 5 tabs: Live Demo, data fetching, interactive islands, children passthrough, decision guide
  - `examples/` folder with 9 code snippet files
  - Updated config.json and App.tsx
- ✅ **Built Live RSC Demo Server**
  - `server/rsc-render.tsx` - Simulated RSC rendering with product page demo
  - Shows Server Components (pure HTML) vs Client Component islands
  - Interactive Add to Cart button demonstrates client hydration
  - Console logging shows bundle size comparison (168 KB → 12 KB)
  - Added `/rsc-demo` route to Express server
  - Added proxy configuration in `vite.config.js`
- ✅ **Added Storybook Stories + Tests**
  - 6 story files covering all demos
  - 30 passing interaction tests
  - Stories for: Lesson, RSCBasicsDemo, ServerVsClientDemo, UseClientDirectiveDemo, RSCBenefitsDemo, RSCPlayground

---

## Concepts Mastered

- [x] What React is and why it's popular
- [x] Declarative vs Imperative programming
- [x] Component-based architecture
- [x] Virtual DOM concept
- [x] Vite project structure
- [x] How React files connect (index.html → main.jsx → App.jsx)
- [x] Hot Module Replacement (HMR)
- [x] package.json structure
- [x] JSX syntax and rules
- [x] Creating components
- [x] Props and children
- [x] State (useState)
- [x] Event handling
- [x] Conditional rendering
- [x] Lists and keys
- [x] useEffect for side effects
- [x] useContext for sharing state
- [x] useRef for DOM access and persistent values
- [x] useMemo & useCallback for performance
- [x] Custom hooks
- [x] Data fetching with useEffect
- [x] AbortController for cleanup
- [x] Loading states (spinner, skeleton, progress, shimmer)
- [x] Error states (types, inline, toast)
- [x] Empty states (no data, no results, first-time, filtered)
- [x] State composition pattern (loading → error → empty → data)
- [x] POST requests to create data
- [x] PUT vs PATCH for updates
- [x] DELETE with confirmation
- [x] Optimistic vs pessimistic updates
- [x] Custom useFetch hook (useEffect pattern)
- [x] TypeScript generics for type-safe hooks
- [x] React 19 `use()` hook and Suspense for data fetching
- [x] ErrorBoundary for handling rejected promises
- [x] Controlled components (value + onChange pattern)
- [x] Uncontrolled components (ref approach)
- [x] Different input types (text, textarea, select, checkbox, radio)
- [x] Benefits: real-time validation, auto formatting, conditional logic, computed values
- [x] Validation timing: on-submit, on-blur, on-change
- [x] Validation rules: required, length, pattern (regex), custom
- [x] Error display: inline, summary, toast
- [x] Async validation with debouncing
- [x] "touched" state for UX (avoid premature errors)
- [x] Single state object for multiple inputs
- [x] Name attribute + computed property names [e.target.name]
- [x] Dynamic form fields (add/remove with unique IDs)
- [x] Nested object state updates (spread at each level)
- [x] Array state updates (spread, filter, map)
- [x] Form reset with initial state
- [x] Composition over inheritance philosophy
- [x] Children prop for containment patterns
- [x] Slot pattern (named props for multiple insertion points)
- [x] Specialization pattern (pre-configured wrappers)
- [x] Building composable component libraries
- [x] Render props pattern (function as child)
- [x] Children as function syntax
- [x] Mouse tracking, data fetching, list selection patterns
- [x] When to use render props vs custom hooks
- [x] Higher-Order Components (HOCs) - functions that enhance components
- [x] withAuth, withLoading, withTheme HOC patterns
- [x] HOC conventions: naming, displayName, pass props through
- [x] Composing multiple HOCs together
- [x] HOCs vs Hooks tradeoffs
- [x] Compound components pattern (components that work together as a unit)
- [x] Context pattern for implicit state sharing
- [x] Static sub-component properties (Tabs.Tab, Menu.Item)
- [x] Flexible API design with inversion of control
- [x] Activity pattern (preserving hidden state)
- [x] Lifting state up - sharing state between siblings via common parent
- [x] Single source of truth pattern
- [x] Controlled children pattern (props down, callbacks up)
- [x] When to lift vs keep local vs use context
- [x] useReducer hook for complex state
- [x] Reducer pattern: (state, action) => newState
- [x] Actions with type and payload
- [x] TypeScript discriminated unions for type-safe actions
- [x] Context + Reducer pattern for global state
- [x] Separate contexts for state vs dispatch (performance)
- [x] Custom provider components with named actions
- [x] Selector hooks for specific state slices
- [x] When to use external state libraries (Zustand, Redux Toolkit, TanStack Query, Jotai)
- [x] Decision framework for choosing state management approach
- [x] Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)
- [x] renderToString() for server rendering
- [x] hydrateRoot() for client hydration
- [x] SSR timeline and process
- [x] Hydration: attaching React to server-rendered HTML
- [x] When to use SSR vs CSR vs SSG
- [x] Testing pyramid: unit, integration, E2E tests
- [x] Storybook for component development and testing
- [x] Story file structure: meta, stories, args, play functions
- [x] MSW (Mock Service Worker) for API mocking
- [x] MSW handlers: http.get(), http.post(), delay(), HttpResponse
- [x] Override handlers per-story for testing loading/error states
- [x] Play functions: userEvent, within(), expect()
- [x] Testing Library queries: getByRole, getByLabelText, getByText
- [x] waitFor() for async assertions
- [x] Jest-DOM matchers: toBeInTheDocument, toHaveTextContent, toBeDisabled
- [x] TanStack Query: useQuery for GET requests
- [x] TanStack Query: useMutation for POST/PUT/DELETE
- [x] Query keys for caching and deduplication
- [x] staleTime and cache invalidation
- [x] React Server Components (RSC) - components that run only on server
- [x] Server Components vs Client Components
- [x] "use client" directive and client boundary
- [x] RSC benefits: reduced bundle size, direct data access, security
- [x] Composition patterns: Server Components can render Client Components
- [x] Children passthrough pattern for mixing Server and Client
- [x] async/await in Server Components for data fetching
- [x] Interactive islands architecture
- [ ] ...more to come

---

## Notes & Questions

*Add any questions or notes here during learning:*

- **Module 4 Complete!** Built comprehensive useFetch hook covering both approaches:
  1. Traditional `useEffect` pattern (works in all React versions) - production ready
  2. React 19 `use` API with `<Suspense>` - declarative but requires new patterns
  - Trade-offs discussed: manual loading state vs automatic Suspense integration
  - Recommendation: Use useEffect pattern as default, consider libraries like TanStack Query for caching


---

## Quick Commands

```bash
# Start the dev server
cd playground && npm run dev

# Build for production
cd playground && npm run build

# Preview production build
cd playground && npm run preview

# Storybook
cd playground && npm run storybook        # Start Storybook dev server (port 6006)
cd playground && npm run storybook:build  # Build static Storybook

# Testing
cd playground && npm test                 # Run all Storybook tests

# SSR Demo (Lesson 8.1)
cd playground && npm run ssr:dev          # Start Vite + SSR server together
cd playground && npm run ssr:server       # Start only SSR server (port 3001)
cd playground && npm run build:ssr-client # Build SSR client bundle
```

