# 📊 Course Progress Tracker

> Last Updated: December 9, 2025

## Current Status

| Field | Value |
|-------|-------|
| **Current Module** | Module 5: Forms & User Input |
| **Current Lesson** | Lesson 5.1: Controlled Components |
| **Next Lesson** | Lesson 5.2: Form Validation Patterns |
| **Dev Server** | Running at http://localhost:5173 |
| **Language** | **TypeScript** (from Lesson 3.5 onward) |

---

## TypeScript Migration

| Status | Details |
|--------|---------|
| **Started** | Lesson 3.5 |
| **New Lessons** | All new lessons should be written in TypeScript (`.tsx`) |
| **Existing Lessons** | Lessons 1.1 - 3.4 are still JavaScript (`.jsx`) — will refactor later |
| **Config** | `tsconfig.json` with `allowJs: true` allows both JS and TS |

### Migration Plan
- ✅ Lesson 3.5 converted to TypeScript (with typed code samples)
- ⬜ Lessons 1.1 - 3.4 to be refactored to TypeScript (low priority)
- ⬜ Shared components (`lessons/components/`) to be converted (when touched)

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

### Module 5: Forms & User Input ⏳ In Progress

| Lesson | Topic | Status | Notes |
|--------|-------|--------|-------|
| 5.1 | Controlled Components | ✅ Complete | Basics, uncontrolled vs controlled, input types, benefits, playground |
| 5.2 | Form Validation Patterns | ⬜ Pending |
| 5.3 | Handling Multiple Inputs | ⬜ Pending |

### Module 6: Component Patterns ⬜ Not Started

| Lesson | Topic | Status |
|--------|-------|--------|
| 6.1 | Component Composition | ⬜ Pending |
| 6.2 | Render Props Pattern | ⬜ Pending |
| 6.3 | Higher-Order Components | ⬜ Pending |
| 6.4 | Compound Components | ⬜ Pending |

### Module 7: State Management ⬜ Not Started

| Lesson | Topic | Status |
|--------|-------|--------|
| 7.1 | Lifting State Up | ⬜ Pending |
| 7.2 | useReducer for Complex State | ⬜ Pending |
| 7.3 | Context + Reducer Pattern | ⬜ Pending |
| 7.4 | When to Use External State Libraries | ⬜ Pending |

### Module 8: Best Practices & Patterns ⬜ Not Started

| Lesson | Topic | Status |
|--------|-------|--------|
| 8.1 | File & Folder Structure | ⬜ Pending |
| 8.2 | Naming Conventions | ⬜ Pending |
| 8.3 | Performance Optimization | ⬜ Pending |
| 8.4 | Error Boundaries | ⬜ Pending |
| 8.5 | Testing Basics | ⬜ Pending |

### Module 9: Capstone Project ⬜ Not Started

| Lesson | Topic | Status |
|--------|-------|--------|
| 9.1 | Project: Task Manager App | ⬜ Pending |
| 9.2 | Adding Features & Polish | ⬜ Pending |
| 9.3 | Code Review & Refactoring | ⬜ Pending |

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
- [ ] Form validation patterns - next
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
```

