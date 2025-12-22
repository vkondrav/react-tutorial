// @ts-nocheck
// Reusable EmptyState component
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center 
      text-center py-12"
    >
      <div className="text-base-content/30 mb-4">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-base-content/60 text-sm">{description}</p>
      {action && (
        <button onClick={action.onClick} className="btn btn-primary btn-sm mt-6">
          {action.label}
        </button>
      )}
    </div>
  );
}
