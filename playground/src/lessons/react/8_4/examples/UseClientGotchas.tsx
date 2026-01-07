// @ts-nocheck
// ❌ GOTCHA 1: Passing functions as props
// Server Component
function ServerPage() {
  const doSomething = () => console.log('hi');
  return <ClientButton onClick={doSomething} />; // Error!
  // Functions are NOT serializable
}

// ✅ FIX: Use Server Actions or pass data instead
// Server Component
async function ServerPage() {
  return <ClientButton action={submitAction} />; // Server Action
}

// ❌ GOTCHA 2: Using hooks in Server Components
async function ServerComp() {
  const [state, setState] = useState(0); // Error!
  // No hooks in Server Components
}

// ❌ GOTCHA 3: Importing Server Component in Client
('use client');
import ServerComp from './ServerComp'; // Error!
// Can't import server-only code in client bundle

// ✅ FIX: Pass as children
function ClientWrapper({ children }) {
  return <div className="wrapper">{children}</div>;
}
// Usage: <ClientWrapper><ServerComp /></ClientWrapper>
