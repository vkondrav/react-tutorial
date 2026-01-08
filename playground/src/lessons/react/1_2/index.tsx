// ============================================
// Module 1, Lesson 2: Setting Up Your First React App
// ============================================

import {
  HiOutlineFolder,
  HiOutlineLink,
  HiOutlineLightningBolt,
  HiOutlineCube,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import ProjectStructureExplorer from './ProjectStructureExplorer';
import FileFlowDemo from './FileFlowDemo';
import HMRDemo from './HMRDemo';
import PackageJsonExplorer from './PackageJsonExplorer';

export default function Lesson1_2(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="1" lesson="2" title="Setting Up Your First React App" />

      {/* Section 1: Project Structure */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineFolder className="text-primary" size={20} />
            Project Structure
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-6">
          We used <strong className="text-primary">Vite</strong> to create this project. Vite is the
          modern, lightning-fast way to build React apps.
        </p>
        <ProjectStructureExplorer />
      </Section>

      {/* Section 2: How Files Connect */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLink className="text-primary" size={20} />
            How Files Connect
          </span>
        }
      >
        <p className="leading-relaxed text-base-content/70 mb-6">
          React apps have a clear flow from HTML → JavaScript → Components.
        </p>
        <FileFlowDemo />
      </Section>

      {/* Section 3: Hot Module Replacement */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            Hot Module Replacement (HMR)
          </span>
        }
      >
        <HMRDemo />
      </Section>

      {/* Section 4: package.json */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCube className="text-primary" size={20} />
            package.json Explained
          </span>
        }
      >
        <PackageJsonExplorer />
      </Section>

      {/* Section 5: Key Takeaways */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineClipboardCheck className="text-primary" size={20} />
            Key Takeaways
          </span>
        }
      >
        <TakeawayList
          items={[
            'Vite is the modern build tool for React (fast dev server, optimized builds)',
            'index.html is the entry point - React mounts to the #root div',
            'main.jsx bootstraps React and renders the App component',
            'App.jsx is your root component - all other components go here',
            'HMR updates your app instantly without losing state',
          ]}
        />
      </Section>
    </div>
  );
}
