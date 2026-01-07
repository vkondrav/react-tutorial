// @ts-nocheck
function UserList({ users, loading, error, onRetry }) {
  // Check states in order:
  // loading → error → empty → data

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState message={error.message} onRetry={onRetry} />;
  }

  if (users.length === 0) {
    return <EmptyState />;
  }

  // Happy path: render the data
  return (
    <ul>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  );
}
