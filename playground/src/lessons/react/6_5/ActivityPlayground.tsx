// ============================================
// Activity Playground
// ============================================

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import {
  HiPlay,
  HiPause,
  HiRefresh,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlinePhotograph,
  HiCheck,
  HiX,
  HiOutlineLightningBolt,
} from 'react-icons/hi';

// -------------------------------------------
// Simulated Activity Component
// -------------------------------------------
// This simulates React 19's <Activity> behavior:
// - mode="visible": renders normally
// - mode="hidden": preserves state but hides content & pauses effects

interface ActivityContextType {
  mode: 'visible' | 'hidden';
}

const ActivityContext = createContext<ActivityContextType>({ mode: 'visible' });

// Hook to check if we're in a hidden Activity
function useActivityMode() {
  return useContext(ActivityContext);
}

// Simulated Activity component
interface ActivityProps {
  mode: 'visible' | 'hidden';
  children: ReactNode;
}

function Activity({ mode, children }: ActivityProps) {
  // Keep children mounted but hidden when mode is "hidden"
  // In real Activity, this would also pause effects and remove from DOM
  return (
    <ActivityContext.Provider value={{ mode }}>
      <div style={{ display: mode === 'visible' ? 'block' : 'none' }}>{children}</div>
    </ActivityContext.Provider>
  );
}

// -------------------------------------------
// Stateful Components for Testing
// -------------------------------------------

interface TimerProps {
  id: string;
}

function Timer({ id }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { mode } = useActivityMode();

  useEffect(() => {
    // In Activity mode="hidden", effects would be paused
    // We simulate this by checking the mode
    if (!isRunning || mode === 'hidden') return;

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  return (
    <div className="p-4 bg-base-300 rounded-lg">
      <p className="text-xs text-base-content/50 mb-2">{id}</p>
      <div className="text-3xl font-mono font-bold text-primary mb-3">
        {Math.floor(seconds / 60)
          .toString()
          .padStart(2, '0')}
        :{(seconds % 60).toString().padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`btn btn-sm ${isRunning ? 'btn-warning' : 'btn-success'}`}
        >
          {isRunning ? <HiPause size={16} /> : <HiPlay size={16} />}
        </button>
        <button
          onClick={() => {
            setSeconds(0);
            setIsRunning(false);
          }}
          className="btn btn-sm btn-ghost"
        >
          <HiRefresh size={16} />
        </button>
      </div>
      {mode === 'hidden' && isRunning && (
        <p className="text-xs text-warning mt-2">⏸ Timer paused (Activity hidden)</p>
      )}
    </div>
  );
}

interface FormDraftProps {
  id: string;
}

function FormDraft({ id }: FormDraftProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = useCallback(
    (tag: string) => {
      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
      }
    },
    [tags]
  );

  const removeTag = useCallback(
    (tag: string) => {
      setTags(tags.filter((t) => t !== tag));
    },
    [tags]
  );

  const hasContent = title || body || tags.length > 0;

  return (
    <div className="p-4 bg-base-300 rounded-lg space-y-3">
      <p className="text-xs text-base-content/50">{id}</p>
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title..."
        className="input input-bordered w-full input-sm"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your post..."
        className="textarea textarea-bordered w-full h-20"
      />
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span key={tag} className="badge badge-primary gap-1">
            {tag}
            <button onClick={() => removeTag(tag)} className="hover:text-error">
              <HiX size={12} />
            </button>
          </span>
        ))}
        <input
          placeholder="Add tag..."
          className="input input-bordered input-xs w-24"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTag((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = '';
            }
          }}
        />
      </div>
      {hasContent && (
        <p className="text-xs text-success flex items-center gap-1">
          <HiCheck size={12} />
          Draft has unsaved content
        </p>
      )}
    </div>
  );
}

interface ImageGalleryProps {
  id: string;
}

