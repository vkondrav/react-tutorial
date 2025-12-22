# Lesson 1.4: Components - Your First Building Block

## 📖 What is a Component?

A **component** is a reusable piece of UI. Think of it as a custom HTML element you create yourself.

```jsx
// A simple component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Using it
<Welcome />
```

## 🏗️ Two Ways to Create Components

### 1. Function Components (Modern - Use This!)

```jsx
function Greeting() {
  return <h1>Hello!</h1>;
}

// Arrow function (also valid)
const Greeting = () => {
  return <h1>Hello!</h1>;
};

// Arrow function with implicit return
const Greeting = () => <h1>Hello!</h1>;
```

### 2. Class Components (Legacy - Know It Exists)

```jsx
import { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello!</h1>;
  }
}
```

**Note:** Class components are rarely used in new code. We'll focus on function components throughout this course.

## 📏 Component Rules

### 1. Name Must Start with Capital Letter

```jsx
// ❌ Won't work - lowercase
function greeting() {
  return <h1>Hello</h1>;
}
<greeting />  // React thinks it's an HTML tag

// ✅ Works - PascalCase
function Greeting() {
  return <h1>Hello</h1>;
}
<Greeting />  // React knows it's a component
```

### 2. Must Return JSX (or null)

```jsx
// ✅ Returns JSX
function ValidComponent() {
  return <div>Content</div>;
}

// ✅ Returns null (renders nothing)
function MaybeShow({ show }) {
  if (!show) return null;
  return <div>I'm visible!</div>;
}

// ❌ Returns undefined (error)
function BrokenComponent() {
  <div>Oops, forgot return!</div>
}
```

### 3. Must Return Single Element

```jsx
// ❌ Multiple elements without wrapper
function Invalid() {
  return (
    <h1>Title</h1>
    <p>Text</p>
  );
}

// ✅ Wrapped in div
function ValidDiv() {
  return (
    <div>
      <h1>Title</h1>
      <p>Text</p>
    </div>
  );
}

// ✅ Wrapped in Fragment (preferred - no extra DOM node)
function ValidFragment() {
  return (
    <>
      <h1>Title</h1>
      <p>Text</p>
    </>
  );
}
```

## 🧩 Component Composition

Components can contain other components - this is called **composition**.

```jsx
function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
      <SearchBar />
    </header>
  );
}

function Logo() {
  return <img src="/logo.svg" alt="Logo" />;
}

function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  );
}

function SearchBar() {
  return <input type="search" placeholder="Search..." />;
}
```

### Component Tree

```
        App
         │
    ┌────┴────┐
    │         │
  Header    Main
    │         │
┌───┼───┐     │
│   │   │   Content
Logo Nav Search
```

## 📁 File Organization

### One Component Per File (Recommended)

```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Button.jsx
│   └── Card.jsx
├── App.jsx
└── main.jsx
```

**Header.jsx:**
```jsx
function Header() {
  return <header>...</header>;
}

export default Header;
```

**App.jsx:**
```jsx
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      {/* ... */}
    </div>
  );
}
```

### Named vs Default Exports

```jsx
// Default export (one per file)
export default function Button() { ... }
import Button from './Button';  // Name can be anything

// Named export (multiple allowed)
export function Button() { ... }
export function IconButton() { ... }
import { Button, IconButton } from './Buttons';  // Must match names
```

## 🎨 Creating a Component Library

Let's build some reusable components:

```jsx
// Button.jsx
function Button({ children, variant = 'primary' }) {
  const styles = {
    primary: { backgroundColor: '#3b82f6', color: 'white' },
    secondary: { backgroundColor: '#e5e7eb', color: '#374151' },
    danger: { backgroundColor: '#ef4444', color: 'white' }
  };

  return (
    <button style={{
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      ...styles[variant]
    }}>
      {children}
    </button>
  );
}

// Card.jsx  
function Card({ title, children }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      {children}
    </div>
  );
}

// Badge.jsx
function Badge({ children, color = '#3b82f6' }) {
  return (
    <span style={{
      backgroundColor: color,
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600'
    }}>
      {children}
    </span>
  );
}
```

## 🧪 Live Example

Let's see components in action! Here's a complete example:

```jsx
// App.jsx
function App() {
  return (
    <div style={{ 
      fontFamily: 'system-ui',
      padding: '2rem',
      backgroundColor: '#f3f4f6',
      minHeight: '100vh'
    }}>
      <Header />
      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'white',
      marginBottom: '2rem'
    }}>
      <Logo />
      <Nav />
    </header>
  );
}

function Logo() {
  return (
    <div style={{ 
      fontSize: '1.5rem', 
      fontWeight: 'bold',
      color: '#3b82f6'
    }}>
      ⚛️ ReactTutorial
    </div>
  );
}

function Nav() {
  return (
    <nav style={{ display: 'flex', gap: '1.5rem' }}>
      <NavLink href="#" text="Home" />
      <NavLink href="#" text="Lessons" />
      <NavLink href="#" text="About" />
    </nav>
  );
}

function NavLink({ href, text }) {
  return (
    <a href={href} style={{ 
      textDecoration: 'none', 
      color: '#4b5563',
      fontWeight: '500'
    }}>
      {text}
    </a>
  );
}

function Hero() {
  return (
    <section style={{
      textAlign: 'center',
      padding: '3rem 0'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Learn React the Right Way
      </h1>
      <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
        Master modern React with hands-on examples and best practices
      </p>
      <Button>Get Started →</Button>
    </section>
  );
}

function Button({ children }) {
  return (
    <button style={{
      marginTop: '1.5rem',
      padding: '0.75rem 2rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer'
    }}>
      {children}
    </button>
  );
}

function Features() {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem'
    }}>
      <FeatureCard 
        icon="📚" 
        title="Comprehensive" 
        description="From basics to advanced patterns"
      />
      <FeatureCard 
        icon="💻" 
        title="Hands-on" 
        description="Learn by building real examples"
      />
      <FeatureCard 
        icon="🚀" 
        title="Modern" 
        description="Latest React 18+ features"
      />
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: '#6b7280', margin: 0 }}>{description}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '2rem',
      marginTop: '3rem',
      color: '#9ca3af'
    }}>
      Built with ⚛️ React | © 2024 React Tutorial
    </footer>
  );
}

export default App;
```

## 💡 Pro Tips

1. **Start with one file**, extract components as they grow
2. **Name components** after what they are, not what they do
3. **Keep components small** - if it's over 100 lines, split it
4. **Colocate related files** (component + styles + tests)

## ⚠️ Common Mistakes

```jsx
// ❌ Component name lowercase
function button() { ... }

// ❌ Forgetting to export
function Button() { ... }
// File doesn't export anything!

// ❌ Forgetting to return JSX
function Button() {
  <button>Click</button>  // Missing return!
}

// ❌ Wrong import path
import Button from './button';  // Case sensitive!
import Button from './Button';  // ✅ Correct
```

## ✅ Exercises

1. Create a `ProfileCard` component that displays a user's avatar, name, and bio
2. Create a `Navigation` component with multiple `NavItem` children
3. Split the live example into separate files in a `components` folder

## 🎯 Module 1 Complete!

You've learned:
- ✅ What React is and why to use it
- ✅ How to set up a React project
- ✅ JSX syntax and rules
- ✅ Creating and composing components

---

**Next Module:** [Module 2: Core Concepts →](../02-core-concepts/README.md)

