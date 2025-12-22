// ============================================
// CodeSnippet - Syntax highlighted code display
// ============================================

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { HiOutlineClipboard, HiCheck } from 'react-icons/hi';
import { useState } from 'react';

interface CodeSnippetProps {
  code: string;
  language?: 'tsx' | 'typescript' | 'javascript' | 'jsx' | 'json' | 'bash' | 'css' | 'html';
  title?: string;
  showLineNumbers?: boolean;
  showCopy?: boolean;
}

// Custom theme based on oneDark but matching our daisyUI dark theme
const customTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: 'oklch(0.2 0.02 260)', // matches bg-base-200
    margin: 0,
    padding: '1rem',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
    lineHeight: '1.5',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'transparent',
    fontSize: '0.75rem',
  },
};

export default function CodeSnippet({
  code,
  language = 'tsx',
  title,
  showLineNumbers = false,
  showCopy = true,
}: CodeSnippetProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  // Clean up raw file imports for display
  const cleanCode = code
    // Strip // @ts-nocheck
    .replace(/^\/\/ @ts-nocheck\n/, '');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {/* Title bar */}
      {title && (
        <div className="flex items-center justify-between bg-base-300 px-3 py-1.5 rounded-t-lg border-b border-base-100">
          <span className="text-xs text-base-content/60">{title}</span>
          <span className="text-xs text-base-content/40">{language}</span>
        </div>
      )}

      {/* Copy button */}
      {showCopy && (
        <button
          onClick={handleCopy}
          className={`absolute ${title ? 'top-10' : 'top-2'} right-2 btn btn-ghost btn-xs opacity-0 group-hover:opacity-100 transition-opacity ${
            copied ? 'text-success' : 'text-base-content/60'
          }`}
          title="Copy code"
        >
          {copied ? <HiCheck size={14} /> : <HiOutlineClipboard size={14} />}
        </button>
      )}

      {/* Code */}
      <div className={title ? '' : 'rounded-lg overflow-hidden'}>
        <SyntaxHighlighter
          language={language}
          style={customTheme}
          showLineNumbers={showLineNumbers}
          wrapLines
          customStyle={{
            borderRadius: title ? '0 0 0.5rem 0.5rem' : '0.5rem',
          }}
        >
          {cleanCode.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
