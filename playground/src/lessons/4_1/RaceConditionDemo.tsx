// ============================================
// Demo: Race Conditions & Cleanup
// Shows why cleanup is important and how to use AbortController
// ============================================

import { useState, useEffect } from 'react';
import {
  HiOutlineExclamationCircle,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
} from 'react-icons/hi';
import { CodeSnippet } from '../components';
import raceConditionBugCode from './examples/RaceConditionBug.tsx?raw';
import abortControllerFixCode from './examples/AbortControllerFix.tsx?raw';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function RaceConditionDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem');

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Understanding Race Conditions
      </h3>

      {/* Tabs */}
      <div className="tabs tabs-boxed bg-base-300 p-1 mb-4">
        <button
          className={`tab flex-1 ${activeTab === 'problem' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('problem')}
        >
          <HiOutlineExclamationCircle className="mr-2" size={16} />
          The Problem
        </button>
        <button
          className={`tab flex-1 ${activeTab === 'solution' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('solution')}
        >
          <HiOutlineShieldCheck className="mr-2" size={16} />
          The Solution
        </button>
      </div>

      {activeTab === 'problem' ? <ProblemDemo /> : <SolutionDemo />}
    </div>
  );
}

// ============================================
// Problem: Race Condition Demo (No Cleanup)
// ============================================
function ProblemDemo(): React.ReactElement {
  const [postId, setPostId] = useState(1);
  const [fetchedPostId, setFetchedPostId] = useState(0);
  const [post, setPost] = useState<Post | null>(null);
  const [responseOrder, setResponseOrder] = useState<string[]>([]);

  // Derive loading from whether current postId has been fetched
  const loading = postId !== fetchedPostId;

  // Intentionally NO cleanup to demonstrate race condition
  useEffect(() => {
    const currentPostId = postId;

    // Simulate variable network latency
    const delay = Math.random() * 2000 + 500;

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        // This might set stale data!
        setPost(data);
        setFetchedPostId(currentPostId);
        setResponseOrder((prev) => [
          ...prev,
          `Post ${currentPostId} arrived (${(delay / 1000).toFixed(1)}s delay)`,
        ]);
      });
  }, [postId]);

  const rapidClick = () => {
    setResponseOrder([]);
    // Simulate rapid clicking
    setPostId(1);
    setTimeout(() => setPostId(2), 100);
    setTimeout(() => setPostId(3), 200);
  };

  return (
    <div>
      <div className="bg-error/10 border border-error/30 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-2">
          <HiOutlineExclamationCircle className="text-error shrink-0 mt-0.5" size={20} />
          <div>
            <div className="font-semibold text-error mb-1">Race Condition Bug</div>
            <p className="text-sm text-base-content/70">
              When requests complete out of order, stale data can overwrite fresh data. Click
              rapidly between posts to see this happen!
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            onClick={() => setPostId(id)}
            className={`btn btn-sm ${postId === id ? 'btn-error' : 'btn-outline'}`}
          >
            Post {id}
          </button>
        ))}
        <button onClick={rapidClick} className="btn btn-sm btn-warning">
          Rapid Click (1→2→3)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Post display */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">
            Currently Showing (selected: Post {postId})
          </div>
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="loading loading-spinner loading-sm" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : post ? (
            <div>
              <div className="font-semibold text-error mb-1">Post #{post.id}</div>
              <div className="text-sm text-base-content/70 line-clamp-3">{post.title}</div>
            </div>
          ) : null}
          {post && post.id !== postId && (
            <div className="mt-2 text-xs text-error font-semibold">
              ⚠️ Showing Post #{post.id} but selected #{postId}!
            </div>
          )}
        </div>

        {/* Response log */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">Response Order</div>
          <div className="bg-base-200 rounded p-2 h-24 overflow-auto font-mono text-xs">
            {responseOrder.length === 0 ? (
              <span className="text-base-content/40">Click rapidly to see race condition...</span>
            ) : (
              responseOrder.map((log, i) => <div key={i}>{log}</div>)
            )}
          </div>
        </div>
      </div>

      <CodeSnippet title="Buggy Code (No Cleanup)" language="tsx" code={raceConditionBugCode} />
    </div>
  );
}

// ============================================
// Solution: Using AbortController
// ============================================
function SolutionDemo(): React.ReactElement {
  const [postId, setPostId] = useState(1);
  const [fetchedPostId, setFetchedPostId] = useState(0);
  const [post, setPost] = useState<Post | null>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);

  // Derive loading from whether current postId has been fetched
  const loading = postId !== fetchedPostId;

  useEffect(() => {
    const controller = new AbortController();
    const currentPostId = postId;

    // Log fetch start (via microtask to avoid sync setState in effect)
    queueMicrotask(() => {
      setEventLog((prev) => [...prev, `→ Fetching post ${currentPostId}...`]);
    });

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setFetchedPostId(currentPostId);
        setEventLog((prev) => [...prev, `✓ Set post ${currentPostId}`]);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          setEventLog((prev) => [...prev, `✗ Aborted post ${currentPostId}`]);
        }
      });

    // Cleanup: abort if postId changes or component unmounts
    return () => {
      controller.abort();
    };
  }, [postId]);

  const rapidClick = () => {
    setEventLog([]);
    setPostId(1);
    setTimeout(() => setPostId(2), 100);
    setTimeout(() => setPostId(3), 200);
  };

  const clearLog = () => setEventLog([]);

  return (
    <div>
      <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-2">
          <HiOutlineShieldCheck className="text-success shrink-0 mt-0.5" size={20} />
          <div>
            <div className="font-semibold text-success mb-1">Fixed with AbortController</div>
            <p className="text-sm text-base-content/70">
              When a new request starts, the old one is aborted. Only the latest request's data is
              used. Watch the log to see aborted requests!
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            onClick={() => setPostId(id)}
            className={`btn btn-sm ${postId === id ? 'btn-success' : 'btn-outline'}`}
          >
            Post {id}
          </button>
        ))}
        <button onClick={rapidClick} className="btn btn-sm btn-primary">
          Rapid Click (1→2→3)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Post display */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">
            Currently Showing (selected: Post {postId})
          </div>
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="loading loading-spinner loading-sm" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : post ? (
            <div>
              <div className="font-semibold text-success mb-1">Post #{post.id}</div>
              <div className="text-sm text-base-content/70 line-clamp-3">{post.title}</div>
            </div>
          ) : null}
          {post && post.id === postId && (
            <div className="mt-2 text-xs text-success font-semibold">✓ Data matches selection!</div>
          )}
        </div>

        {/* Event log */}
        <div className="card bg-base-300 p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-base-content/60">Event Log</div>
            <button onClick={clearLog} className="btn btn-ghost btn-xs">
              Clear
            </button>
          </div>
          <div className="bg-base-200 rounded p-2 h-24 overflow-auto font-mono text-xs">
            {eventLog.length === 0 ? (
              <span className="text-base-content/40">Click to see events...</span>
            ) : (
              eventLog.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.startsWith('✓') ? 'text-success' : log.startsWith('✗') ? 'text-warning' : ''
                  }
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <CodeSnippet
        title="Fixed Code (With AbortController)"
        language="tsx"
        code={abortControllerFixCode}
      />
    </div>
  );
}
