// @ts-nocheck
// The HOC formula
const EnhancedComponent = higherOrderComponent(WrappedComponent);

// Or with configuration
const EnhancedComponent = withFeature(config)(WrappedComponent);

// Real examples
const ConnectedApp = connect(mapState)(App); // Redux
const ThemedButton = withTheme(Button); // Theming
const AuthenticatedPage = withAuth(Dashboard); // Auth
