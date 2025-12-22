// @ts-nocheck
// An HOC is a function that takes a component...
function withBorder(WrappedComponent, color = 'blue') {
  // ...and returns a NEW component
  return function WithBorderComponent(props) {
    return (
      <div className={`border-2 border-${color}`}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

// Original component
function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}

// Enhanced component (with border added)
const GreetingWithBorder = withBorder(Greeting, 'blue');

// Usage - same props as original!
<GreetingWithBorder name="React" />;
