// ============================================
// Flexible API Demo
// ============================================

import { useState, createContext, useContext, ReactNode } from 'react';
import {
  HiOutlineLightBulb,
  HiCheck,
  HiX,
  HiOutlinePhotograph,
  HiOutlineCog,
  HiOutlineUser,
} from 'react-icons/hi';
import { CodeSnippet } from '../components';

// -------------------------------------------
// Card Component - Flexible Compound Pattern
// -------------------------------------------

interface CardContextType {
  variant: 'default' | 'elevated' | 'bordered';
}

const CardContext = createContext<CardContextType>({ variant: 'default' });

function useCardContext() {
  return useContext(CardContext);
}

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  className?: string;
}

function Card({ children, variant = 'default', className = '' }: CardProps) {
  const baseStyles = 'rounded-xl overflow-hidden';
  const variantStyles = {
    default: 'bg-base-200',
    elevated: 'bg-base-200 shadow-xl',
    bordered: 'bg-base-200 border-2 border-base-300',
  };

  return (
    <CardContext.Provider value={{ variant }}>
      <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>{children}</div>
    </CardContext.Provider>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

function CardHeader({ children, className = '' }: CardHeaderProps) {
  const { variant } = useCardContext();
  return (
    <div
      className={`p-4 ${variant === 'bordered' ? 'border-b-2 border-base-300' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

function CardImage({ src, alt, className = '' }: CardImageProps) {
  return <img src={src} alt={alt} className={`w-full h-48 object-cover ${className}`} />;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

function CardFooter({ children, className = '' }: CardFooterProps) {
  return <div className={`p-4 pt-0 flex gap-2 ${className}`}>{children}</div>;
}

// Attach sub-components
Card.Header = CardHeader;
Card.Image = CardImage;
Card.Body = CardBody;
Card.Footer = CardFooter;

// -------------------------------------------
// Code Examples
// -------------------------------------------

const flexibleCode = `// Same components, completely different layouts!

// Layout 1: Image at top
<Card>
  <Card.Image src="..." alt="..." />
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>

// Layout 2: Header + Body only
<Card variant="bordered">
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>

// Layout 3: Custom order with extra elements
<Card variant="elevated">
  <Card.Header>
    <CustomTitle />
    <Badge>New</Badge>
  </Card.Header>
  <Card.Image src="..." alt="..." />
  <Card.Body>
    <CustomContent />
  </Card.Body>
  <Card.Footer>
    <PrimaryButton />
    <SecondaryButton />
  </Card.Footer>
</Card>`;

const propsVsCompoundCode = `// ❌ Props-based: Rigid, limited flexibility
<Card
  title="My Card"
  subtitle="Description"
  image="/photo.jpg"
  actions={[
    { label: 'Save', onClick: handleSave },
    { label: 'Cancel', onClick: handleCancel }
  ]}
  footer="Footer text"
  showImage={true}
  imagePosition="top"
/>

// ✅ Compound: Full control, any structure
<Card>
  <Card.Image src="/photo.jpg" />
  <Card.Body>
    <h3>My Card</h3>
    <p>Description</p>
    {/* Add anything you want! */}
    <MyCustomComponent />
  </Card.Body>
  <Card.Footer>
    <button onClick={handleSave}>Save</button>
    <button onClick={handleCancel}>Cancel</button>
  </Card.Footer>
</Card>`;

export default function FlexibleAPIDemo(): React.ReactElement {
  const [activeLayout, setActiveLayout] = useState<1 | 2 | 3>(1);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="space-y-6">
      {/* Key Point */}
      <div className="card bg-base-200 p-4">
        <div className="flex items-start gap-3">
          <HiOutlineLightBulb className="text-warning mt-1 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-warning mb-1">Inversion of Control</p>
            <p className="text-base-content/70 text-sm">
              With compound components, you <strong className="text-primary">give control</strong>{' '}
              to the user. They decide the structure, order, and what to include — while you provide
              the building blocks.
            </p>
          </div>
        </div>
      </div>

      {/* Layout Selector */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveLayout(1)}
          className={`btn btn-sm ${activeLayout === 1 ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlinePhotograph size={16} />
          Image Card
        </button>
        <button
          onClick={() => setActiveLayout(2)}
          className={`btn btn-sm ${activeLayout === 2 ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineUser size={16} />
          Profile Card
        </button>
        <button
          onClick={() => setActiveLayout(3)}
          className={`btn btn-sm ${activeLayout === 3 ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineCog size={16} />
          Settings Card
        </button>
      </div>

      {/* Live Demo */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Card Preview */}
        <div className="flex items-center justify-center p-4 bg-base-300 rounded-lg min-h-[300px]">
          {activeLayout === 1 && (
            <Card variant="elevated" className="max-w-xs">
              <Card.Image
                src="https://picsum.photos/seed/card1/400/300"
                alt="Beautiful landscape"
              />
              <Card.Body>
                <h3 className="font-bold text-lg">Mountain Vista</h3>
                <p className="text-base-content/70 text-sm mt-1">
                  A stunning view of the mountains at sunrise.
                </p>
              </Card.Body>
              <Card.Footer>
                <button className="btn btn-primary btn-sm">View</button>
                <button className="btn btn-ghost btn-sm">Share</button>
              </Card.Footer>
            </Card>
          )}

          {activeLayout === 2 && (
            <Card variant="bordered" className="max-w-xs w-full">
              <Card.Header className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-bold">Jane Doe</h3>
                  <p className="text-sm text-base-content/60">Senior Developer</p>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="flex gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">128</p>
                    <p className="text-xs text-base-content/50">Projects</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">2.4k</p>
                    <p className="text-xs text-base-content/50">Followers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">89</p>
                    <p className="text-xs text-base-content/50">Following</p>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <button className="btn btn-primary btn-sm flex-1">Follow</button>
                <button className="btn btn-outline btn-sm flex-1">Message</button>
              </Card.Footer>
            </Card>
          )}

          {activeLayout === 3 && (
            <Card className="max-w-xs w-full">
              <Card.Header>
                <h3 className="font-bold flex items-center gap-2">
                  <HiOutlineCog className="text-primary" />
                  Notification Settings
                </h3>
              </Card.Header>
              <Card.Body className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm">Email notifications</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Push notifications</span>
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Weekly digest</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                </label>
              </Card.Body>
              <Card.Footer>
                <button className="btn btn-primary btn-sm flex-1">Save Changes</button>
              </Card.Footer>
            </Card>
          )}
        </div>

        {/* Code for current layout */}
        <CodeSnippet
          title={`Layout ${activeLayout} Code`}
          language="tsx"
          code={
            activeLayout === 1
              ? `<Card variant="elevated">
  <Card.Image
    src="https://picsum.photos/..."
    alt="Beautiful landscape"
  />
  <Card.Body>
    <h3>Mountain Vista</h3>
    <p>A stunning view...</p>
  </Card.Body>
  <Card.Footer>
    <button>View</button>
    <button>Share</button>
  </Card.Footer>
</Card>`
              : activeLayout === 2
                ? `<Card variant="bordered">
  <Card.Header className="flex items-center gap-4">
    <Avatar>JD</Avatar>
    <div>
      <h3>Jane Doe</h3>
      <p>Senior Developer</p>
    </div>
  </Card.Header>
  <Card.Body>
    <Stats projects={128} followers="2.4k" />
  </Card.Body>
  <Card.Footer>
    <button>Follow</button>
    <button>Message</button>
  </Card.Footer>
</Card>`
                : `<Card>
  <Card.Header>
    <h3><CogIcon /> Notification Settings</h3>
  </Card.Header>
  <Card.Body>
    <Toggle label="Email" defaultChecked />
    <Toggle label="Push" />
    <Toggle label="Weekly digest" defaultChecked />
  </Card.Body>
  <Card.Footer>
    <button>Save Changes</button>
  </Card.Footer>
</Card>`
          }
        />
      </div>

      {/* Comparison Toggle */}
      <button
        onClick={() => setShowComparison(!showComparison)}
        className="btn btn-sm btn-ghost gap-2"
      >
        {showComparison ? <HiX size={16} /> : <HiCheck size={16} />}
        {showComparison ? 'Hide' : 'Show'} Props vs Compound Comparison
      </button>

      {showComparison && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card bg-error/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <HiX className="text-error" />
                <h4 className="font-semibold text-error">Props-Based API</h4>
              </div>
              <ul className="text-sm space-y-1 text-base-content/70">
                <li>• Fixed structure, limited layouts</li>
                <li>• Complex props for customization</li>
                <li>• Hard to extend without modifying source</li>
                <li>• Conditional rendering via boolean props</li>
              </ul>
            </div>
            <div className="card bg-success/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <HiCheck className="text-success" />
                <h4 className="font-semibold text-success">Compound Components</h4>
              </div>
              <ul className="text-sm space-y-1 text-base-content/70">
                <li>• Any structure, any order</li>
                <li>• Simple, focused sub-components</li>
                <li>• Easy to extend with new components</li>
                <li>• Conditional rendering via JSX</li>
              </ul>
            </div>
          </div>
          <CodeSnippet title="Code Comparison" language="tsx" code={propsVsCompoundCode} />
        </div>
      )}

      {/* Full code example */}
      <CodeSnippet
        title="Same Card Component, Infinite Possibilities"
        language="tsx"
        code={flexibleCode}
      />
    </div>
  );
}
