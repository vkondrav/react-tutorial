// ============================================
// PackageJsonExplorer - package.json sections
// ============================================

import { useState } from 'react';
import { HiOutlinePlay, HiOutlineCube } from 'react-icons/hi';
import { IconType } from 'react-icons';
import { CodeSnippet } from '../../components';

// Import code examples
import scriptsCode from './examples/ScriptsCode.json?raw';
import depsCode from './examples/DepsCode.json?raw';

// ============================================
// Types
// ============================================

interface SectionInfo {
  icon: IconType;
  title: string;
  code: string;
  desc: string;
}

// ============================================
// Constants
// ============================================

const sections: Record<string, SectionInfo> = {
  scripts: {
    icon: HiOutlinePlay,
    title: 'Scripts',
    code: scriptsCode,
    desc: 'npm run dev starts the dev server',
  },
  deps: {
    icon: HiOutlineCube,
    title: 'Dependencies',
    code: depsCode,
    desc: 'Packages bundled into production',
  },
};

// ============================================
// Main Component
// ============================================

export default function PackageJsonExplorer(): React.ReactElement {
  const [active, setActive] = useState<string>('scripts');

  return (
    <div>
      {/* Section Tabs */}
      <div className="flex gap-2 mb-4">
        {Object.entries(sections).map(([key, s]) => {
          const IconComponent = s.icon;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`btn ${active === key ? 'btn-primary' : 'btn-outline'}`}
            >
              <IconComponent size={18} />
              {s.title}
            </button>
          );
        })}
      </div>

      {/* Code Display */}
      <div className="card bg-base-200 overflow-hidden">
        <CodeSnippet code={sections[active].code} language="json" showCopy={false} />
        <div className="p-4 border-t border-base-300 text-base-content text-sm">
          {sections[active].desc}
        </div>
      </div>
    </div>
  );
}
