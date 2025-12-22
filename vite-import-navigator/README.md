# Vite Import Navigator

Navigate to files imported with Vite's special query suffixes like `?raw`, `?url`, `?worker`, etc.

## Problem

When using Vite's special import suffixes, VS Code/Cursor can't navigate to the file:

```typescript
// Cmd+Click doesn't work on this import!
import code from './example.tsx?raw';
```

## Solution

This extension intercepts "Go to Definition" requests and strips the Vite suffix, allowing you to navigate to the actual file.

## Supported Suffixes

- `?raw` - Import as string
- `?url` - Import as URL
- `?worker` - Import as Web Worker
- `?inline` - Inline worker
- `?worker&inline` - Inline worker combined

## Installation

### From Source (Development)

1. Clone/copy this folder
2. Run `npm install`
3. Run `npm run compile`
4. Press F5 to launch Extension Development Host
5. Test Cmd+Click on a `?raw` import

### Package for Distribution

```bash
npm install -g @vscode/vsce
vsce package
```

This creates a `.vsix` file you can install via:
- VS Code: Extensions > ... > Install from VSIX
- Cursor: Same process

## Usage

Just Cmd+Click (or Ctrl+Click on Windows/Linux) on any import with a Vite suffix:

```typescript
import rawCode from './MyComponent.tsx?raw';  // Now navigable!
import iconUrl from './icon.svg?url';          // Now navigable!
```

## License

MIT

