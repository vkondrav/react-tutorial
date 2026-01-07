// @ts-nocheck
function withAuth<P>(WrappedComponent: ComponentType<P>) {
  return function WithAuthComponent(props: P & { isAuthenticated?: boolean }) {
    const { isAuthenticated = false, ...restProps } = props;

    if (!isAuthenticated) {
      return <AccessDenied />;
    }

    return <WrappedComponent {...restProps} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);

<>
  <ProtectedDashboard isAuthenticated={false} /> // Shows Access Denied
  <ProtectedDashboard isAuthenticated={true} /> // Shows Dashboard
</>;
