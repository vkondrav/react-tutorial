// ============================================
// Children Prop Demo
// Shows how children prop enables containment
// ============================================

import { useState, ReactNode } from 'react';
import { HiChevronDown, HiChevronRight, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../components';

// ---- Containment Component Examples ----

// Simple card container
interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-lg border border-base-300 bg-base-200 p-4 ${className}`}>
      {children}
    </div>
  );
}

// Fancy border container
interface FancyBorderProps {
  children: ReactNode;
  color?: 'blue' | 'purple' | 'green' | 'orange';
}

function FancyBorder({ children, color = 'blue' }: FancyBorderProps) {
  const colors = {
    blue: 'border-blue-500 bg-blue-500/10',
    purple: 'border-purple-500 bg-purple-500/10',
    green: 'border-green-500 bg-green-500/10',
    orange: 'border-orange-500 bg-orange-500/10',
  };

  return (
    <div className={`border-2 rounded-lg p-4 ${colors[color]}`}>
      {children}
    </div>
  );
}

// Collapsible section
interface CollapsibleProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-base-300 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 p-3 bg-base-200 hover:bg-base-300 transition-colors"
      >
        {isOpen ? <HiChevronDown size={18} /> : <HiChevronRight size={18} />}
        <span className="font-medium">{title}</span>
      </button>
      {isOpen && (
        <div className="p-4 border-t border-base-300">
          {children}
        </div>
      )}
    </div>
  );
}

const basicChildrenCode = `interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="card bg-base-200 p-4">
      {children}  {/* Whatever you put between <Card>...</Card> */}
    </div>
  );
}

// Usage - children can be anything!
<Card>
  <h2>Title</h2>
  <p>Any content works here.</p>
</Card>`;

const childrenTypesCode = `// Children can be many things:

// 1. Text
<Card>Hello!</Card>

// 2. Elements
<Card><h1>Title</h1></Card>

// 3. Multiple elements
<Card>
  <h1>Title</h1>
  <p>Description</p>
</Card>

// 4. Components
<Card>
  <UserProfile />
  <UserActions />
</Card>

// 5. Mixed content
<Card>
  Welcome, <strong>{username}</strong>!
</Card>`;

export default function ChildrenPropDemo() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Basic Explanation */}
      <div className="card bg-base-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">How Children Works</h4>
          <button
            onClick={() => setShowCode(!showCode)}
            className="btn btn-xs btn-ghost"
          >
            {showCode ? 'Hide' : 'Show'} Code
          </button>
        </div>

        {showCode && (
          <CodeSnippet
            title="The children prop"
            language="tsx"
            code={basicChildrenCode}
          />
        )}

        <p className="text-sm text-base-content/70 mt-2">
          Anything between <code className="text-secondary">&lt;Component&gt;</code> and{' '}
          <code className="text-secondary">&lt;/Component&gt;</code> becomes the{' '}
          <code className="text-primary">children</code> prop.
        </p>
      </div>

      {/* Live Examples */}
      <div className="space-y-4">
        <h4 className="font-semibold">Live Examples: Same Container, Different Content</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card examples */}
          <Card>
            <h3 className="font-bold text-primary mb-2">Card with Text</h3>
            <p className="text-sm text-base-content/70">
              Just simple text content inside a card container.
            </p>
          </Card>

          <Card>
            <h3 className="font-bold text-primary mb-2">Card with List</h3>
            <ul className="text-sm space-y-1">
              <li>• First item</li>
              <li>• Second item</li>
              <li>• Third item</li>
            </ul>
          </Card>
        </div>

        {/* FancyBorder examples */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FancyBorder color="blue">
            <p className="text-sm font-medium text-center">Blue</p>
          </FancyBorder>
          <FancyBorder color="purple">
            <p className="text-sm font-medium text-center">Purple</p>
          </FancyBorder>
          <FancyBorder color="green">
            <p className="text-sm font-medium text-center">Green</p>
          </FancyBorder>
          <FancyBorder color="orange">
            <p className="text-sm font-medium text-center">Orange</p>
          </FancyBorder>
        </div>
      </div>

      {/* Collapsible Example */}
      <div className="space-y-3">
        <h4 className="font-semibold">Interactive Container: Collapsible</h4>

        <Collapsible title="What can children be?" defaultOpen>
          <CodeSnippet
            title="Children types"
            language="tsx"
            code={childrenTypesCode}
            showCopy={false}
          />
        </Collapsible>

        <Collapsible title="Why use the children pattern?">
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              <span>Components don't need to know what they'll contain ahead of time</span>
            </li>
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              <span>Reuse containers with completely different content</span>
            </li>
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              <span>Keep styling/behavior separate from content</span>
            </li>
            <li className="flex gap-2">
              <span className="text-success">✓</span>
              <span>Build flexible UI primitives (cards, modals, layouts)</span>
            </li>
          </ul>
        </Collapsible>

        <Collapsible title="Nested composition example">
          <FancyBorder color="purple">
            <Card>
              <p className="text-sm">
                This card is inside a FancyBorder — <strong>composition at work!</strong>
              </p>
            </Card>
          </FancyBorder>
        </Collapsible>
      </div>

      {/* Key Insight */}
      <div className="card bg-base-300 p-4">
        <div className="flex gap-3">
          <HiOutlineLightBulb className="text-warning text-xl shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Think of Children as a "Hole"</h4>
            <p className="text-sm text-base-content/70">
              A component with <code className="text-secondary">children</code> is like a picture
              frame — it provides structure and styling, but you decide what goes inside. This is
              the essence of <strong className="text-primary">containment</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

