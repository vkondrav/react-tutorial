// ============================================
// Create Data Demo
// POST request patterns
// ============================================

import { useState } from 'react';
import {
  HiOutlinePlus,
  HiOutlineCheck,
  HiOutlineExclamationCircle,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import postRequestCode from './examples/PostRequest.tsx?raw';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function CreateDataDemo(): React.ReactElement {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost: Post = await response.json();

      // Add to local state (JSONPlaceholder returns id: 101 for new posts)
      setPosts((prev) => [newPost, ...prev]);
      setTitle('');
      setBody('');
      setSuccess(true);

      // Clear success message after 2 seconds
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Form */}
      <form onSubmit={handleSubmit} className="card bg-base-300 p-4 space-y-4">
        <h4 className="font-semibold">Create New Post</h4>

        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="input input-bordered w-full"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Body</span>
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post content..."
            className="textarea textarea-bordered w-full"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-error text-sm">
            <HiOutlineExclamationCircle size={16} />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-success text-sm">
            <HiOutlineCheck size={16} />
            Post created successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !title.trim() || !body.trim()}
          className="btn btn-primary gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Creating...
            </>
          ) : (
            <>
              <HiOutlinePlus size={18} />
              Create Post
            </>
          )}
        </button>
      </form>

      {/* Created posts list */}
      {posts.length > 0 && (
        <div className="card bg-base-200 p-4">
          <h4 className="font-semibold mb-3">Created Posts ({posts.length})</h4>
          <div className="space-y-2">
            {posts.map((post) => (
              <div key={post.id} className="p-3 bg-base-300 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-base-content/60 line-clamp-1">{post.body}</div>
                  </div>
                  <span className="badge badge-primary badge-sm">ID: {post.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-ghost btn-sm gap-2">
        {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showCode ? 'Hide' : 'Show'} Code
      </button>

      {showCode && (
        <CodeSnippet code={postRequestCode} language="tsx" title="POST Request Pattern" />
      )}

      {/* Key points */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-2">Key Points</h4>
        <ul className="text-sm space-y-1 text-base-content/70">
          <li>
            • Set <code className="text-secondary">Content-Type: application/json</code> header
          </li>
          <li>
            • Use <code className="text-secondary">JSON.stringify()</code> for the body
          </li>
          <li>
            • Check <code className="text-secondary">response.ok</code> for errors
          </li>
          <li>• Update local state with the returned item (includes new ID)</li>
          <li>• Disable form inputs while submitting</li>
        </ul>
      </div>
    </div>
  );
}
