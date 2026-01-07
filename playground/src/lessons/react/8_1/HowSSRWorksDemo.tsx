// ============================================
// How SSR Works Demo
// ============================================
// Step-by-step visualization of the SSR process
// ============================================

import { useState } from 'react';
import {
  HiOutlineServer,
  HiOutlineCode,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
  HiOutlineRefresh,
  HiOutlineCursorClick,
} from 'react-icons/hi';
import { CodeSnippet } from '../../components';

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  code: string;
  highlight: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    icon: <HiOutlineGlobeAlt size={24} />,
    title: 'Request Arrives',
    description: 'User requests a page. The server receives the HTTP request.',
    code: `// Express server receives request
app.get('/dashboard', async (req, res) => {
  // Handle the request...
});`,
    highlight: 'The server intercepts the request before any HTML is sent',
  },
  {
    id: 2,
    icon: <HiOutlineServer size={24} />,
    title: 'Fetch Data on Server',
    description: 'Server fetches all required data (database, APIs, etc.)',
    code: `// Fetch data ON THE SERVER
const user = await db.getUser(req.userId);
const posts = await api.getPosts();

// Data is ready before rendering!`,
    highlight: 'No loading spinners needed - data is fetched before HTML is sent',
  },
  {
    id: 3,
    icon: <HiOutlineCode size={24} />,
    title: 'Render React to HTML',
    description: "React's renderToString() converts components to an HTML string",
    code: `import { renderToString } from 'react-dom/server';

// Convert React → HTML string
const html = renderToString(
  <App user={user} posts={posts} />
);

// html = "<div><h1>Welcome, Alex</h1>..."`,
    highlight: 'renderToString() is synchronous - it blocks until complete',
  },
  {
    id: 4,
    icon: <HiOutlineDocumentText size={24} />,
    title: 'Send HTML + Data',
    description: 'Server sends complete HTML with serialized data for hydration',
    code: `res.send(\`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="root">\${html}</div>
      <script>
        window.__DATA__ = \${JSON.stringify(data)}
      </script>
      <script src="/bundle.js"></script>
    </body>
  </html>
\`);`,
    highlight: 'The data is embedded so React can reuse it during hydration',
  },
  {
    id: 5,
    icon: <HiOutlineRefresh size={24} />,
    title: 'Hydration',
    description: 'Client-side React attaches to the existing HTML',
    code: `import { hydrateRoot } from 'react-dom/client';

// Don't create new DOM - attach to existing!
hydrateRoot(
  document.getElementById('root'),
  <App {...window.__DATA__} />
);`,
    highlight: 'hydrateRoot vs createRoot - hydration preserves existing DOM',
  },
  {
    id: 6,
    icon: <HiOutlineCursorClick size={24} />,
    title: 'Interactive!',
    description: 'Event handlers are attached. The app is now fully interactive.',
    code: `// Before hydration:
// <button>Click me</button>  ← Just HTML, no handlers

// After hydration:
// <button onClick={...}>Click me</button>  ← Interactive!`,
    highlight: 'Users can see content immediately, but buttons work after hydration',
  },
];

export default function HowSSRWorksDemo(): React.ReactElement {
  const [activeStep, setActiveStep] = useState(1);
  const currentStep = STEPS.find((s) => s.id === activeStep)!;

  return (
    <div className="card bg-base-200 p-6">
      {/* Step Navigation */}
      <div className="flex justify-between mb-6 relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-base-300 z-0" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-300 z-0"
          style={{ width: `${((activeStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`flex flex-col items-center z-10 transition-all ${
              step.id === activeStep
                ? 'text-primary'
                : step.id < activeStep
                  ? 'text-success'
                  : 'text-base-content/40'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                step.id === activeStep
                  ? 'bg-primary border-primary text-white'
                  : step.id < activeStep
                    ? 'bg-success border-success text-white'
                    : 'bg-base-200 border-base-300'
              }`}
            >
              {step.icon}
            </div>
            <span className="text-xs mt-2 hidden md:block max-w-[80px] text-center">
              {step.title}
            </span>
          </button>
        ))}
      </div>

      {/* Current Step Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Description */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-primary">
            Step {currentStep.id}: {currentStep.title}
          </h4>
          <p className="text-base-content/70 mb-4">{currentStep.description}</p>
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm text-primary">{currentStep.highlight}</p>
          </div>
        </div>

        {/* Code */}
        <div>
          <CodeSnippet title="Code" language="tsx" code={currentStep.code} />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
          disabled={activeStep === 1}
          className="btn btn-ghost btn-sm"
        >
          ← Previous
        </button>
        <div className="text-sm text-base-content/50">
          Step {activeStep} of {STEPS.length}
        </div>
        <button
          onClick={() => setActiveStep((s) => Math.min(STEPS.length, s + 1))}
          disabled={activeStep === STEPS.length}
          className="btn btn-ghost btn-sm"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
