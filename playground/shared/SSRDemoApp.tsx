// ============================================
// SSR Demo App - Isomorphic Component
// ============================================
// This component runs on BOTH server and client!
// It demonstrates what SSR looks like in practice.
// ============================================

import React, { useState, useEffect } from 'react';

// Types matching the server's PageData
interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface PageData {
  title: string;
  user: User;
  posts: Post[];
  serverTime: string;
}

interface SSRDemoAppProps {
  initialData: PageData;
}

/**
 * The main SSR Demo component.
 *
 * This component is "isomorphic" - it runs identically on:
 * - Server: renderToString() generates HTML
 * - Client: hydrateRoot() attaches event handlers
 */
export function SSRDemoApp({ initialData }: SSRDemoAppProps): React.ReactElement {
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // This effect only runs on the client after hydration
  useEffect(() => {
    setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    // Update the status indicator
    const indicator = document.getElementById('ssr-status');
    if (indicator) {
      indicator.textContent = '✅ Hydrated';
      indicator.classList.remove('server');
      indicator.classList.add('hydrated');
    }
  }, []);

  const handleLike = (postId: number) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
    setClickCount((c) => c + 1);
  };

  return (
    <div
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#60a5fa',
            marginBottom: '8px',
          }}
        >
          {initialData.title}
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          Server time: {initialData.serverTime}
        </p>
      </header>

      {/* User Card */}
      <div
        style={{
          background: '#2a323c',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            {initialData.user.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: '600', color: '#f3f4f6' }}>{initialData.user.name}</div>
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>{initialData.user.email}</div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#f3f4f6',
            marginBottom: '16px',
          }}
        >
          Posts ({initialData.posts.length})
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {initialData.posts.map((post) => (
            <article
              key={post.id}
              style={{
                background: '#2a323c',
                borderRadius: '12px',
                padding: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#f3f4f6',
                  marginBottom: '8px',
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  marginBottom: '12px',
                }}
              >
                {post.body}
              </p>
              <button
                onClick={() => handleLike(post.id)}
                style={{
                  background: likes[post.id] ? '#dc2626' : '#374151',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s',
                }}
              >
                ❤️ {likes[post.id] || 0} Likes
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Hydration Status */}
      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          background: isHydrated ? '#14532d' : '#1e3a5f',
          borderRadius: '12px',
          fontSize: '14px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#f3f4f6' }}>
          {isHydrated ? '✅ React is Hydrated!' : '⏳ Waiting for Hydration...'}
        </div>
        <div style={{ color: '#9ca3af' }}>
          {isHydrated ? (
            <>
              The page is now fully interactive.
              <br />
              You've clicked buttons <strong style={{ color: '#60a5fa' }}>{clickCount}</strong>{' '}
              times.
            </>
          ) : (
            <>
              This HTML was rendered on the server.
              <br />
              Buttons won't work until React hydrates.
            </>
          )}
        </div>
      </div>

      {/* View Source Hint */}
      <p
        style={{
          marginTop: '24px',
          fontSize: '13px',
          color: '#6b7280',
          textAlign: 'center',
        }}
      >
        💡 Right-click → "View Page Source" to see the server-rendered HTML!
      </p>
    </div>
  );
}

