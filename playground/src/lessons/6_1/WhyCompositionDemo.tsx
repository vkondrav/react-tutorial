// ============================================
// Why Composition Demo
// Shows composition vs inheritance approach
// ============================================

import { useState } from 'react';
import { HiX, HiCheck, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../components';

// ---- Inheritance Approach (Anti-pattern) ----
// This is how you might think to do it coming from OOP

const inheritanceCode = `// ❌ Inheritance approach (don't do this in React)
class Dialog extends React.Component {
  render() {
    return <div className="dialog">{this.renderContent()}</div>;
  }
  renderContent() { return null; } // Override in subclass
}

class WelcomeDialog extends Dialog {
  renderContent() {
    return <h1>Welcome!</h1>;
  }
}

class AlertDialog extends Dialog {
  renderContent() {
    return <h1>Warning!</h1>;
  }
}`;

// ---- Composition Approach (React way) ----
const compositionCode = `// ✅ Composition approach (React way)
function Dialog({ children }: { children: React.ReactNode }) {
  return <div className="dialog">{children}</div>;
}

// Use it by composing:
<Dialog>
  <h1>Welcome!</h1>
</Dialog>

<Dialog>
  <h1>Warning!</h1>
</Dialog>`;

// Simple Dialog component using composition
interface DialogProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

function Dialog({ children, variant = 'default' }: DialogProps) {
  const variantStyles = {
    default: 'border-base-300',
    success: 'border-success bg-success/10',
    warning: 'border-warning bg-warning/10',
    error: 'border-error bg-error/10',
  };

  return <div className={`border-2 rounded-lg p-4 ${variantStyles[variant]}`}>{children}</div>;
}

export default function WhyCompositionDemo() {
  const [activeTab, setActiveTab] = useState<'inheritance' | 'composition'>('inheritance');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('inheritance')}
          className={`btn btn-sm ${activeTab === 'inheritance' ? 'btn-error' : 'btn-ghost'}`}
        >
          <HiX size={16} />
          Inheritance (Don't)
        </button>
        <button
          onClick={() => setActiveTab('composition')}
          className={`btn btn-sm ${activeTab === 'composition' ? 'btn-success' : 'btn-ghost'}`}
        >
          <HiCheck size={16} />
          Composition (Do)
        </button>
      </div>

      {/* Content */}
      {activeTab === 'inheritance' ? (
        <div className="space-y-4">
          <CodeSnippet
            title="Inheritance approach (anti-pattern)"
            language="tsx"
            code={inheritanceCode}
          />

          <div className="card bg-error/10 border border-error p-4">
            <h4 className="font-semibold text-error flex items-center gap-2 mb-2">
              <HiX size={18} />
              Problems with Inheritance
            </h4>
            <ul className="text-sm space-y-1 text-base-content/80">
              <li>• Creates rigid hierarchies that are hard to change</li>
              <li>• Each variation needs a new subclass</li>
              <li>• Can't easily combine behaviors from multiple sources</li>
              <li>• Class components are more verbose than functions</li>
              <li>• Violates the "single responsibility" principle</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <CodeSnippet
            title="Composition approach (React way)"
            language="tsx"
            code={compositionCode}
          />

          {/* Live Demo */}
          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-4">Live Demo: Same Dialog, Different Content</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Dialog>
                <h3 className="font-bold text-lg">Welcome!</h3>
                <p className="text-sm text-base-content/70">Thanks for joining us today.</p>
              </Dialog>

              <Dialog variant="success">
                <h3 className="font-bold text-lg text-success">Success!</h3>
                <p className="text-sm text-base-content/70">Your changes have been saved.</p>
              </Dialog>

              <Dialog variant="warning">
                <h3 className="font-bold text-lg text-warning">Warning!</h3>
                <p className="text-sm text-base-content/70">This action cannot be undone.</p>
              </Dialog>

              <Dialog variant="error">
                <h3 className="font-bold text-lg text-error">Error!</h3>
                <p className="text-sm text-base-content/70">Something went wrong.</p>
              </Dialog>
            </div>
          </div>

          <div className="card bg-success/10 border border-success p-4">
            <h4 className="font-semibold text-success flex items-center gap-2 mb-2">
              <HiCheck size={18} />
              Benefits of Composition
            </h4>
            <ul className="text-sm space-y-1 text-base-content/80">
              <li>• One flexible component instead of many rigid subclasses</li>
              <li>• Content is passed in, not hard-coded</li>
              <li>• Easy to combine with other components</li>
              <li>• Simpler function components with hooks</li>
              <li>• Each component does one thing well</li>
            </ul>
          </div>
        </div>
      )}

      {/* Insight */}
      <div className="card bg-base-300 p-4">
        <div className="flex gap-3">
          <HiOutlineLightBulb className="text-warning text-xl shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">React's Philosophy</h4>
            <p className="text-sm text-base-content/70">
              "At Facebook, we use React in thousands of components, and we haven't found any use
              cases where we would recommend creating component inheritance hierarchies." — React
              docs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
