// ============================================
// HOC Playground
// Interactive demos combining multiple HOCs
// ============================================

import { useState, useEffect, ComponentType } from 'react';
import { HiOutlineLightBulb, HiOutlineRefresh, HiOutlineClock } from 'react-icons/hi';

// ============================================
// HOC COLLECTION
// ============================================

// withLoading HOC
interface WithLoadingProps {
  isLoading?: boolean;
}

function withLoading<P extends object>(WrappedComponent: ComponentType<P>) {
  function WithLoading(props: P & WithLoadingProps) {
    const { isLoading = false, ...restProps } = props;
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="loading loading-spinner loading-lg text-primary" />
        </div>
      );
    }
    return <WrappedComponent {...(restProps as P)} />;
  }
  WithLoading.displayName = `WithLoading(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithLoading;
}

// withError HOC
interface WithErrorProps {
  error?: string | null;
}

function withError<P extends object>(WrappedComponent: ComponentType<P>) {
  function WithError(props: P & WithErrorProps) {
    const { error = null, ...restProps } = props;
    if (error) {
      return (
        <div className="bg-error/10 border border-error rounded-lg p-4 text-center">
          <p className="text-error font-semibold">⚠️ Error</p>
          <p className="text-sm text-base-content/70 mt-1">{error}</p>
        </div>
      );
    }
    return <WrappedComponent {...(restProps as P)} />;
  }
  WithError.displayName = `WithError(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithError;
}

// withTimestamp HOC - adds render timestamp
interface WithTimestampProps {
  showTimestamp?: boolean;
}

function withTimestamp<P extends object>(WrappedComponent: ComponentType<P>) {
  function WithTimestamp(props: P & WithTimestampProps) {
    const { showTimestamp = true, ...restProps } = props;
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      if (showTimestamp) {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
      }
    }, [showTimestamp]);

    return (
      <div>
        <WrappedComponent {...(restProps as P)} />
        {showTimestamp && (
          <div className="text-xs text-base-content/50 mt-2 flex items-center gap-1">
            <HiOutlineClock size={12} />
            Last rendered: {time.toLocaleTimeString()}
          </div>
        )}
      </div>
    );
  }
  WithTimestamp.displayName = `WithTimestamp(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithTimestamp;
}

// withBorder HOC
interface WithBorderProps {
  borderColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'error';
}

function withBorder<P extends object>(WrappedComponent: ComponentType<P>) {
  function WithBorder(props: P & WithBorderProps) {
    const { borderColor = 'primary', ...restProps } = props;
    const colors: Record<string, string> = {
      primary: 'border-primary',
      secondary: 'border-secondary',
      accent: 'border-accent',
      success: 'border-success',
      error: 'border-error',
    };
    return (
      <div className={`border-2 ${colors[borderColor]} rounded-lg p-4`}>
        <WrappedComponent {...(restProps as P)} />
      </div>
    );
  }
  WithBorder.displayName = `WithBorder(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithBorder;
}

// ============================================
// SAMPLE COMPONENTS
// ============================================

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
}

function ProductCard({ name, price, description }: ProductCardProps) {
  return (
    <div className="bg-base-200 rounded-lg p-4">
      <h4 className="font-bold text-lg">{name}</h4>
      <p className="text-2xl text-primary font-bold">${price}</p>
      <p className="text-sm text-base-content/70 mt-2">{description}</p>
    </div>
  );
}
ProductCard.displayName = 'ProductCard';

interface UserProfileProps {
  name: string;
  email: string;
  avatar?: string;
}

function UserProfile({ name, email, avatar }: UserProfileProps) {
  return (
    <div className="flex items-center gap-4 bg-base-200 rounded-lg p-4">
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-content text-2xl font-bold">
        {avatar ? <img src={avatar} alt={name} className="rounded-full" /> : name[0]}
      </div>
      <div>
        <h4 className="font-bold text-lg">{name}</h4>
        <p className="text-sm text-base-content/70">{email}</p>
      </div>
    </div>
  );
}
UserProfile.displayName = 'UserProfile';

// ============================================
// ENHANCED COMPONENTS
// ============================================

// Single HOC
const LoadableProductCard = withLoading(ProductCard);
const BorderedUserProfile = withBorder(UserProfile);

// Multiple HOCs composed
const EnhancedProductCard = withTimestamp(withBorder(withLoading(withError(ProductCard))));

// ============================================
// PLAYGROUND
// ============================================

