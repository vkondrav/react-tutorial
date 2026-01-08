// ============================================
// Slot Pattern Demo
// Shows named props for multiple insertion points
// ============================================

import { useState, ReactNode } from 'react';
import {
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineLogout,
  HiOutlineLightBulb,
} from 'react-icons/hi';
import { CodeSnippet } from '@components';
import slotPatternCode from './examples/SlotPattern.tsx?raw';
import comparisonCode from './examples/RigidVsFlexible.tsx?raw';

// ---- Slot Pattern Components ----

// Layout with header/sidebar/content slots
interface PageLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode; // main content
}

function PageLayout({ header, sidebar, children }: PageLayoutProps) {
  return (
    <div className="border border-base-300 rounded-lg overflow-hidden text-sm">
      {/* Header */}
      <div className="bg-base-300 px-4 py-2 border-b border-base-300">{header}</div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-32 bg-base-200 border-r border-base-300 p-2">{sidebar}</div>
        {/* Main content */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}

// Card with header/footer slots
interface CardWithSlotsProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

function CardWithSlots({ header, footer, children }: CardWithSlotsProps) {
  return (
    <div className="border border-base-300 rounded-lg overflow-hidden">
      {header && (
        <div className="bg-base-300 px-4 py-2 border-b border-base-300 font-medium">{header}</div>
      )}
      <div className="p-4">{children}</div>
      {footer && <div className="bg-base-200 px-4 py-2 border-t border-base-300">{footer}</div>}
    </div>
  );
}

// Modal with title/actions slots
interface ModalProps {
  title: ReactNode;
  actions: ReactNode;
  children: ReactNode;
}

function Modal({ title, actions, children }: ModalProps) {
  return (
    <div className="bg-base-300 rounded-lg shadow-xl max-w-sm mx-auto overflow-hidden">
      <div className="bg-base-200 px-4 py-3 border-b border-base-300">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="p-4 text-sm text-base-content/80">{children}</div>
      <div className="px-4 py-3 bg-base-200 border-t border-base-300 flex justify-end gap-2">
        {actions}
      </div>
    </div>
  );
}

export default function SlotPatternDemo() {
  const [activeExample, setActiveExample] = useState<'layout' | 'card' | 'modal'>('layout');

  return (
    <div className="space-y-6">
      {/* Explanation */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Why Use Named Slots?</h4>
        <p className="text-sm text-base-content/70 mb-4">
          The <code className="text-secondary">children</code> prop is great for single content
          areas, but what if you need{' '}
          <strong className="text-primary">multiple insertion points</strong>? Use additional props
          that accept <code className="text-secondary">ReactNode</code>!
        </p>

        <CodeSnippet title="The slot pattern" language="tsx" code={slotPatternCode} />
      </div>

      {/* Interactive Examples */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveExample('layout')}
            className={`btn btn-sm ${activeExample === 'layout' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Page Layout
          </button>
          <button
            onClick={() => setActiveExample('card')}
            className={`btn btn-sm ${activeExample === 'card' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Card
          </button>
          <button
            onClick={() => setActiveExample('modal')}
            className={`btn btn-sm ${activeExample === 'modal' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Modal
          </button>
        </div>

        {activeExample === 'layout' && (
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-base-content/70">
              3 slots: header, sidebar, children
            </h5>
            <PageLayout
              header={
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">My App</span>
                  <div className="flex gap-2">
                    <HiOutlineBell size={16} />
                    <HiOutlineUser size={16} />
                  </div>
                </div>
              }
              sidebar={
                <nav className="space-y-1">
                  <div className="flex items-center gap-2 p-1.5 rounded hover:bg-base-300 cursor-pointer">
                    <HiOutlineUser size={14} /> Profile
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded hover:bg-base-300 cursor-pointer">
                    <HiOutlineCog size={14} /> Settings
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded hover:bg-base-300 cursor-pointer text-error">
                    <HiOutlineLogout size={14} /> Logout
                  </div>
                </nav>
              }
            >
              <h2 className="font-bold mb-2">Welcome Back!</h2>
              <p className="text-base-content/70">
                This is the main content area. Notice how each slot renders in its designated
                position.
              </p>
            </PageLayout>
          </div>
        )}

        {activeExample === 'card' && (
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-base-content/70">
              Optional slots: header, children (required), footer
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardWithSlots header={<span className="text-primary">With Header</span>}>
                <p className="text-sm">This card has a header but no footer.</p>
              </CardWithSlots>

              <CardWithSlots
                footer={
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-xs btn-ghost">Cancel</button>
                    <button className="btn btn-xs btn-primary">Save</button>
                  </div>
                }
              >
                <p className="text-sm">This card has a footer but no header.</p>
              </CardWithSlots>

              <CardWithSlots
                header={<span className="text-success">Full Card</span>}
                footer={<span className="text-xs text-base-content/60">Last updated: today</span>}
              >
                <p className="text-sm">This card has both header and footer slots filled.</p>
              </CardWithSlots>

              <CardWithSlots>
                <p className="text-sm">This card has no header or footer — just content.</p>
              </CardWithSlots>
            </div>
          </div>
        )}

        {activeExample === 'modal' && (
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-base-content/70">
              3 slots: title, children, actions
            </h5>
            <div className="bg-base-100/50 p-6 rounded-lg">
              <Modal
                title="Confirm Delete"
                actions={
                  <>
                    <button className="btn btn-sm btn-ghost">Cancel</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </>
                }
              >
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
              </Modal>
            </div>
          </div>
        )}
      </div>

      {/* Comparison */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Rigid vs Flexible Components</h4>
        <CodeSnippet title="Comparison" language="tsx" code={comparisonCode} />
      </div>

      {/* Key Insight */}
      <div className="card bg-base-300 p-4">
        <div className="flex gap-3">
          <HiOutlineLightBulb className="text-warning text-xl shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Named Slots = Multiple Holes</h4>
            <p className="text-sm text-base-content/70">
              Think of each slot prop as a labeled hole in your component. The{' '}
              <code className="text-secondary">children</code> prop is the default/main hole, but
              you can add as many named holes as you need with additional{' '}
              <code className="text-secondary">ReactNode</code> props.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
