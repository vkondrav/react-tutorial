// @ts-nocheck
// ❌ Bad: Only passing known props
function withBorder(WrappedComponent) {
  return function (props) {
    const { title } = props; // Only extracts title
    return (
      <div className="border">
        <WrappedComponent title={title} /> {/* Other props lost! */}
      </div>
    );
  };
}

// ✅ Good: Pass through ALL props
function withBorder(WrappedComponent) {
  return function (props) {
    return (
      <div className="border">
        <WrappedComponent {...props} /> {/* All props forwarded */}
      </div>
    );
  };
}