export default function HOCPlayground() {
  // Demo 1: Single HOC state
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [profileBorderColor, setProfileBorderColor] = useState<
    'primary' | 'secondary' | 'accent' | 'success' | 'error'
  >('primary');

  // Demo 2: Composed HOCs state
  const [composedState, setComposedState] = useState<{
    isLoading: boolean;
    error: string | null;
    borderColor: 'primary' | 'secondary' | 'accent' | 'success' | 'error';
    showTimestamp: boolean;
  }>({
    isLoading: false,
    error: null,
    borderColor: 'primary',
    showTimestamp: true,
  });

  // Simulate loading
  const simulateLoad = () => {
    setIsProductLoading(true);
    setTimeout(() => setIsProductLoading(false), 1500);
  };

  // Simulate composed loading
  const simulateComposedLoad = () => {
    setComposedState((prev) => ({ ...prev, isLoading: true, error: null }));
    setTimeout(() => {
      setComposedState((prev) => ({ ...prev, isLoading: false }));
    }, 1500);
  };

  // Simulate error
  const simulateError = () => {
    setComposedState((prev) => ({ ...prev, error: 'Failed to load product data' }));
  };

  return (
    <div className="space-y-6">
      {/* Demo 1: Single HOC */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-4">Demo 1: Single HOC</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* withLoading */}
          <div>
            <p className="text-xs text-base-content/60 mb-2">
              <code>withLoading(ProductCard)</code>
            </p>
            <LoadableProductCard
              isLoading={isProductLoading}
              name="React Course"
              price={99}
              description="Learn React from scratch"
            />
            <button onClick={simulateLoad} className="btn btn-sm btn-primary mt-3">
              <HiOutlineRefresh className={isProductLoading ? 'animate-spin' : ''} />
              Simulate Loading
            </button>
          </div>

          {/* withBorder */}
          <div>
            <p className="text-xs text-base-content/60 mb-2">
              <code>withBorder(UserProfile)</code>
            </p>
            <BorderedUserProfile
              borderColor={profileBorderColor}
              name="Jane Doe"
              email="jane@example.com"
            />
            <div className="flex gap-2 mt-3">
              {(['primary', 'secondary', 'accent', 'success', 'error'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => setProfileBorderColor(color)}
                  className={`btn btn-xs ${profileBorderColor === color ? `btn-${color}` : 'btn-ghost'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Demo 2: Composed HOCs */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-2">Demo 2: Composed HOCs</h4>
        <p className="text-xs text-base-content/60 mb-4">
          <code>withTimestamp(withBorder(withLoading(withError(ProductCard))))</code>
        </p>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={simulateComposedLoad} className="btn btn-sm btn-primary">
            <HiOutlineRefresh className={composedState.isLoading ? 'animate-spin' : ''} />
            Load
          </button>
          <button
            onClick={simulateError}
            className="btn btn-sm btn-error"
            disabled={composedState.isLoading}
          >
            Trigger Error
          </button>
          <button
            onClick={() => setComposedState((prev) => ({ ...prev, error: null }))}
            className="btn btn-sm btn-ghost"
          >
            Clear Error
          </button>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={composedState.showTimestamp}
              onChange={(e) =>
                setComposedState((prev) => ({ ...prev, showTimestamp: e.target.checked }))
              }
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm">Timestamp</span>
          </label>
        </div>

        {/* Border color selector */}
        <div className="flex gap-2 mb-4">
          <span className="text-sm text-base-content/60">Border:</span>
          {(['primary', 'secondary', 'accent', 'success', 'error'] as const).map((color) => (
            <button
              key={color}
              onClick={() => setComposedState((prev) => ({ ...prev, borderColor: color }))}
              className={`btn btn-xs ${composedState.borderColor === color ? `btn-${color}` : 'btn-ghost'}`}
            >
              {color}
            </button>
          ))}
        </div>

        {/* Enhanced Component */}
        <EnhancedProductCard
          isLoading={composedState.isLoading}
          error={composedState.error}
          borderColor={composedState.borderColor}
          showTimestamp={composedState.showTimestamp}
          name="Pro React Bundle"
          price={249}
          description="Complete React, TypeScript, and Testing course"
        />
      </div>

      {/* HOC Stack Visualization */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">HOC Wrapper Stack (DevTools View)</h4>
        <div className="font-mono text-sm bg-base-200 rounded-lg p-4 space-y-1">
          <p className="text-primary">
            ▸ &lt;WithTimestamp(WithBorder(WithLoading(WithError(ProductCard))))&gt;
          </p>
          <p className="pl-4 text-secondary">
            ▸ &lt;WithBorder(WithLoading(WithError(ProductCard)))&gt;
          </p>
          <p className="pl-8 text-accent">▸ &lt;WithLoading(WithError(ProductCard))&gt;</p>
          <p className="pl-12 text-warning">▸ &lt;WithError(ProductCard)&gt;</p>
          <p className="pl-16 text-success">▸ &lt;ProductCard&gt;</p>
        </div>
        <p className="text-xs text-base-content/60 mt-2">
          Each HOC wraps the previous one. The innermost component receives the combined props.
        </p>
      </div>

      {/* Hooks vs HOCs Note */}
      <div className="card bg-base-300 p-4">
        <div className="flex gap-3">
          <HiOutlineLightBulb className="text-warning text-xl shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">When to Use HOCs vs Hooks</h4>
            <div className="text-sm text-base-content/70 space-y-2">
              <p>
                <strong className="text-primary">Use HOCs when:</strong> You need to wrap components
                with additional markup, work with class components, or need to conditionally render
                entirely different components.
              </p>
              <p>
                <strong className="text-secondary">Use Hooks when:</strong> You just need to share
                stateful logic without affecting the component tree structure. Hooks are simpler and
                more composable for most use cases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
