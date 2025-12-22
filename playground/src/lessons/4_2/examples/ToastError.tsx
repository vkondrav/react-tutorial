// @ts-nocheck
// Toast error component
function ToastError({ message, onDismiss }) {
  return (
    <div
      className="flex items-center gap-3 
      bg-error/10 border border-error/30 
      rounded-lg p-3"
    >
      <ExclamationIcon className="text-error" />
      <span className="flex-1">{message}</span>
      <button onClick={onDismiss}>
        <XIcon />
      </button>
    </div>
  );
}

// In component with async operation
try {
  await saveData();
} catch (err) {
  setToastError(err.message);
}
