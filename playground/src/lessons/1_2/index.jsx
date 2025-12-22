// Module 1, Lesson 2: Setting Up Your First React App

import { LessonHeader, Section, TakeawayList } from '../components';
import ProjectStructureExplorer from './ProjectStructureExplorer';
import FileFlowDemo from './FileFlowDemo';
import HMRDemo from './HMRDemo';
import PackageJsonExplorer from './PackageJsonExplorer';

export default function Lesson1_2() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <LessonHeader module="1" lesson="2" title="Setting Up Your First React App" />

      <Section title="📁 Project Structure">
        <p style={{ lineHeight: 1.8, color: '#94a3b8', marginBottom: '1.5rem' }}>
          We used <strong style={{ color: '#38bdf8' }}>Vite</strong> to create this project. Vite is
          the modern, lightning-fast way to build React apps.
        </p>
        <ProjectStructureExplorer />
      </Section>

      <Section title="🔗 How Files Connect">
        <p style={{ lineHeight: 1.8, color: '#94a3b8', marginBottom: '1.5rem' }}>
          React apps have a clear flow from HTML → JavaScript → Components.
        </p>
        <FileFlowDemo />
      </Section>

      <Section title="🔥 Hot Module Replacement (HMR)">
        <HMRDemo />
      </Section>

      <Section title="📦 package.json Explained">
        <PackageJsonExplorer />
      </Section>

      <Section title="✅ Key Takeaways">
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
