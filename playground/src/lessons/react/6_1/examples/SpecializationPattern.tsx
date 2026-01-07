// @ts-nocheck
// Generic Button (flexible, many options)
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'error' | 'warning';
  icon?: React.ReactNode;
  onClick?: () => void;
}

function Button({ children, variant, icon, onClick }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {icon} {children}
    </button>
  );
}

// Specialized versions (pre-configured for specific use cases)
function SuccessButton({ children, ...props }: SpecializedProps) {
  return (
    <Button variant="success" icon={<CheckIcon />} {...props}>
      {children}
    </Button>
  );
}

function DangerButton({ children, ...props }: SpecializedProps) {
  return (
    <Button variant="error" icon={<XIcon />} {...props}>
      {children}
    </Button>
  );
}