function ImageGallery({ id }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const images = [
    { id: 1, color: 'bg-primary', label: 'Image 1' },
    { id: 2, color: 'bg-secondary', label: 'Image 2' },
    { id: 3, color: 'bg-accent', label: 'Image 3' },
    { id: 4, color: 'bg-warning', label: 'Image 4' },
  ];

  return (
    <div className="p-4 bg-base-300 rounded-lg space-y-3">
      <p className="text-xs text-base-content/50">{id}</p>

      {/* Main image */}
      <div
        className={`w-full h-32 rounded-lg ${images[selectedIndex].color} flex items-center justify-center transition-transform`}
        style={{ transform: `scale(${zoom})` }}
      >
        <span className="text-white font-bold">{images[selectedIndex].label}</span>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setSelectedIndex(idx)}
            className={`w-12 h-12 rounded ${img.color} ${
              idx === selectedIndex
                ? 'ring-2 ring-white ring-offset-2 ring-offset-base-300'
                : 'opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Zoom control */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-base-content/70">Zoom:</span>
        <input
          type="range"
          min="0.5"
          max="1.5"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="range range-xs range-primary flex-1"
        />
        <span className="text-xs font-mono">{(zoom * 100).toFixed(0)}%</span>
      </div>

      <p className="text-xs text-base-content/50">
        Selected: {selectedIndex + 1}, Zoom: {(zoom * 100).toFixed(0)}%
      </p>
    </div>
  );
}

// -------------------------------------------
// Tab Panel Implementations
// -------------------------------------------

type TabId = 'timer' | 'form' | 'gallery';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'timer', label: 'Timer', icon: <HiOutlineClock size={16} /> },
  { id: 'form', label: 'Draft', icon: <HiOutlineDocumentText size={16} /> },
  { id: 'gallery', label: 'Gallery', icon: <HiOutlinePhotograph size={16} /> },
];

// Method 1: Conditional Rendering (state lost)
function ConditionalTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('timer');

  return (
    <div>
      <div className="flex gap-1 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm gap-1 ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'timer' && <Timer id="Timer (conditional)" />}
      {activeTab === 'form' && <FormDraft id="Form (conditional)" />}
      {activeTab === 'gallery' && <ImageGallery id="Gallery (conditional)" />}
    </div>
  );
}

// Method 2: CSS Hiding (state preserved, effects keep running)
function CSSHiddenTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('timer');

  return (
    <div>
      <div className="flex gap-1 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm gap-1 ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: activeTab === 'timer' ? 'block' : 'none' }}>
        <Timer id="Timer (CSS hidden)" />
      </div>
      <div style={{ display: activeTab === 'form' ? 'block' : 'none' }}>
        <FormDraft id="Form (CSS hidden)" />
      </div>
      <div style={{ display: activeTab === 'gallery' ? 'block' : 'none' }}>
        <ImageGallery id="Gallery (CSS hidden)" />
      </div>
    </div>
  );
}

// Method 3: Activity (simulated - state preserved, effects paused)
function ActivityTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('timer');

  return (
    <div>
      <div className="flex gap-1 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm gap-1 ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <Activity mode={activeTab === 'timer' ? 'visible' : 'hidden'}>
        <Timer id="Timer (Activity)" />
      </Activity>
      <Activity mode={activeTab === 'form' ? 'visible' : 'hidden'}>
        <FormDraft id="Form (Activity)" />
      </Activity>
      <Activity mode={activeTab === 'gallery' ? 'visible' : 'hidden'}>
        <ImageGallery id="Gallery (Activity)" />
      </Activity>
    </div>
  );
}

// -------------------------------------------
// Main Playground Component
// -------------------------------------------

type Approach = 'conditional' | 'css' | 'activity';

const approachInfo: Record<
  Approach,
  {
    color: string;
    icon: React.ReactNode;
    statePreserved: boolean;
    effectsPaused: boolean;
    description: string;
  }
> = {
  conditional: {
    color: 'btn-error',
    icon: <HiX className="text-error" />,
    statePreserved: false,
    effectsPaused: true,
    description: 'State is lost when switching tabs. Components unmount completely.',
  },
  css: {
    color: 'btn-warning',
    icon: <HiCheck className="text-warning" />,
    statePreserved: true,
    effectsPaused: false,
    description: 'State preserved, but effects keep running (timer continues in background!).',
  },
  activity: {
    color: 'btn-success',
    icon: <HiOutlineLightningBolt className="text-success" />,
    statePreserved: true,
    effectsPaused: true,
    description: 'State preserved AND effects paused. Best of both worlds! (React 19)',
  },
};

export default function ActivityPlayground(): React.ReactElement {
  const [approach, setApproach] = useState<Approach>('conditional');
  const [key, setKey] = useState(0);
  const info = approachInfo[approach];

  return (
    <div className="space-y-4">
      {/* Approach Selection */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Choose Approach</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setApproach('conditional');
              setKey((k) => k + 1);
            }}
            className={`btn btn-sm ${approach === 'conditional' ? 'btn-error' : 'btn-ghost'}`}
          >
            Conditional
          </button>
          <button
            onClick={() => {
              setApproach('css');
              setKey((k) => k + 1);
            }}
            className={`btn btn-sm ${approach === 'css' ? 'btn-warning' : 'btn-ghost'}`}
          >
            CSS Hiding
          </button>
          <button
            onClick={() => {
              setApproach('activity');
              setKey((k) => k + 1);
            }}
            className={`btn btn-sm ${approach === 'activity' ? 'btn-success' : 'btn-ghost'}`}
          >
            <HiOutlineLightningBolt size={14} />
            Activity (R19)
          </button>
        </div>

        {/* Status indicators */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            {info.statePreserved ? (
              <HiCheck className="text-success" />
            ) : (
              <HiX className="text-error" />
            )}
            <span>State {info.statePreserved ? 'preserved' : 'lost'}</span>
          </div>
          <div className="flex items-center gap-2">
            {info.effectsPaused ? (
              <HiCheck className="text-success" />
            ) : (
              <HiX className="text-error" />
            )}
            <span>Effects {info.effectsPaused ? 'paused' : 'keep running'}</span>
          </div>
        </div>

        <p className="mt-2 text-sm text-base-content/70">{info.description}</p>
      </div>

      {/* Tab Panel Demo */}
      <div className="card bg-base-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">
            {approach === 'conditional' && 'Conditional Rendering'}
            {approach === 'css' && 'CSS Hidden'}
            {approach === 'activity' && 'Activity (Simulated)'} Tabs
          </h4>
          <button onClick={() => setKey((k) => k + 1)} className="btn btn-xs btn-ghost gap-1">
            <HiRefresh size={14} />
            Reset All
          </button>
        </div>

        {/* Re-mount entire panel on approach change */}
        <div key={key}>
          {approach === 'conditional' && <ConditionalTabs />}
          {approach === 'css' && <CSSHiddenTabs />}
          {approach === 'activity' && <ActivityTabs />}
        </div>
      </div>

      {/* Instructions */}
      <div className="card bg-primary/10 p-4">
        <h4 className="font-semibold text-primary mb-2">Try This:</h4>
        <ol className="list-decimal list-inside text-sm space-y-1 text-base-content/70">
          <li>
            <strong>Start the timer</strong> and let it run for a few seconds
          </li>
          <li>
            Switch to the <strong>Draft</strong> tab and type some text
          </li>
          <li>
            Switch to the <strong>Gallery</strong> tab and select a different image
          </li>
          <li>Go back to each tab — what state was preserved?</li>
          <li>
            <strong>Key test:</strong> With CSS Hiding, start the timer and switch away. Notice the
            timer <em>keeps running</em> in the background! With Activity, it <em>pauses</em>.
          </li>
        </ol>
      </div>

      {/* Comparison table */}
      <div className="card bg-base-200 p-4 overflow-x-auto">
        <h4 className="font-semibold mb-3">Quick Comparison</h4>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Feature</th>
              <th className="text-center text-error">Conditional</th>
              <th className="text-center text-warning">CSS Hide</th>
              <th className="text-center text-success">Activity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>State preserved</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Effects paused</td>
              <td className="text-center">✅ (destroyed)</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Removed from DOM</td>
              <td className="text-center">✅</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
            <tr>
              <td>Memory efficient</td>
              <td className="text-center">✅</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Note about Activity */}
      <div className="card bg-warning/10 p-4">
        <h4 className="font-semibold text-warning mb-2">⚡ About This Simulation</h4>
        <p className="text-sm text-base-content/70">
          The Activity demo above <em>simulates</em> React 19's{' '}
          <code className="text-accent">&lt;Activity&gt;</code> behavior. Our Timer component checks
          the Activity mode and pauses itself when hidden. In the real React 19 API, this happens
          automatically for all effects — you don't need to modify your components!
        </p>
      </div>
    </div>
  );
}
