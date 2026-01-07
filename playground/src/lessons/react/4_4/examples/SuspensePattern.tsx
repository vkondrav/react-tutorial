// @ts-nocheck
// 1. Create promise cache outside component
let usersPromise: Promise<User[]> | null = null;

function getUsersPromise(): Promise<User[]> {
  if (!usersPromise) {
    usersPromise = fetch('/api/users').then((r) => r.json());
  }
  return usersPromise;
}

// 2. Component that reads the data
function UserList({ promise }: { promise: Promise<User[]> }) {
  const users = use(promise); // Suspends until resolved!
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// 3. Parent wraps in Suspense + ErrorBoundary
function App() {
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <Suspense fallback={<Loading />}>
        <UserList promise={getUsersPromise()} />
      </Suspense>
    </ErrorBoundary>
  );
}
