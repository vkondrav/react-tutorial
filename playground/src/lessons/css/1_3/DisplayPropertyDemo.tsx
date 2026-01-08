import { useState } from 'react';
import { HiOutlineViewList, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import displayPropertyCode from './examples/DisplayProperty.css?raw';

type DisplayType = 'block' | 'inline' | 'inline-block';

interface BoxSettings {
  width: number;
  height: number;
  marginV: number;
  marginH: number;
  paddingV: number;
  paddingH: number;
}

export default function DisplayPropertyDemo(): React.ReactElement {
  const [displayType, setDisplayType] = useState<DisplayType>('block');
  const [settings, setSettings] = useState<BoxSettings>({
    width: 150,
    height: 60,
    marginV: 20,
    marginH: 10,
    paddingV: 10,
    paddingH: 15,
  });

  const displayTypes: Array<{
    id: DisplayType;
    label: string;
    color: string;
    description: string;
    widthWorks: boolean;
    heightWorks: boolean;
    marginVWorks: boolean;
    marginHWorks: boolean;
  }> = [
    {
      id: 'block',
      label: 'block',
      color: 'success',
      description: 'Takes full width available. Stacks vertically. All box properties work.',
      widthWorks: true,
      heightWorks: true,
      marginVWorks: true,
      marginHWorks: true,
    },
    {
      id: 'inline',
      label: 'inline',
      color: 'warning',
      description:
        'Flows with text. Width/height are ignored. Vertical margin/padding render but do not affect layout.',
      widthWorks: false,
      heightWorks: false,
      marginVWorks: false,
      marginHWorks: true,
    },
    {
      id: 'inline-block',
      label: 'inline-block',
      color: 'accent',
      description:
        'Best of both: flows inline like text, but respects all box properties like block.',
      widthWorks: true,
      heightWorks: true,
      marginVWorks: true,
      marginHWorks: true,
    },
  ];

  const currentType = displayTypes.find((t) => t.id === displayType)!;

  // Create style object based on what properties work
  const createBoxStyle = () => {
    const style: React.CSSProperties = {
      display: displayType,
    };

    if (currentType.widthWorks) {
      style.width = settings.width;
    }
    if (currentType.heightWorks) {
      style.height = settings.height;
    }
    if (currentType.marginVWorks) {
      style.marginTop = settings.marginV;
      style.marginBottom = settings.marginV;
    }
    if (currentType.marginHWorks) {
      style.marginLeft = settings.marginH;
      style.marginRight = settings.marginH;
    }
    // Padding always renders (but may not affect layout for inline)
    style.paddingTop = settings.paddingV;
    style.paddingBottom = settings.paddingV;
    style.paddingLeft = settings.paddingH;
    style.paddingRight = settings.paddingH;

    return style;
  };

  return (
    <div className="space-y-6">
      {/* Display Type Selection */}
      <div className="flex flex-wrap gap-2">
        {displayTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setDisplayType(type.id)}
            className={`btn ${displayType === type.id ? `btn-${type.color}` : 'btn-ghost'}`}
          >
            display: {type.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className={`alert alert-${currentType.color}`}>
        <HiOutlineQuestionMarkCircle className="shrink-0" size={20} />
        <span>{currentType.description}</span>
      </div>

      {/* Property Works Table */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Property Behavior</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            className={`p-3 rounded-lg text-center ${currentType.widthWorks ? 'bg-success/20 border border-success' : 'bg-error/20 border border-error'}`}
          >
            <div className="font-mono text-sm">width</div>
            <div className={`text-xs ${currentType.widthWorks ? 'text-success' : 'text-error'}`}>
              {currentType.widthWorks ? '✓ Works' : '✗ Ignored'}
            </div>
          </div>
          <div
            className={`p-3 rounded-lg text-center ${currentType.heightWorks ? 'bg-success/20 border border-success' : 'bg-error/20 border border-error'}`}
          >
            <div className="font-mono text-sm">height</div>
            <div className={`text-xs ${currentType.heightWorks ? 'text-success' : 'text-error'}`}>
              {currentType.heightWorks ? '✓ Works' : '✗ Ignored'}
            </div>
          </div>
          <div
            className={`p-3 rounded-lg text-center ${currentType.marginVWorks ? 'bg-success/20 border border-success' : 'bg-error/20 border border-error'}`}
          >
            <div className="font-mono text-sm">margin-top/bottom</div>
            <div className={`text-xs ${currentType.marginVWorks ? 'text-success' : 'text-error'}`}>
              {currentType.marginVWorks ? '✓ Works' : '✗ Ignored'}
            </div>
          </div>
          <div
            className={`p-3 rounded-lg text-center ${currentType.marginHWorks ? 'bg-success/20 border border-success' : 'bg-error/20 border border-error'}`}
          >
            <div className="font-mono text-sm">margin-left/right</div>
            <div className={`text-xs ${currentType.marginHWorks ? 'text-success' : 'text-error'}`}>
              {currentType.marginHWorks ? '✓ Works' : '✗ Ignored'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineViewList className="text-primary" size={20} />
          <h4 className="font-semibold">Adjust Properties</h4>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="label">
              <span className="label-text">
                Width: {settings.width}px
                {!currentType.widthWorks && (
                  <span className="text-error text-xs ml-2">(ignored)</span>
                )}
              </span>
            </label>
            <input
              type="range"
              min="80"
              max="200"
              value={settings.width}
              onChange={(e) => setSettings((s) => ({ ...s, width: parseInt(e.target.value) }))}
              className={`range range-sm ${currentType.widthWorks ? 'range-primary' : 'range-error opacity-50'}`}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">
                Height: {settings.height}px
                {!currentType.heightWorks && (
                  <span className="text-error text-xs ml-2">(ignored)</span>
                )}
              </span>
            </label>
            <input
              type="range"
              min="40"
              max="100"
              value={settings.height}
              onChange={(e) => setSettings((s) => ({ ...s, height: parseInt(e.target.value) }))}
              className={`range range-sm ${currentType.heightWorks ? 'range-secondary' : 'range-error opacity-50'}`}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">
                Vertical Margin: {settings.marginV}px
                {!currentType.marginVWorks && (
                  <span className="text-error text-xs ml-2">(ignored)</span>
                )}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="40"
              value={settings.marginV}
              onChange={(e) => setSettings((s) => ({ ...s, marginV: parseInt(e.target.value) }))}
              className={`range range-sm ${currentType.marginVWorks ? 'range-accent' : 'range-error opacity-50'}`}
            />
          </div>
        </div>
      </div>

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Live Preview</h4>

        <div className="bg-base-300 p-4 rounded-lg">
          <p className="text-base-content/70 mb-2">
            This is some surrounding text to show how the element flows.
          </p>

          {/* Demo boxes */}
          <div className="bg-base-100 rounded p-2 border border-base-content/20">
            <span className="text-base-content/70">Start of container. </span>

            {displayType === 'block' ? (
              <>
                <div
                  className={`bg-${currentType.color} text-${currentType.color}-content font-medium text-center rounded transition-all`}
                  style={createBoxStyle()}
                >
                  Box 1
                </div>
                <div
                  className={`bg-${currentType.color} text-${currentType.color}-content font-medium text-center rounded transition-all`}
                  style={createBoxStyle()}
                >
                  Box 2
                </div>
              </>
            ) : (
              <>
                <span
                  className={`bg-${currentType.color} text-${currentType.color}-content font-medium text-center rounded transition-all`}
                  style={createBoxStyle()}
                >
                  Box 1
                </span>
                <span
                  className={`bg-${currentType.color} text-${currentType.color}-content font-medium text-center rounded transition-all`}
                  style={createBoxStyle()}
                >
                  Box 2
                </span>
              </>
            )}

            <span className="text-base-content/70"> End of container.</span>
          </div>

          <p className="text-base-content/70 mt-2">
            More text after the elements to show flow impact.
          </p>
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Side-by-Side Comparison</h4>

        <div className="grid md:grid-cols-3 gap-4">
          {displayTypes.map((type) => (
            <div
              key={type.id}
              className={`p-4 rounded-lg border-2 ${displayType === type.id ? `border-${type.color}` : 'border-base-300'}`}
            >
              <h5 className={`font-semibold text-${type.color} mb-2`}>display: {type.label}</h5>
              <div className="bg-base-300 p-2 rounded text-sm">
                <span>Text </span>
                {type.id === 'block' ? (
                  <div
                    className={`bg-${type.color}/50 px-2 py-1 rounded text-xs inline`}
                    style={{ display: 'block' }}
                  >
                    element
                  </div>
                ) : (
                  <span
                    className={`bg-${type.color}/50 px-2 py-1 rounded text-xs`}
                    style={{ display: type.id }}
                  >
                    element
                  </span>
                )}
                <span> more text</span>
              </div>
              <ul className="mt-2 text-xs space-y-1 text-base-content/70">
                <li>• {type.id === 'block' ? 'New line before & after' : 'Flows with text'}</li>
                <li>• {type.widthWorks ? 'Width/height work' : 'Width/height ignored'}</li>
                <li>• {type.marginVWorks ? 'All margins work' : 'Only horizontal margins'}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="Display Property Values" language="css" code={displayPropertyCode} />

      {/* Common Use Cases */}
      <div className="alert bg-base-200">
        <HiOutlineQuestionMarkCircle className="shrink-0" size={20} />
        <div>
          <h4 className="font-bold">When to Use Each</h4>
          <ul className="text-sm mt-1 space-y-1">
            <li>
              <strong className="text-success">block:</strong> Divs, sections, headers, paragraphs —
              content that should stack
            </li>
            <li>
              <strong className="text-warning">inline:</strong> Spans, links, emphasis — content
              that flows with text
            </li>
            <li>
              <strong className="text-accent">inline-block:</strong> Buttons, badges, nav items —
              inline flow with box control
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
