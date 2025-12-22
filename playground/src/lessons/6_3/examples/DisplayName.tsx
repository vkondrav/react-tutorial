// @ts-nocheck
function withAuth<P>(WrappedComponent: ComponentType<P>) {
  function WithAuth(props: P) {
    // ... HOC logic
    return <WrappedComponent {...props} />;
  }

  // ✅ Set displayName for React DevTools
  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithAuth;
}

// In DevTools:
// Without displayName: <Unknown>
// With displayName:    <WithAuth(Dashboard)>
