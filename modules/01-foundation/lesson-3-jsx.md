# Lesson 1.3: Understanding JSX

## 📖 What is JSX?

**JSX** (JavaScript XML) is a syntax extension that lets you write HTML-like code in JavaScript. It's not HTML, and it's not a string - it's syntactic sugar for `React.createElement()`.

```jsx
// This JSX:
const element = <h1 className="title">Hello, World!</h1>;

// Becomes this JavaScript:
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello, World!'
);
```

## 🆚 JSX vs HTML

JSX looks like HTML but has important differences:

| HTML | JSX | Why? |
|------|-----|------|
| `class` | `className` | `class` is a reserved word in JS |
| `for` | `htmlFor` | `for` is a reserved word in JS |
| `onclick` | `onClick` | camelCase for events |
| `tabindex` | `tabIndex` | camelCase for attributes |
| `style="color: red"` | `style={{ color: 'red' }}` | Object instead of string |

### Style Differences

```jsx
// ❌ HTML style (won't work)
<div style="background-color: blue; font-size: 16px;">

// ✅ JSX style (correct)
<div style={{ backgroundColor: 'blue', fontSize: '16px' }}>

// ✅ Even better - use CSS classes
<div className="my-styled-div">
```

## 🔀 Embedding JavaScript in JSX

Use curly braces `{}` to embed any JavaScript expression:

```jsx
function Greeting() {
  const name = "Alice";
  const age = 25;
  
  return (
    <div>
      {/* Variables */}
      <h1>Hello, {name}!</h1>
      
      {/* Expressions */}
      <p>Next year you'll be {age + 1}</p>
      
      {/* Function calls */}
      <p>Your name uppercased: {name.toUpperCase()}</p>
      
      {/* Ternary operators */}
      <p>{age >= 18 ? 'Adult' : 'Minor'}</p>
      
      {/* Template literals work too */}
      <p>{`${name} is ${age} years old`}</p>
    </div>
  );
}
```

### What Can Go in `{}`?

✅ **Can use:**
- Variables: `{name}`
- Math: `{2 + 2}`
- Function calls: `{formatDate(date)}`
- Ternary: `{isLoggedIn ? 'Welcome' : 'Please log in'}`
- Array methods: `{items.map(item => <li>{item}</li>)}`

❌ **Cannot use:**
- Statements: `{if (x) {...}}` ← Won't work!
- Loops: `{for (let i...) {...}}` ← Won't work!
- Object literals directly: `{myObject}` ← Error!

## 📏 JSX Rules

### 1. Single Root Element

Every JSX expression must have ONE parent element:

```jsx
// ❌ Error: Adjacent JSX elements must be wrapped
function Bad() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
}

// ✅ Wrap in a div
function GoodDiv() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}

// ✅ Or use a Fragment (no extra DOM element)
function GoodFragment() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}
```

### 2. Close All Tags

Every tag must be closed, including self-closing ones:

```jsx
// ❌ HTML allows this
<img src="photo.jpg">
<br>
<input type="text">

// ✅ JSX requires self-closing
<img src="photo.jpg" />
<br />
<input type="text" />
```

### 3. camelCase Attributes

All attributes use camelCase:

```jsx
<button 
  onClick={handleClick}      // not onclick
  tabIndex={1}               // not tabindex
  autoFocus                  // not autofocus
  maxLength={100}            // not maxlength
/>
```

## 💬 Comments in JSX

```jsx
function App() {
  return (
    <div>
      {/* This is a JSX comment */}
      <h1>Hello</h1>
      
      {/* 
        Multi-line
        comment 
      */}
      <p>World</p>
    </div>
  );
}

// Regular JS comments work outside JSX
// Like this one
```

## 🎨 Conditional Rendering Preview

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {/* Method 1: Ternary */}
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}
      
      {/* Method 2: && for "show or nothing" */}
      {isLoggedIn && <button>Logout</button>}
      
      {/* Method 3: || for defaults */}
      <p>Hello, {username || 'Guest'}</p>
    </div>
  );
}
```

## 📝 Rendering Lists Preview

```jsx
function TodoList() {
  const todos = ['Learn React', 'Build Apps', 'Get Hired'];
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}
```

## 🧪 Live Example

Let's create a JSX demo! Update your `App.jsx`:

```jsx
function App() {
  const user = {
    name: 'Sarah',
    age: 28,
    hobbies: ['coding', 'reading', 'gaming']
  };
  
  const currentDate = new Date().toLocaleDateString();
  const isWeekend = [0, 6].includes(new Date().getDay());

  return (
    <div style={{ 
      fontFamily: 'system-ui', 
      maxWidth: '600px', 
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#f0f4f8',
      borderRadius: '12px'
    }}>
      <h1 style={{ color: '#2d3748' }}>
        👋 Hello, {user.name}!
      </h1>
      
      <p>Today is {currentDate}</p>
      
      {isWeekend ? (
        <p style={{ color: 'green' }}>🎉 It's the weekend!</p>
      ) : (
        <p style={{ color: 'blue' }}>💼 It's a workday</p>
      )}
      
      <h2>Your Hobbies:</h2>
      <ul>
        {user.hobbies.map((hobby, index) => (
          <li key={index}>
            {hobby.charAt(0).toUpperCase() + hobby.slice(1)}
          </li>
        ))}
      </ul>
      
      {user.age >= 18 && (
        <p>✅ You are an adult ({user.age} years old)</p>
      )}
    </div>
  );
}

export default App;
```

## 💡 Pro Tips

1. **Use Fragments** `<>...</>` to avoid unnecessary wrapper divs
2. **Prettier** will auto-format your JSX beautifully
3. **Extract complex expressions** into variables for readability
4. **Use parentheses** around multi-line JSX for clarity

## ⚠️ Common Mistakes

```jsx
// ❌ Forgetting curly braces
<p>Hello, name</p>           // Renders literally "name"
<p>Hello, {name}</p>         // ✅ Renders the variable

// ❌ Using class instead of className
<div class="container">       // Warning!
<div className="container">   // ✅ Correct

// ❌ Not closing tags
<img src="photo.jpg">         // Error!
<img src="photo.jpg" />       // ✅ Correct

// ❌ Rendering objects directly
<p>{user}</p>                 // Error: Objects not valid as React child
<p>{user.name}</p>            // ✅ Render specific properties
```

## ✅ Exercise

1. Modify the live example to add your own information
2. Try adding a new array and rendering it as a list
3. Add a conditional that shows different content based on time of day

---

**Next up:** [Lesson 1.4: Components - Your First Building Block →](./lesson-4-components.md)

