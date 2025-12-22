// ============================================
// Update Data Demo
// PUT/PATCH request patterns
// ============================================

import { useState } from 'react';
import {
  HiOutlinePencil,
  HiOutlineCheck,
  HiOutlineX,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';

interface Post {
  id: number;
  title: string;
  body: string;
}

const SAMPLE_POST: Post = {
  id: 1,
  title: 'Original Title',
  body: 'This is the original post body content.',
};

export default function UpdateDataDemo(): React.ReactElement {
  const [post, setPost] = useState<Post>(SAMPLE_POST);
  const [editingField, setEditingField] = useState<'title' | 'body' | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [method, setMethod] = useState<'PUT' | 'PATCH'>('PATCH');
  const [showCode, setShowCode] = useState(false);
  const [lastResponse, setLastResponse] = useState<string | null>(null);

  const startEditing = (field: 'title' | 'body') => {
    setEditingField(field);
    setEditValue(post[field]);
  };

  const cancelEditing = () => {
    setEditingField(null);
    setEditValue('');
  };

  const saveEdit = async () => {
    if (!editingField || !editValue.trim()) return;

    setIsUpdating(true);

    try {
      const url = `https://jsonplaceholder.typicode.com/posts/${post.id}`;

      // PUT sends the full object, PATCH sends only changed fields
      const bodyData =
        method === 'PUT'
          ? { ...post, [editingField]: editValue.trim() }
          : { [editingField]: editValue.trim() };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }

      const updatedPost = await response.json();
      setLastResponse(JSON.stringify(updatedPost, null, 2));

      // Update local state
      setPost((prev) => ({ ...prev, [editingField]: editValue.trim() }));
      setEditingField(null);
      setEditValue('');
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const resetDemo = () => {
    setPost(SAMPLE_POST);
    setEditingField(null);
    setEditValue('');
    setLastResponse(null);
  };

  return (
    <div className="space-y-4">
      {/* Method selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">HTTP Method:</span>
        <div className="flex gap-2">
          <button
            onClick={() => setMethod('PATCH')}
            className={`btn btn-sm ${method === 'PATCH' ? 'btn-primary' : 'btn-ghost'}`}
          >
            PATCH
          </button>
          <button
            onClick={() => setMethod('PUT')}
            className={`btn btn-sm ${method === 'PUT' ? 'btn-primary' : 'btn-ghost'}`}
          >
            PUT
          </button>
        </div>
        <button onClick={resetDemo} className="btn btn-ghost btn-sm ml-auto">
          Reset
        </button>
      </div>

      {/* Editable post card */}
      <div className="card bg-base-300 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="badge badge-primary">Post #{post.id}</span>
          <span className="text-xs text-base-content/50">Click fields to edit</span>
        </div>

        {/* Title field */}
        <div>
          <label className="label">
            <span className="label-text text-xs">Title</span>
          </label>
          {editingField === 'title' ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="input input-bordered input-sm flex-1"
                autoFocus
                disabled={isUpdating}
              />
              <button
                onClick={saveEdit}
                disabled={isUpdating || !editValue.trim()}
                className="btn btn-primary btn-sm btn-square"
              >
                {isUpdating ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <HiOutlineCheck size={16} />
                )}
              </button>
              <button
                onClick={cancelEditing}
                disabled={isUpdating}
                className="btn btn-ghost btn-sm btn-square"
              >
                <HiOutlineX size={16} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => startEditing('title')}
              className="p-2 bg-base-200 rounded cursor-pointer hover:bg-base-100 transition-colors flex items-center justify-between group"
            >
              <span className="font-medium">{post.title}</span>
              <HiOutlinePencil
                size={14}
                className="opacity-0 group-hover:opacity-100 text-base-content/50"
              />
            </div>
          )}
        </div>

        {/* Body field */}
        <div>
          <label className="label">
            <span className="label-text text-xs">Body</span>
          </label>
          {editingField === 'body' ? (
            <div className="space-y-2">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="textarea textarea-bordered w-full"
                rows={3}
                autoFocus
                disabled={isUpdating}
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={cancelEditing}
                  disabled={isUpdating}
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  disabled={isUpdating || !editValue.trim()}
                  className="btn btn-primary btn-sm"
                >
                  {isUpdating ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => startEditing('body')}
              className="p-2 bg-base-200 rounded cursor-pointer hover:bg-base-100 transition-colors flex items-start justify-between group"
            >
              <span className="text-sm text-base-content/70">{post.body}</span>
              <HiOutlinePencil
                size={14}
                className="opacity-0 group-hover:opacity-100 text-base-content/50 mt-0.5"
              />
            </div>
          )}
        </div>
      </div>

      {/* Last response */}
      {lastResponse && (
        <div className="card bg-base-200 p-4">
          <h4 className="font-semibold mb-2 text-sm">Server Response ({method})</h4>
          <pre className="text-xs bg-base-300 p-2 rounded overflow-x-auto">
            {lastResponse}
          </pre>
        </div>
      )}

      {/* Code toggle */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="btn btn-ghost btn-sm gap-2"
      >
        {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showCode ? 'Hide' : 'Show'} Code
      </button>

      {showCode && (
        <div className="bg-base-300 rounded-lg p-4">
          <pre className="text-xs overflow-x-auto">
            <code>{`// ${method} request to update data
const handleUpdate = async (field, value) => {
  setIsUpdating(true);

  try {
    const response = await fetch(\`/api/posts/\${post.id}\`, {
      method: '${method}',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(${method === 'PUT' ? `{ ...post, [field]: value }  // Full object` : `{ [field]: value }           // Only changed field`}),
    });

    if (!response.ok) throw new Error('Update failed');

    const updated = await response.json();
    setPost(prev => ({ ...prev, [field]: value }));
  } catch (err) {
    console.error(err);
  } finally {
    setIsUpdating(false);
  }
};`}</code>
          </pre>
        </div>
      )}

      {/* PUT vs PATCH comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card bg-base-200 p-4">
          <h4 className="font-semibold mb-2 text-primary">PUT</h4>
          <ul className="text-sm space-y-1 text-base-content/70">
            <li>• Replaces the entire resource</li>
            <li>• Must send all fields</li>
            <li>• Missing fields may be deleted</li>
            <li>• Idempotent (same result if repeated)</li>
          </ul>
        </div>
        <div className="card bg-base-200 p-4">
          <h4 className="font-semibold mb-2 text-secondary">PATCH</h4>
          <ul className="text-sm space-y-1 text-base-content/70">
            <li>• Partial update only</li>
            <li>• Send only changed fields</li>
            <li>• Other fields unchanged</li>
            <li>• More efficient for small changes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


