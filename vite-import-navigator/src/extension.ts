import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// Vite import suffixes to handle
const VITE_SUFFIXES = ['raw', 'url', 'worker', 'inline', 'worker&inline'];

export function activate(context: vscode.ExtensionContext) {
  console.log('Vite Import Navigator is now active');

  const provider = vscode.languages.registerDefinitionProvider(
    [
      { scheme: 'file', language: 'typescript' },
      { scheme: 'file', language: 'typescriptreact' },
      { scheme: 'file', language: 'javascript' },
      { scheme: 'file', language: 'javascriptreact' },
    ],
    new ViteImportDefinitionProvider()
  );

  context.subscriptions.push(provider);
}

class ViteImportDefinitionProvider implements vscode.DefinitionProvider {
  provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Definition> {
    const line = document.lineAt(position).text;

    // Build regex pattern for Vite suffixes
    const suffixPattern = VITE_SUFFIXES.map((s) => s.replace('&', '\\&')).join('|');
    const importRegex = new RegExp(
      `(?:import|from)\\s+['"]([^'"]+)\\?(${suffixPattern})['"]`
    );

    const match = line.match(importRegex);
    if (!match) {
      return null;
    }

    const importPath = match[1];
    const currentDir = path.dirname(document.uri.fsPath);

    // Resolve the import path
    let targetPath = this.resolveImportPath(importPath, currentDir);

    if (!targetPath) {
      return null;
    }

    return new vscode.Location(vscode.Uri.file(targetPath), new vscode.Position(0, 0));
  }

  private resolveImportPath(importPath: string, currentDir: string): string | null {
    // Handle relative imports
    if (importPath.startsWith('.')) {
      const resolved = path.resolve(currentDir, importPath);

      // Try exact path first
      if (fs.existsSync(resolved)) {
        return resolved;
      }

      // Try common extensions
      const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss', '.svg', '.png', '.jpg'];
      for (const ext of extensions) {
        const withExt = resolved + ext;
        if (fs.existsSync(withExt)) {
          return withExt;
        }
      }

      // Try index files
      for (const ext of extensions) {
        const indexPath = path.join(resolved, `index${ext}`);
        if (fs.existsSync(indexPath)) {
          return indexPath;
        }
      }
    }

    // Could add support for path aliases here in the future
    // by reading tsconfig.json/jsconfig.json

    return null;
  }
}

export function deactivate() {}

