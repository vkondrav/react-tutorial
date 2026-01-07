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
  HiOutlineRefresh,
} from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import keyboardShortcutExample from './examples/KeyboardShortcutExample.tsx?raw';
import clickOutsideExample from './examples/ClickOutsideExample.tsx?raw';
import videoControlExample from './examples/VideoControlExample.tsx?raw';
import renderCountExample from './examples/RenderCountExample.tsx?raw';

type DemoTab = 'autofocus' | 'clickoutside' | 'video' | 'rendercount';

export default function RefPlayground(): React.ReactElement {
  const [activeDemo, setActiveDemo] = useState<DemoTab>('autofocus');

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4">Interactive Examples</h3>

      {/* Tab buttons */}
      <div className="flex gap-2 flex-wrap mb-4">
        {[
          { id: 'autofocus' as const, label: 'Auto-Focus' },
          { id: 'clickoutside' as const, label: 'Click Outside' },
          { id: 'video' as const, label: 'Video Player' },
          { id: 'rendercount' as const, label: 'Render Counter' },
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
function AutoFocusDemo(): React.ReactElement {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [lastShortcut, setLastShortcut] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
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

      <CodeSnippet code={keyboardShortcutExample} language="tsx" />
    </div>
  );
}

// Click outside to close
function ClickOutsideDemo(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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

      <div className="text-xs text-base-content/60">Dropdown is {isOpen ? 'OPEN' : 'CLOSED'}</div>

      <CodeSnippet code={clickOutsideExample} language="tsx" />
    </div>
  );
}

// Video player with ref controls
function VideoPlayerDemo(): React.ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted to allow autoplay
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = (): void => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (): void => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = (): void => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = (): void => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleEnded = (): void => {
    setIsPlaying(false);
  };

  const seekTo = (time: number): void => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const time = Number(e.target.value);
    seekTo(time);
    setCurrentTime(time);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Control video playback imperatively with ref methods like play(), pause(), and properties.
      </p>

      {/* Actual video player */}
      <div className="relative rounded-lg overflow-hidden bg-black">
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          className="w-full aspect-video"
          muted={isMuted}
          playsInline
          poster="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Progress bar */}
      {duration > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-base-content/60 w-10">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="range range-primary range-xs flex-1"
          />
          <span className="text-xs font-mono text-base-content/60 w-10">
            {formatTime(duration)}
          </span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-start justify-start gap-3">
        <button onClick={togglePlay} className="btn btn-primary btn-circle w-10 h-10">
          {isPlaying ? <HiPause size={20} /> : <HiPlay size={20} />}
        </button>
        <button onClick={toggleMute} className="btn btn-ghost btn-circle w-10 h-10">
          {isMuted ? <HiOutlineVolumeOff size={20} /> : <HiOutlineVolumeUp size={20} />}
        </button>
        <button onClick={() => seekTo(0)} className="btn btn-ghost btn-circle w-10 h-10">
          <HiOutlineRefresh size={20} />
        </button>
      </div>

      <CodeSnippet code={videoControlExample} language="tsx" />
    </div>
  );
}

// Render count tracker
function RenderCountDemo(): React.ReactElement {
  const [value, setValue] = useState('');
  const [changeCount, setChangeCount] = useState(0);

  // Track changes in the event handler (not in effect)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

      <CodeSnippet code={renderCountExample} language="tsx" />
    </div>
  );
}
