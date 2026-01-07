// @ts-nocheck
// ✅ Use "with" prefix - makes it clear it's an HOC
const EnhancedComponent = withAuth(MyComponent);
const ThemedButton = withTheme(Button);
const LoggedComponent = withLogging(Form);

// ❌ Don't use unclear names
const Component = enhance(MyComponent); // What does "enhance" do?
const Result = wrap(Button); // Wrap how?
