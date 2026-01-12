/**
 * ESLint rule to discourage direct <code> element usage in favor of CodeSnippet component.
 *
 * To disable for valid cases in JSX, use:
 *   {/* eslint-disable-next-line local/no-raw-code-element *\/}
 *   <code>...</code>
 *
 * Or for a block:
 *   {/* eslint-disable local/no-raw-code-element *\/}
 *   <code>...</code>
 *   {/* eslint-enable local/no-raw-code-element *\/}
 */

const noRawCodeElement = {
  meta: {
    type: 'suggestion',
    docs: {
      description: `
        Discourage direct <code> element usage in favor of src/lessons/components/CodeSnippet.tsx component when displaying snippets of code.
        If this is intentional, add: {/* eslint-disable-next-line local/no-raw-code-element */}
        `,
      recommended: true,
    },
    messages: {
      avoidCodeElement: `
        Avoid using raw <code> elements. Use the CodeSnippet component from @components instead when displaying snippets of code. 
        If this is intentional, add: {/* eslint-disable-next-line local/no-raw-code-element */}
        `,
    },
    schema: [],
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const isCodeElement = node.name.type === 'JSXIdentifier' && node.name.name === 'code';
        if (isCodeElement) {
          context.report({
            node,
            messageId: 'avoidCodeElement',
          });
        }
      },
    };
  },
};

export default noRawCodeElement;
