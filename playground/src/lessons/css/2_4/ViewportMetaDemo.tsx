import { useState } from 'react';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import viewportMetaCode from './examples/ViewportMeta.html?raw';

type ViewportSetting = 'none' | 'correct';

export default function ViewportMetaDemo(): React.ReactElement {
  const [setting, setSetting] = useState<ViewportSetting>('correct');

  return (
    <div className="space-y-6">
      {/* Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setSetting('none')}
          className={`btn btn-sm ${setting === 'none' ? 'btn-error' : 'btn-ghost'}`}
        >
          No Viewport Tag
        </button>
        <button
          onClick={() => setSetting('correct')}
          className={`btn btn-sm ${setting === 'correct' ? 'btn-success' : 'btn-ghost'}`}
        >
          With Viewport Tag
        </button>
      </div>

      {/* Visual Demo - Simulated Phone */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Simulated Mobile View (375px device)</h4>

        <div className="flex gap-8 items-start justify-center flex-wrap">
          {/* Phone Frame */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-80 bg-base-300 rounded-3xl p-2 border-4 border-base-content/20 relative">
              {/* Camera notch */}
              <div className="w-16 h-4 bg-base-content/20 rounded-full mx-auto mb-1" />

              {/* Screen */}
              <div className="w-full h-64 bg-white rounded-xl overflow-hidden relative">
                {setting === 'none' ? (
                  // Without viewport: shows zoomed out 980px layout
                  <div
                    className="absolute inset-0 origin-top-left text-black"
                    style={{ transform: 'scale(0.38)', width: '980px' }}
                  >
                    <div className="p-4">
                      <h1 className="text-2xl font-bold mb-2">My Website</h1>
                      <nav className="flex gap-4 mb-4 text-sm">
                        <span className="text-blue-600">Home</span>
                        <span className="text-blue-600">About</span>
                        <span className="text-blue-600">Products</span>
                        <span className="text-blue-600">Contact</span>
                      </nav>
                      <div className="flex gap-4">
                        <div className="w-48 h-32 bg-gray-200 rounded" />
                        <div className="flex-1">
                          <p className="text-sm mb-2">
                            Welcome to our website! This is the main content area with lots of text
                            that should be readable...
                          </p>
                          <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm">
                            Click Me
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // With viewport: properly sized for device
                  <div className="p-3 text-black text-xs">
                    <h1 className="text-base font-bold mb-2">My Website</h1>
                    <nav className="flex flex-col gap-1 mb-3 text-xs">
                      <span className="text-blue-600">☰ Menu</span>
                    </nav>
                    <div className="space-y-3">
                      <div className="w-full h-20 bg-gray-200 rounded" />
                      <p className="text-xs leading-relaxed">
                        Welcome to our website! This is readable now.
                      </p>
                      <button className="bg-blue-500 text-white px-3 py-2 rounded text-xs w-full">
                        Click Me
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-base-content/60 mt-2">
              {setting === 'none' ? 'Zoomed out (980px → 375px)' : 'Native width (375px)'}
            </p>
          </div>

          {/* Explanation */}
          <div className="flex-1 min-w-64 space-y-4">
            <div className={`alert ${setting === 'none' ? 'alert-error' : 'alert-success'}`}>
              {setting === 'none' ? (
                <HiOutlineX className="text-error" size={24} />
              ) : (
                <HiOutlineCheck className="text-success" size={24} />
              )}
              <div>
                <h4 className="font-bold">
                  {setting === 'none' ? 'Without Viewport Tag' : 'With Viewport Tag'}
                </h4>
                <p className="text-sm mt-1">
                  {setting === 'none'
                    ? 'Browser assumes 980px width and zooms out. Everything is tiny and unusable.'
                    : 'Browser uses actual device width. Content is properly sized for touch.'}
                </p>
              </div>
            </div>

            <CodeSnippet
              language="html"
              code={
                setting === 'none'
                  ? '<!-- No viewport tag -->'
                  : '<meta name="viewport"\n      content="width=device-width, initial-scale=1" />'
              }
              showCopy={false}
            />

            <div className="text-sm text-base-content/70 space-y-2">
              <p>
                <strong className="text-success">width=device-width</strong> — Use the device's
                actual width (e.g., 375px on iPhone)
              </p>
              <p>
                <strong className="text-success">initial-scale=1</strong> — Don't zoom in or out on
                page load
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="The Essential Viewport Tag" language="html" code={viewportMetaCode} />

      {/* Warning */}
      <div className="alert alert-warning">
        <div>
          <h4 className="font-bold">Important</h4>
          <p className="text-sm mt-1">
            {/* eslint-disable-next-line local/no-raw-code-element */}
            This tag goes in your HTML <code>&lt;head&gt;</code>, not in CSS. Every responsive
            website needs it. Frameworks like Vite and Next.js add it automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
