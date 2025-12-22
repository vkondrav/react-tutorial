// ============================================
// ProjectStructureExplorer - Interactive file structure
// ============================================

import { useState } from 'react';
import {
  HiOutlineGlobeAlt,
  HiOutlineLightningBolt,
  HiOutlineCube,
  HiOutlineCursorClick,
} from 'react-icons/hi';
import { FaReact } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { CodeSnippet } from '../components';

// Import code examples
import indexHtmlCode from './examples/IndexHtmlCode.html?raw';
import mainJsxCode from './examples/MainJsxCode.tsx?raw';
import appJsxCode from './examples/AppJsxCode.tsx?raw';
import packageJsonCode from './examples/PackageJsonBasicCode.json?raw';

// ============================================
// Types
// ============================================

type FileColor = 'warning' | 'secondary' | 'primary' | 'success';

interface FileInfo {
  name: string;
  icon: IconType;
  color: FileColor;
  purpose: string;
  description: string;
  code: string;
  language: 'html' | 'tsx' | 'json';
}

interface ColorClasses {
  bg: string;
  border: string;
  text: string;
}

// ============================================
// Constants
// ============================================

const files: FileInfo[] = [
  {
    name: 'index.html',
    icon: HiOutlineGlobeAlt,
    color: 'warning',
    purpose: 'Entry point',
    description: 'The single HTML file with <div id="root">.',
    code: indexHtmlCode,
    language: 'html',
  },
  {
    name: 'src/main.jsx',
    icon: HiOutlineLightningBolt,
    color: 'secondary',
    purpose: 'Bootstrap',
    description: 'Initializes React and mounts App.',
    code: mainJsxCode,
    language: 'tsx',
  },
  {
    name: 'src/App.jsx',
    icon: FaReact,
    color: 'primary',
    purpose: 'Root component',
    description: 'Your main React component.',
    code: appJsxCode,
    language: 'tsx',
  },
  {
    name: 'package.json',
    icon: HiOutlineCube,
    color: 'success',
    purpose: 'Dependencies',
    description: 'Project dependencies and scripts.',
    code: packageJsonCode,
    language: 'json',
  },
];

const colorClasses: Record<FileColor, ColorClasses> = {
  warning: {
    bg: 'bg-warning/20',
    border: 'border-warning',
    text: 'text-warning',
  },
  secondary: {
    bg: 'bg-secondary/20',
    border: 'border-secondary',
    text: 'text-secondary',
  },
  primary: {
    bg: 'bg-primary/20',
    border: 'border-primary',
    text: 'text-primary',
  },
  success: {
    bg: 'bg-success/20',
    border: 'border-success',
    text: 'text-success',
  },
};

// ============================================
// Main Component
// ============================================

export default function ProjectStructureExplorer(): React.ReactElement {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const selected = files.find((f) => f.name === selectedFile);

  return (
    <div className="flex flex-col gap-4">
      {/* File List */}
      <div className="card bg-base-200 p-4 font-mono">
        <div className="text-base-content/50 mb-3 text-sm flex items-center gap-2">
          <HiOutlineCube size={16} />
          playground/
        </div>
        <div className="flex flex-col gap-1 ml-4">
          {files.map((file) => {
            const colors = colorClasses[file.color];
            const isSelected = selectedFile === file.name;
            const IconComponent = file.icon;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFile(isSelected ? null : file.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-left text-sm w-full transition-colors ${
                  isSelected
                    ? `${colors.bg} ${colors.border} border ${colors.text}`
                    : 'bg-transparent border-transparent text-base-content/70 hover:bg-base-300'
                }`}
              >
                <IconComponent size={18} />
                <span className="flex-1">{file.name}</span>
                <span className="badge badge-sm bg-base-300 text-base-content/70">
                  {file.purpose}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* File Preview */}
      <div
        className={`card bg-base-200 p-5 min-h-[150px] transition-colors ${
          selected ? `${colorClasses[selected.color].border} border-2` : 'border-base-300 border'
        }`}
      >
        {selected ? (
          <div>
            <p className="text-base-content mt-0 mb-4">{selected.description}</p>
            <CodeSnippet code={selected.code} language={selected.language} showCopy={false} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-base-content/50 gap-2">
            <HiOutlineCursorClick size={20} />
            <span>Click a file to see its contents</span>
          </div>
        )}
      </div>
    </div>
  );
}
