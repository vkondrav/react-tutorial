/**
 * Local ESLint plugin for project-specific rules.
 */

import noRawCodeElement from './no-raw-code-element.js';

const plugin = {
  meta: {
    name: 'eslint-plugin-local',
    version: '1.0.0',
  },
  rules: {
    'no-raw-code-element': noRawCodeElement,
  },
};

export default plugin;
