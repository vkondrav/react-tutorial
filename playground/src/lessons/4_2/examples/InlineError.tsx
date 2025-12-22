// @ts-nocheck
// Inline error component
function InlineError({ message }) {
  return (
    <div
      className="flex items-center gap-2 
      text-error text-sm mt-1"
    >
      <ExclamationIcon size={16} />
      <span>{message}</span>
    </div>
  );
}

// Usage in form
{
  error && <InlineError message={error} />;
}
