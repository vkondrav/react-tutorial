// @ts-nocheck
// Multiple HOCs can be composed
const EnhancedComponent = withAuth(withTheme(withLogging(MyComponent)));

// Cleaner with compose utility (like Redux's compose)
const enhance = compose(withAuth, withTheme, withLogging);
const EnhancedComponent = enhance(MyComponent);

// Or use a library like recompose/lodash
import { flowRight } from 'lodash';
const enhance = flowRight(withAuth, withTheme, withLogging);
