Module 1: The Core Foundations (The "Physics" of CSS)
Goal: Move beyond memorizing properties to understanding the rendering engine.

1.1 Syntax, Parsing, & The DOM

The Tree: Explain how CSS matches nodes in the DOM tree.

Performance: Briefly touch on why right-to-left parsing makes efficient selectors important (e.g., why universal selectors * can be slow in massive apps).

Pseudo-classes vs. Pseudo-elements: Distinguish between state (:hover) and generated content (::before). Require the user to build a custom "tooltip" using only data- attributes and ::after.

1.2 The Cascade, Specificity, & Inheritance

The 3 Inputs: Explain that styles come from User Agent (Browser defaults), User (OS settings), and Author (The Developer).

Specificity Wars: Teach the (0, 0, 0) calculation method.

Inline styles = (1, 0, 0)

IDs = (0, 1, 0)

Classes/Attributes = (0, 0, 1)

Elements = (0, 0, 0)

The !important Nuke: Explain why it breaks the cascade and when it is actually acceptable (utility classes).

Inheritance: Provide a list of properties that inherit (text settings) vs. those that don't (box model).

1.3 The Box Model & Flow

Box-Sizing: Teach box-sizing: border-box immediately. Show a math example: "If width is 300px and padding is 20px, what is the total rendered width in content-box vs border-box?"

Margin Collapse: Explain the "vertical touching margins" phenomenon. Show how overflow: hidden or padding: 1px can "un-collapse" them.

The Display Property: Deep dive into block (takes full width), inline (ignores top/bottom margin), and inline-block.

Module 2: Layout Mastery (Positioning Strategy)
Goal: Solving the "How do I center a div?" meme with confidence.

2.1 Positioning Contexts

The Document Flow: Explain what "taken out of flow" means.

Relative vs. Absolute: Explain that absolute looks for the nearest positioned ancestor. Teach the pattern: parent { position: relative; } child { position: absolute; }.

Fixed vs. Sticky: Differentiate between "stuck to viewport" vs. "stuck to container."

Stacking Contexts: Explain z-index is not global. It is relative to the stacking context.

2.2 Flexbox (The One-Dimensional Grid)

Axes: Teach Main Axis vs. Cross Axis. Explain that justify-content always works on the Main Axis, while align-items works on the Cross Axis.

The flex Shorthand: Deconstruct flex: 1 1 auto (Grow, Shrink, Basis).

Negative Margins: Advanced technique for ignoring parent padding.

2.3 CSS Grid (The Two-Dimensional Canvas)

Explicit vs. Implicit: grid-template- vs grid-auto-.

The fr Unit: Explain how fractional units distribute free space (not total space).

Grid Areas: Teach the visual grid-template-areas syntax for rapid prototyping.

Alignment: justify-items vs align-items (cell level) vs justify-content (grid level).

2.4 Responsive Strategy

The Viewport Meta Tag: Why it’s required for mobile rendering.

Media Query Ranges: Why min-width (mobile-first) is preferred over max-width to reduce code complexity.

Fluid Typography: Using clamp(min, preferred, max) for text that scales without breakpoints.

Module 3: Visuals & Interactivity
Goal: Professional polish and performance.

3.1 Advanced Backgrounds & Borders

Gradient Syntax: Linear, Radial, and Conic. Hard stops vs. smooth transitions.

Background Layering: Using multiple background images and background-blend-mode.

CSS Shapes: clip-path and shape-outside for wrapping text around non-rectangular objects.

3.2 Transitions & Animations

The Performance Layer: Explain the difference between animating left (triggers Layout = slow) vs. transform: translate() (triggers Composite = fast/GPU).

Bezier Curves: Understanding cubic-bezier beyond just ease-in-out.

Keyframes: Explain percent-based states and animation fill modes (forwards vs backwards).

Module 4: Architecture at Scale
Goal: Writing code that doesn't become "Legacy Code" in a month.

4.1 CSS Variables (Custom Properties)

Scope: Global (:root) vs. Local scope.

Theming: How to build a "Dark Mode" switch using only CSS variables and one HTML attribute.

Calculations: Using calc() with variables for dynamic layouts (e.g., calc(100vh - var(--header-height))).

4.2 Methodologies (BEM & Utility)

BEM: strict naming: .block__element--modifier. Why this reduces specificity conflicts.

Utility-First: The concept of atomic CSS (e.g., .m-4, .flex, .text-center) and why frameworks like Tailwind are popular.

4.3 Accessiblity (a11y)

Visually Hidden: Provide the CSS snippet to hide elements visually but keep them readable by screen readers (the .sr-only class).

Focus Management: Never use outline: 0 without a replacement.

Reduced Motion: Respecting user OS settings via @media (prefers-reduced-motion).