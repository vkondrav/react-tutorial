// ============================================
// Playground: useRef Practical Examples
// ============================================

import { useState, useRef, useEffect } from 'react';
import {
  HiOutlineSearch,
  HiOutlineX,
  HiPlay,
  HiPause,
  HiOutlineVolumeUp,
  HiOutlineVolumeOff,
} from 'react-icons/hi';

export default function RefPlayground() {
  const [activeDemo, setActiveDemo] = useState('autofocus');

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4">Interactive Examples</h3>

      {/* Tab buttons */}
      <div className="flex gap-2 flex-wrap mb-4">
        {[
          { id: 'autofocus', label: 'Auto-Focus' },
          { id: 'clickoutside', label: 'Click Outside' },
          { id: 'video', label: 'Video Player' },
          { id: 'rendercount', label: 'Render Counter' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveDemo(tab.id)}
            className={`btn btn-sm ${activeDemo === tab.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Demo content */}
      <div className="min-h-[250px]">
        {activeDemo === 'autofocus' && <AutoFocusDemo />}
        {activeDemo === 'clickoutside' && <ClickOutsideDemo />}
        {activeDemo === 'video' && <VideoPlayerDemo />}
        {activeDemo === 'rendercount' && <RenderCountDemo />}
      </div>
    </div>
  );
}

// Auto-focus search on keyboard shortcut
function AutoFocusDemo() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [lastShortcut, setLastShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        setLastShortcut('⌘K');
      }
      // Escape to blur
      if (e.key === 'Escape') {
        searchRef.current?.blur();
        setLastShortcut('Esc');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Press <kbd className="kbd kbd-sm">⌘K</kbd> or <kbd className="kbd kbd-sm">Ctrl+K</kbd> to
        focus the search, <kbd className="kbd kbd-sm">Esc</kbd> to blur.
      </p>

      <div className="relative">
        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="input input-bordered w-full pl-10"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              searchRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
          >
            <HiOutlineX size={14} />
          </button>
        )}
      </div>

      {lastShortcut && (
        <div className="text-sm text-base-content/60">
          Last shortcut: <kbd className="kbd kbd-sm">{lastShortcut}</kbd>
        </div>
      )}

      <div className="p-3 rounded-lg bg-base-300">
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            <span className="text-secondary">const</span> searchRef ={' '}
            <span className="text-primary">useRef</span>(null);{'\n\n'}
            <span className="text-primary">useEffect</span>(() ={'>'} {'{'}
            {'\n'}
            {'  '}
            <span className="text-secondary">const</span> handleKeyDown = (e) ={'>'} {'{'}
            {'\n'}
            {'    '}
            <span className="text-secondary">if</span> (e.metaKey && e.key === 'k') {'{'}
            {'\n'}
            {'      '}searchRef.current?.<span className="text-primary">focus</span>();{'\n'}
            {'    }'}{'\n'}
            {'  };'}
            {'\n'}
            {'  '}document.<span className="text-primary">addEventListener</span>('keydown',
            handleKeyDown);{'\n'}
            {'}, []);'}
          </code>
        </pre>
      </div>
    </div>
  );
}

// Click outside to close
function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Click outside the dropdown to close it. The ref tracks the dropdown element.
      </p>

      <div className="relative inline-block" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary">
          {isOpen ? 'Close' : 'Open'} Dropdown
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-base-300 shadow-lg border border-base-content/20 z-10">
            <div className="p-2">
              {['Profile', 'Settings', 'Notifications', 'Logout'].map((item) => (
                <button
                  key={item}
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left px-3 py-2 rounded hover:bg-base-content/10 text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-base-content/60">
        Dropdown is {isOpen ? 'OPEN' : 'CLOSED'}
      </div>

      <div className="p-3 rounded-lg bg-base-300">
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            <span className="text-secondary">const</span> handleClickOutside = (e) ={'>'} {'{'}
            {'\n'}
            {'  '}
            <span className="text-secondary">if</span> (!dropdownRef.current.
            <span className="text-primary">contains</span>(e.target)) {'{'}
            {'\n'}
            {'    '}setIsOpen(false);{'\n'}
            {'  }'}{'\n'}
            {'};'}
          </code>
        </pre>
      </div>
    </div>
  );
}

// Video player with ref controls
function VideoPlayerDemo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const seekTo = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Control video playback imperatively with ref methods like play(), pause(), and properties.
      </p>

      {/* Video placeholder (using a colored box since we don't have a real video) */}
      <div className="relative rounded-lg overflow-hidden bg-linear-to-br from-primary/20 to-secondary/20 aspect-video flex items-center justify-center">
        <div className="text-4xl">🎬</div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-xs">
          Video Player Demo (simulated)
        </div>

        {/* Hidden video for demo purposes */}
        <video ref={videoRef} onTimeUpdate={handleTimeUpdate} className="hidden" muted={isMuted}>
          <source src="" type="video/mp4" />
        </video>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button onClick={togglePlay} className="btn btn-primary btn-sm gap-1">
          {isPlaying ? <HiPause size={16} /> : <HiPlay size={16} />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={toggleMute} className="btn btn-ghost btn-sm gap-1">
          {isMuted ? <HiOutlineVolumeOff size={16} /> : <HiOutlineVolumeUp size={16} />}
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button onClick={() => seekTo(0)} className="btn btn-ghost btn-sm">
          Restart
        </button>

        <div className="text-xs text-base-content/60 ml-auto">
          Time: {currentTime.toFixed(1)}s
        </div>
      </div>

      <div className="p-3 rounded-lg bg-base-300">
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            videoRef.current.<span className="text-primary">play</span>();{'\n'}
            videoRef.current.<span className="text-primary">pause</span>();{'\n'}
            videoRef.current.currentTime = 0;{' '}
            <span className="text-base-content/60">// Seek to start</span>
            {'\n'}
            videoRef.current.muted = true;
          </code>
        </pre>
      </div>
    </div>
  );
}

// Render count tracker
function RenderCountDemo() {
  const [value, setValue] = useState('');
  const [changeCount, setChangeCount] = useState(0);

  // Track changes in the event handler (not in effect)
  const handleChange = (e) => {
    setChangeCount((c) => c + 1);
    setValue(e.target.value);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        See how state changes trigger re-renders. Each keystroke calls setState twice, but React
        batches them into one render.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-primary/10 border border-primary/30 p-4 text-center">
          <div className="text-xs text-primary font-semibold mb-1">State Changes</div>
          <div className="text-3xl font-bold font-mono text-primary">{changeCount}</div>
        </div>
        <div className="card bg-secondary/10 border border-secondary/30 p-4 text-center">
          <div className="text-xs text-secondary font-semibold mb-1">Input Length</div>
          <div className="text-3xl font-bold font-mono text-secondary">{value.length}</div>
        </div>
      </div>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type to see state changes..."
        className="input input-bordered w-full"
      />

      <div className="text-xs text-base-content/60">
        Each keystroke causes a re-render. In real apps, you might use a ref to track counts without
        triggering additional renders.
      </div>

      <div className="p-3 rounded-lg bg-base-300">
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            <span className="text-base-content/60">// Using ref to track without re-renders:</span>
            {'\n'}
            <span className="text-secondary">const</span> countRef ={' '}
            <span className="text-primary">useRef</span>(0);{'\n\n'}
            <span className="text-base-content/60">// In an event handler (not during render):</span>
            {'\n'}
            countRef.current++;{' '}
            <span className="text-success">// Updates silently</span>
            {'\n'}
            console.log(countRef.current);{' '}
            <span className="text-success">// Access anytime</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

