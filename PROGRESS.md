# 📊 Course Progress Tracker

> Last Updated: December 6, 2025

## Current Status

| Field | Value |
|-------|-------|
| **Current Module** | Module 2: Core Concepts |
| **Current Lesson** | Lesson 2.4: Conditional Rendering |
| **Next Lesson** | Lesson 2.5: Lists & Keys |
| **Dev Server** | Running at http://localhost:5173 |

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
| 2.5 | Lists & Keys | ⬜ Pending |

### Module 3: Hooks Deep Dive ⬜ Not Started

| Lesson | Topic | Status |
|--------|-------|--------|
| 3.1 | useEffect: Side Effects & Lifecycle | ⬜ Pending |
| 3.2 | useContext: Sharing State | ⬜ Pending |
| 3.3 | useRef: DOM Access & Persistence | ⬜ Pending |
| 3.4 | useMemo & useCallback: Performance | ⬜ Pending |
| 3.5 | Custom Hooks: Reusable Logic | ⬜ Pending |

### Module 4: Data Fetching & REST APIs ⬜ Not Started

| Lesson | Topic | Status |
|--------|-------|--------|
| 4.1 | Fetching Data with useEffect | ⬜ Pending |
| 4.2 | Loading, Error & Empty States | ⬜ Pending |
| 4.3 | Creating & Updating Data (POST/PUT/DELETE) | ⬜ Pending |
| 4.4 | Building a Custom useFetch Hook | ⬜ Pending |

### Module 5: Forms & User Input ⬜ Not Started

| Lesson | Topic | Status |
|--------|-------|--------|
| 5.1 | Controlled Components | ⬜ Pending |
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
- [ ] Creating components
- [ ] Props
- [ ] State (useState)
- [ ] ...more to come

---

## Notes & Questions

*Add any questions or notes here during learning:*

- 

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

