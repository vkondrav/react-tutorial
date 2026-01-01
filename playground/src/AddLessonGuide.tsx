// ============================================
// Add Lesson Guide - How to extend this course
// ============================================
import { HiOutlineDocumentAdd, HiOutlineLightBulb, HiOutlineClipboardCopy } from 'react-icons/hi';
import { DiReact } from 'react-icons/di';
import { useState } from 'react';

interface AddLessonGuideProps {
  onBack: () => void;
}

const EXAMPLE_PROMPT = `I'd like to add a new lesson to the React tutorial about React Server Components.

Please read @README.md for the full guide on how lessons are structured.

The lesson should be:
- Lesson 9.1 in a new Module 9: "Modern React"
- Title: "Introduction to React Server Components"
- Cover: What RSC are, how they differ from client components, when to use them
- Include 2-3 interactive demos
- Follow the existing lesson patterns in the codebase

Please create all necessary files and register the lesson in config.json and App.tsx.`;

export default function AddLessonGuide({ onBack }: AddLessonGuideProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(EXAMPLE_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-100 to-base-200">
      {/* Header */}
      <header className="border-b border-base-300 bg-base-100/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={onBack} className="btn btn-ghost btn-sm gap-2">
            <DiReact
              className="text-primary text-xl"
              style={{ animation: 'spin 24s linear infinite' }}
            />
            <span className="font-semibold">React Tutorial</span>
          </button>
          <span className="text-base-content/40">/</span>
          <span className="text-base-content/70">Add a Lesson</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-6">
            <HiOutlineDocumentAdd className="text-primary" size={40} />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Add Your Own <span className="text-primary">Lessons</span>
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            This tutorial is designed to be extended! Use an AI assistant like Claude to add new
            lessons on topics you want to learn.
          </p>
        </div>

        {/* The Key File */}
        <section className="card bg-base-200 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <HiOutlineLightBulb className="text-warning" size={28} />
            The Key: README.md
          </h2>
          <p className="text-base-content/70 mb-4 leading-relaxed">
            The repository includes a{' '}
            <code className="px-2 py-1 bg-base-300 rounded text-primary font-mono text-sm">
              README.md
            </code>{' '}
            at the project root. This file contains everything an LLM needs to know to create new
            lessons:
          </p>
          <ul className="space-y-3 text-base-content/80">
            <li className="flex items-start gap-3">
              <span className="text-success mt-1">✓</span>
              <span>File structure and naming conventions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-success mt-1">✓</span>
              <span>How to create lesson components with TypeScript</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-success mt-1">✓</span>
              <span>Design guidelines (daisyUI, Tailwind, react-icons)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-success mt-1">✓</span>
              <span>How to register lessons in config.json and App.tsx</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-success mt-1">✓</span>
              <span>Best practices for interactive demos</span>
            </li>
          </ul>
        </section>

        {/* How To */}
        <section className="card bg-base-200 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">How to Add a Lesson</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Open this project in Cursor (or your AI-enabled IDE)
                </h3>
                <p className="text-base-content/70">
                  Make sure you have the full repository cloned locally.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Reference README.md in your prompt</h3>
                <p className="text-base-content/70">
                  In Cursor, you can use{' '}
                  <code className="px-1.5 py-0.5 bg-base-300 rounded text-sm">@README.md</code> to
                  include the file in your prompt context.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Describe the lesson you want</h3>
                <p className="text-base-content/70">
                  Be specific about the topic, what concepts to cover, and any interactive demos
                  you'd like.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary">
                4
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Let the AI create the files</h3>
                <p className="text-base-content/70">
                  The AI will create the lesson folder, components, update config.json, and register
                  it in App.tsx.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center shrink-0 font-bold text-success">
                5
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Run and iterate</h3>
                <p className="text-base-content/70">
                  Start the dev server with{' '}
                  <code className="px-1.5 py-0.5 bg-base-300 rounded text-sm">npm run dev</code> and
                  refine the lesson until you're happy with it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Prompt */}
        <section className="card bg-base-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Example Prompt</h2>
            <button
              onClick={copyPrompt}
              className={`btn btn-sm gap-2 ${copied ? 'btn-success' : 'btn-ghost'}`}
            >
              <HiOutlineClipboardCopy size={18} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-base-content/70 mb-4">
            Here's an example prompt you could use to add a new lesson:
          </p>
          <div className="bg-base-300 rounded-lg p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap text-base-content/90">
            {EXAMPLE_PROMPT}
          </div>
        </section>

        {/* Tips */}
        <section className="card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-8">
          <h2 className="text-2xl font-bold mb-4">💡 Tips for Great Lessons</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-base-100/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Be Specific</h3>
              <p className="text-sm text-base-content/70">
                Tell the AI exactly what concepts you want covered and what kind of demos would help
                you learn.
              </p>
            </div>
            <div className="bg-base-100/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Start Small</h3>
              <p className="text-sm text-base-content/70">
                Ask for one lesson at a time. You can always add more later.
              </p>
            </div>
            <div className="bg-base-100/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Request Tests</h3>
              <p className="text-sm text-base-content/70">
                Ask the AI to add Storybook stories and tests to ensure your lesson works correctly.
              </p>
            </div>
            <div className="bg-base-100/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Iterate</h3>
              <p className="text-sm text-base-content/70">
                Don't expect perfection on the first try. Refine the lesson with follow-up prompts.
              </p>
            </div>
          </div>
        </section>

        {/* Back button */}
        <div className="text-center mt-12">
          <button onClick={onBack} className="btn btn-primary btn-lg gap-2">
            Back to Tutorial
          </button>
        </div>
      </main>
    </div>
  );
}
