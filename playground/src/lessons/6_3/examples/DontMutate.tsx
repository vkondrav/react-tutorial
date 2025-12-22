// @ts-nocheck
// ❌ Bad: Mutating the original component
function withAuth(WrappedComponent) {
  WrappedComponent.prototype.checkAuth = function () {
    // Modifying the original!
  };
  return WrappedComponent;
}

// ✅ Good: Use composition, return a NEW component
function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const isAuth = useAuth(); // HOC's own logic
    if (!isAuth) return <Login />;
    return <WrappedComponent {...props} />;
  };
}
