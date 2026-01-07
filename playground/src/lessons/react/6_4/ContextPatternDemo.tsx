// ============================================
// Context Pattern Demo
// ============================================

import { useState, createContext, useContext, ReactNode } from 'react';
import { HiChevronDown, HiChevronRight, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import contextCode from './examples/CreateContext.tsx?raw';
import parentCode from './examples/ParentComponent.tsx?raw';
import childCode from './examples/ChildComponents.tsx?raw';

// -------------------------------------------
// Accordion Example - Complete Implementation
// -------------------------------------------

interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within <Accordion>');
  }
  return context;
}

// Main Accordion Component
interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

function Accordion({ children, allowMultiple = false, defaultOpen = [] }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div className="divide-y divide-base-300 rounded-lg border border-base-300">{children}</div>
    </AccordionContext.Provider>
  );
}

// Accordion Item
interface AccordionItemProps {
  id: string;
  children: ReactNode;
}

function AccordionItem({ id, children }: AccordionItemProps) {
  return <div data-accordion-item={id}>{children}</div>;
}

// Accordion Trigger (Header)
interface AccordionTriggerProps {
  id: string;
  children: ReactNode;
}

function AccordionTrigger({ id, children }: AccordionTriggerProps) {
  const { openItems, toggleItem } = useAccordionContext();
  const isOpen = openItems.has(id);

  return (
    <button
      onClick={() => toggleItem(id)}
      className="flex items-center justify-between w-full p-4 text-left font-medium hover:bg-base-200 transition-colors"
    >
      <span>{children}</span>
      {isOpen ? (
        <HiChevronDown className="text-primary" size={20} />
      ) : (
        <HiChevronRight className="text-base-content/50" size={20} />
      )}
    </button>
  );
}

// Accordion Content (Panel)
interface AccordionContentProps {
  id: string;
  children: ReactNode;
}

function AccordionContent({ id, children }: AccordionContentProps) {
  const { openItems } = useAccordionContext();
  const isOpen = openItems.has(id);

  if (!isOpen) return null;

  return <div className="px-4 pb-4 text-base-content/70">{children}</div>;
}

// Attach sub-components
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

// -------------------------------------------
// Code Examples
// -------------------------------------------

export default function ContextPatternDemo(): React.ReactElement {
  const [showCode, setShowCode] = useState<'context' | 'parent' | 'child' | null>(null);
  const [allowMultiple, setAllowMultiple] = useState(false);

  return (
    <div className="space-y-6">
      {/* The Pattern Explanation */}
      <div className="card bg-base-200 p-4">
        <div className="flex items-start gap-3">
          <HiOutlineLightBulb className="text-warning mt-1 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-warning mb-1">The Context Pattern</p>
            <p className="text-base-content/70 text-sm">
              The parent component creates a{' '}
              <strong className="text-primary">Context Provider</strong> with shared state. Child
              components <strong className="text-secondary">consume</strong> this context
              automatically — no props drilling!
            </p>
          </div>
        </div>
      </div>

      {/* Three Steps */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => setShowCode(showCode === 'context' ? null : 'context')}
          className={`card p-4 text-left transition-all ${
            showCode === 'context'
              ? 'bg-primary/20 ring-2 ring-primary'
              : 'bg-base-200 hover:bg-base-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-content text-sm flex items-center justify-center font-bold">
              1
            </span>
            <h4 className="font-semibold">Create Context</h4>
          </div>
          <p className="text-sm text-base-content/70">
            Define the shape of shared state and create a typed context
          </p>
        </button>

        <button
          onClick={() => setShowCode(showCode === 'parent' ? null : 'parent')}
          className={`card p-4 text-left transition-all ${
            showCode === 'parent'
              ? 'bg-secondary/20 ring-2 ring-secondary'
              : 'bg-base-200 hover:bg-base-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-secondary text-secondary-content text-sm flex items-center justify-center font-bold">
              2
            </span>
            <h4 className="font-semibold">Parent Provides</h4>
          </div>
          <p className="text-sm text-base-content/70">
            Parent manages state and wraps children with Provider
          </p>
        </button>

        <button
          onClick={() => setShowCode(showCode === 'child' ? null : 'child')}
          className={`card p-4 text-left transition-all ${
            showCode === 'child'
              ? 'bg-accent/20 ring-2 ring-accent'
              : 'bg-base-200 hover:bg-base-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-accent text-accent-content text-sm flex items-center justify-center font-bold">
              3
            </span>
            <h4 className="font-semibold">Children Consume</h4>
          </div>
          <p className="text-sm text-base-content/70">
            Children use the hook to access shared state and actions
          </p>
        </button>
      </div>

      {/* Code Display */}
      {showCode && (
        <CodeSnippet
          title={
            showCode === 'context'
              ? 'Step 1: Create Context'
              : showCode === 'parent'
                ? 'Step 2: Parent Component'
                : 'Step 3: Child Components'
          }
          language="tsx"
          code={
            showCode === 'context' ? contextCode : showCode === 'parent' ? parentCode : childCode
          }
        />
      )}

      {/* Live Demo */}
      <div className="card bg-base-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Live Demo: Accordion</h4>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={allowMultiple}
              onChange={(e) => setAllowMultiple(e.target.checked)}
              className="checkbox checkbox-primary checkbox-sm"
            />
            Allow multiple open
          </label>
        </div>

        <div className="bg-base-300 rounded-lg">
          <Accordion allowMultiple={allowMultiple} defaultOpen={['faq1']}>
            <Accordion.Item id="faq1">
              <Accordion.Trigger id="faq1">What are compound components?</Accordion.Trigger>
              <Accordion.Content id="faq1">
                Compound components are a pattern where multiple components work together, sharing
                implicit state through Context. They provide a flexible, declarative API.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item id="faq2">
              <Accordion.Trigger id="faq2">Why use Context for this?</Accordion.Trigger>
              <Accordion.Content id="faq2">
                Context allows the parent to share state with deeply nested children without prop
                drilling. Each child component can access exactly what it needs.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item id="faq3">
              <Accordion.Trigger id="faq3">When should I use this pattern?</Accordion.Trigger>
              <Accordion.Content id="faq3">
                Use compound components when you have a group of related components that need to
                share state: tabs, accordions, menus, form fields, modal dialogs, etc.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        <p className="text-xs text-base-content/50 mt-2">
          Toggle "Allow multiple open" to see how parent state affects all children
        </p>
      </div>

      {/* Key Insight */}
      <div className="card bg-linear-to-r from-primary/10 to-secondary/10 p-4">
        <p className="text-sm">
          <strong className="text-primary">Key Insight:</strong> The{' '}
          <code className="text-accent">Accordion.Trigger</code> and{' '}
          <code className="text-accent">Accordion.Content</code> components don't receive any props
          from their parent — they get everything they need from{' '}
          <strong className="text-secondary">Context</strong>!
        </p>
      </div>
    </div>
  );
}
