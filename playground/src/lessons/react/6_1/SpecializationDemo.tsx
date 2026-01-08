// ============================================
// Specialization Demo
// Shows creating specialized versions of components
// ============================================

import { useState, ReactNode } from 'react';
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
  HiOutlineXCircle,
  HiOutlineLightBulb,
} from 'react-icons/hi';
import { CodeSnippet } from '@components';
import specializationCode from './examples/SpecializationPattern.tsx?raw';
import usageCode from './examples/SpecializationUsage.tsx?raw';

// ---- Generic Component ----

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    ghost: 'btn-ghost',
  };

  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </button>
  );
}

// ---- Specialized Components (using composition!) ----

interface SpecializedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function SuccessButton({ children, ...props }: SpecializedButtonProps) {
  return (
    <Button variant="success" icon={<HiOutlineCheckCircle size={18} />} {...props}>
      {children}
    </Button>
  );
}

function DangerButton({ children, ...props }: SpecializedButtonProps) {
  return (
    <Button variant="error" icon={<HiOutlineXCircle size={18} />} {...props}>
      {children}
    </Button>
  );
}

function WarningButton({ children, ...props }: SpecializedButtonProps) {
  return (
    <Button variant="warning" icon={<HiOutlineExclamationCircle size={18} />} {...props}>
      {children}
    </Button>
  );
}

// ---- Generic Alert ----

interface AlertProps {
  children: ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
}

function Alert({ children, type = 'info', title }: AlertProps) {
  const styles = {
    info: {
      bg: 'bg-info/10 border-info',
      icon: <HiOutlineInformationCircle className="text-info" size={20} />,
    },
    success: {
      bg: 'bg-success/10 border-success',
      icon: <HiOutlineCheckCircle className="text-success" size={20} />,
    },
    warning: {
      bg: 'bg-warning/10 border-warning',
      icon: <HiOutlineExclamationCircle className="text-warning" size={20} />,
    },
    error: {
      bg: 'bg-error/10 border-error',
      icon: <HiOutlineXCircle className="text-error" size={20} />,
    },
  };

  return (
    <div className={`flex gap-3 p-3 rounded-lg border ${styles[type].bg}`}>
      <div className="shrink-0 mt-0.5">{styles[type].icon}</div>
      <div>
        {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
        <div className="text-sm text-base-content/80">{children}</div>
      </div>
    </div>
  );
}

// ---- Specialized Alerts ----

interface SpecializedAlertProps {
  children: ReactNode;
  title?: string;
}

function SuccessAlert({ children, title = 'Success!' }: SpecializedAlertProps) {
  return (
    <Alert type="success" title={title}>
      {children}
    </Alert>
  );
}

function ErrorAlert({ children, title = 'Error' }: SpecializedAlertProps) {
  return (
    <Alert type="error" title={title}>
      {children}
    </Alert>
  );
}

function WarningAlert({ children, title = 'Warning' }: SpecializedAlertProps) {
  return (
    <Alert type="warning" title={title}>
      {children}
    </Alert>
  );
}

export default function SpecializationDemo() {
  const [clicked, setClicked] = useState<string | null>(null);

  const showClick = (name: string) => {
    setClicked(name);
    setTimeout(() => setClicked(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Explanation */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">What is Specialization?</h4>
        <p className="text-sm text-base-content/70 mb-4">
          <strong className="text-primary">Specialization</strong> means creating specific versions
          of a generic component by wrapping it with pre-set props. The specialized component is
          simpler to use and more semantic.
        </p>

        <CodeSnippet
          title="Creating specialized components"
          language="tsx"
          code={specializationCode}
        />
      </div>

      {/* Live Demo: Buttons */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-4">Live Demo: Specialized Buttons</h4>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-base-content/60 mb-2">Generic Button (all options)</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" onClick={() => showClick('Primary')}>
                Primary
              </Button>
              <Button variant="secondary" onClick={() => showClick('Secondary')}>
                Secondary
              </Button>
              <Button variant="success" onClick={() => showClick('Success')}>
                Success
              </Button>
              <Button variant="warning" onClick={() => showClick('Warning')}>
                Warning
              </Button>
              <Button variant="error" onClick={() => showClick('Error')}>
                Error
              </Button>
              <Button variant="ghost" onClick={() => showClick('Ghost')}>
                Ghost
              </Button>
            </div>
          </div>

          <div>
            <p className="text-xs text-base-content/60 mb-2">
              Specialized Buttons (pre-configured)
            </p>
            <div className="flex flex-wrap gap-2">
              <SuccessButton onClick={() => showClick('Success Button')}>
                Save Changes
              </SuccessButton>
              <DangerButton onClick={() => showClick('Danger Button')}>Delete Item</DangerButton>
              <WarningButton onClick={() => showClick('Warning Button')}>
                Proceed with Caution
              </WarningButton>
            </div>
          </div>

          {clicked && <div className="text-sm text-success animate-pulse">Clicked: {clicked}</div>}
        </div>
      </div>

      {/* Live Demo: Alerts */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-4">Live Demo: Specialized Alerts</h4>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-base-content/60 mb-2">Generic Alert</p>
            <Alert type="info">
              This is a generic info alert. You must specify the type each time.
            </Alert>
          </div>

          <div>
            <p className="text-xs text-base-content/60 mb-2">Specialized Alerts</p>
            <div className="space-y-2">
              <SuccessAlert>Your changes have been saved successfully!</SuccessAlert>
              <ErrorAlert>Failed to connect to the server. Please try again.</ErrorAlert>
              <WarningAlert>Your session will expire in 5 minutes.</WarningAlert>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Comparison */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Before & After Specialization</h4>
        <CodeSnippet title="Usage comparison" language="tsx" code={usageCode} />
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-success/10 border border-success p-4">
          <h5 className="font-semibold text-success mb-2">Benefits</h5>
          <ul className="text-sm space-y-1">
            <li>✓ Cleaner, more readable code</li>
            <li>✓ Semantic component names</li>
            <li>✓ Consistent styling enforced</li>
            <li>✓ Easier to use correctly</li>
            <li>✓ Single source of truth for variants</li>
          </ul>
        </div>

        <div className="card bg-base-300 p-4">
          <h5 className="font-semibold mb-2">When to Specialize?</h5>
          <ul className="text-sm space-y-1 text-base-content/80">
            <li>• Same props used repeatedly</li>
            <li>• Variant has specific meaning (danger, success)</li>
            <li>• Want to limit API surface</li>
            <li>• Need consistent styling across app</li>
          </ul>
        </div>
      </div>

      {/* Key Insight */}
      <div className="card bg-base-300 p-4">
        <div className="flex gap-3">
          <HiOutlineLightBulb className="text-warning text-xl shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Composition, Not Configuration</h4>
            <p className="text-sm text-base-content/70">
              Instead of one giant component with 20 props, create a{' '}
              <strong className="text-primary">generic base</strong> and{' '}
              <strong className="text-secondary">specialized wrappers</strong>. This is composition
              — building specific things from generic parts!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
