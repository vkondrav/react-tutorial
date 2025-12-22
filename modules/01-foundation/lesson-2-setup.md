# Lesson 1.2: Setting Up Your First React App

## 📖 Introduction

We've already set up a React project using **Vite** - the modern, lightning-fast build tool. Let's understand what we have and how it works.

## 🛠 The Modern Way: Vite

**Vite** (French for "fast") is the recommended way to create new React apps in 2024+. It offers:

- ⚡ Instant server start
- 🔥 Hot Module Replacement (HMR)
- 📦 Optimized builds
- 🎯 Out-of-the-box TypeScript support

### Project Structure

Our playground has this structure:

```
playground/
├── index.html          # Entry HTML file
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
├── public/             # Static assets
│   └── vite.svg
└── src/                # Source code
    ├── main.jsx        # React entry point
    ├── App.jsx         # Root component
    ├── App.css         # Component styles
    └── index.css       # Global styles
```

## 📄 Key Files Explained

### 1. `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>           <!-- React mounts here! -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

The `<div id="root">` is where your entire React app will be rendered.

### 2. `src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

This file:
1. Imports React and ReactDOM
2. Imports your root `App` component
3. Mounts the app to the `#root` div

**StrictMode** helps catch common mistakes during development.

### 3. `src/App.jsx`

```jsx
function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
    </div>
  )
}

export default App
```

This is your root component - the starting point of your UI.

## 🚀 Running the Dev Server

To start your React app:

```bash
cd playground
npm run dev
```

This starts a development server at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🔥 Hot Module Replacement (HMR)

One of Vite's killer features! When you save a file:

1. Only the changed module is updated
2. Your app state is preserved
3. Changes appear instantly (no full reload)

Try it: Change some text in `App.jsx` and save. The browser updates immediately!

## 📦 package.json

```json
{
  "name": "playground",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.5.2",
    "vite": "^6.3.5"
  }
}
```

Key dependencies:
- **react**: The React library itself
- **react-dom**: React's DOM rendering library
- **vite**: The build tool
- **@vitejs/plugin-react**: Vite's React integration

## 💡 Pro Tips

### 1. Use the React DevTools

Install the [React Developer Tools](https://react.dev/learn/react-developer-tools) browser extension to:
- Inspect component hierarchy
- View and edit props/state
- Profile performance

### 2. ESLint is Your Friend

The template includes ESLint for catching errors:

```bash
npm run lint
```

### 3. VS Code Extensions

Recommended for Cursor:
- **ES7+ React/Redux/React-Native snippets**
- **Prettier** for code formatting
- **Auto Rename Tag** for JSX

## ⚠️ Common Setup Issues

| Problem | Solution |
|---------|----------|
| Port already in use | Change port in `vite.config.js` or kill the process |
| Module not found | Run `npm install` |
| Blank page | Check browser console for errors |

## ✅ Exercise

1. Navigate to the `playground` folder
2. Run `npm run dev`
3. Open `http://localhost:5173` in your browser
4. Edit `src/App.jsx` - change the text
5. Watch it hot-reload!

---

**Next up:** [Lesson 1.3: Understanding JSX →](./lesson-3-jsx.md)

