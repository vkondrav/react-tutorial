// ============================================
// Empty States Demo
// Patterns for when there's no data to display
// ============================================

import { useState } from 'react';
import {
  HiOutlineInbox,
  HiOutlineSearch,
  HiOutlineDocumentAdd,
  HiOutlineSparkles,
  HiOutlinePlus,
  HiOutlineFilter,
  HiX,
} from 'react-icons/hi';
import { CodeSnippet } from '../components';
import emptyStateCode from './examples/EmptyState.tsx?raw';

type EmptyType = 'no-data' | 'no-results' | 'first-time' | 'filtered';

interface EmptyStateConfig {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Reusable empty state component
function EmptyState({ config }: { config: EmptyStateConfig }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-base-content/30 mb-4">{config.icon}</div>
      <h3 className="text-lg font-semibold mb-2">{config.title}</h3>
      <p className="text-base-content/60 text-sm max-w-xs mb-6">{config.description}</p>
      {config.action && (
        <button onClick={config.action.onClick} className="btn btn-primary btn-sm gap-2">
          <HiOutlinePlus size={16} />
          {config.action.label}
        </button>
      )}
    </div>
  );
}

// Demo card for each empty state type
function EmptyStateCard({
  type,
  isActive,
  onClick,
}: {
  type: EmptyType;
  isActive: boolean;
  onClick: () => void;
}) {
  const configs: Record<EmptyType, { label: string; color: string }> = {
    'no-data': { label: 'No Data', color: 'badge-primary' },
    'no-results': { label: 'No Results', color: 'badge-secondary' },
    'first-time': { label: 'First Time', color: 'badge-accent' },
    filtered: { label: 'Filtered Out', color: 'badge-warning' },
  };

  const config = configs[type];

  return (
    <button
      onClick={onClick}
      className={`card p-3 text-left transition-all ${
        isActive ? 'bg-primary text-primary-content' : 'bg-base-300 hover:bg-base-200'
      }`}
    >
      <span className={`badge ${isActive ? 'badge-ghost' : config.color} text-xs`}>
        {config.label}
      </span>
    </button>
  );
}

// Interactive demo with search/filter
function InteractiveEmptyDemo() {
  const [items] = useState([
    { id: 1, name: 'React Fundamentals', category: 'course' },
    { id: 2, name: 'TypeScript Basics', category: 'course' },
    { id: 3, name: 'CSS Grid Guide', category: 'article' },
    { id: 4, name: 'Node.js Tutorial', category: 'course' },
  ]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !filter || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  const hasActiveFilters = search || filter;

  return (
    <div className="card bg-base-200 p-4 space-y-4">
      <h4 className="font-semibold">Try It: Search & Filter</h4>

      {/* Search and filter controls */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <HiOutlineSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
            size={16}
          />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered input-sm w-full pl-9"
          />
        </div>
        <select
          value={filter || ''}
          onChange={(e) => setFilter(e.target.value || null)}
          className="select select-bordered select-sm"
        >
          <option value="">All categories</option>
          <option value="course">Courses</option>
          <option value="article">Articles</option>
        </select>
        {hasActiveFilters && (
          <button
            onClick={() => {
              setSearch('');
              setFilter(null);
            }}
            className="btn btn-ghost btn-sm gap-1"
          >
            <HiX size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Results or empty state */}
      <div className="min-h-[200px] bg-base-300 rounded-lg p-4">
        {filteredItems.length > 0 ? (
          <ul className="space-y-2">
            {filteredItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3 p-2 bg-base-200 rounded">
                <HiOutlineDocumentAdd className="text-primary" />
                <span>{item.name}</span>
                <span className="badge badge-sm ml-auto">{item.category}</span>
              </li>
            ))}
          </ul>
        ) : hasActiveFilters ? (
          <EmptyState
            config={{
              icon: <HiOutlineFilter size={48} />,
              title: 'No matching results',
              description: `No items match "${search || filter}". Try adjusting your filters.`,
              action: {
                label: 'Clear Filters',
                onClick: () => {
                  setSearch('');
                  setFilter(null);
                },
              },
            }}
          />
        ) : (
          <EmptyState
            config={{
              icon: <HiOutlineInbox size={48} />,
              title: 'No items yet',
              description: 'Get started by adding your first item.',
              action: {
                label: 'Add Item',
                onClick: () => alert('Add item clicked!'),
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function EmptyStatesDemo(): React.ReactElement {
  const [selectedType, setSelectedType] = useState<EmptyType>('no-data');

  const emptyConfigs: Record<EmptyType, EmptyStateConfig> = {
    'no-data': {
      icon: <HiOutlineInbox size={48} />,
      title: 'No projects yet',
      description: "You haven't created any projects. Start building something amazing!",
      action: {
        label: 'Create Project',
        onClick: () => alert('Create project clicked!'),
      },
    },
    'no-results': {
      icon: <HiOutlineSearch size={48} />,
      title: 'No results found',
      description: 'We couldn\'t find anything matching "xyz". Try different keywords.',
    },
    'first-time': {
      icon: <HiOutlineSparkles size={48} />,
      title: 'Welcome to Photos!',
      description: 'Your memories will appear here. Upload your first photo to get started.',
      action: {
        label: 'Upload Photo',
        onClick: () => alert('Upload clicked!'),
      },
    },
    filtered: {
      icon: <HiOutlineFilter size={48} />,
      title: 'No items match filters',
      description: 'Try adjusting your filters or clear them to see all items.',
      action: {
        label: 'Clear Filters',
        onClick: () => alert('Clear filters clicked!'),
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Type selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(Object.keys(emptyConfigs) as EmptyType[]).map((type) => (
          <EmptyStateCard
            key={type}
            type={type}
            isActive={selectedType === type}
            onClick={() => setSelectedType(type)}
          />
        ))}
      </div>

      {/* Preview */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card bg-base-300 p-0 overflow-hidden">
          <EmptyState config={emptyConfigs[selectedType]} />
        </div>

        {/* Code example */}
        <div className="card bg-base-200 p-4">
          <h4 className="font-semibold mb-3">Code Pattern</h4>
          <CodeSnippet code={emptyStateCode} language="tsx" title="EmptyState Component" />
        </div>
      </div>

      {/* Interactive demo */}
      <InteractiveEmptyDemo />

      {/* Guidelines */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">Empty State Guidelines</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <HiOutlineInbox className="text-primary" />
              No Data
            </div>
            <ul className="space-y-1 text-base-content/70 text-xs">
              <li>• Explain what would appear here</li>
              <li>• Provide a clear CTA to add data</li>
              <li>• Make it inviting, not sad</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <HiOutlineSearch className="text-secondary" />
              No Results
            </div>
            <ul className="space-y-1 text-base-content/70 text-xs">
              <li>• Show what was searched for</li>
              <li>• Suggest alternatives</li>
              <li>• Don't blame the user</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <HiOutlineSparkles className="text-accent" />
              First Time
            </div>
            <ul className="space-y-1 text-base-content/70 text-xs">
              <li>• Welcome the user warmly</li>
              <li>• Explain the feature's value</li>
              <li>• Guide them to first action</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
