// ============================================
// Lesson 4.1: Fetching Data with useEffect
// ============================================

import {
  HiOutlineCloudDownload,
  HiOutlineRefresh,
  HiOutlineLightningBolt,
  HiOutlineShieldExclamation,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import FetchBasicsDemo from './FetchBasicsDemo';
import DependencyFetchDemo from './DependencyFetchDemo';
import RaceConditionDemo from './RaceConditionDemo';
import FetchPlayground from './FetchPlayground';

export default function Lesson4_1(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="4" lesson="1" title="Fetching Data with useEffect" />

      {/* Section 1: Why useEffect for Fetching? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCloudDownload className="text-primary" size={20} />
            Why useEffect for Fetching?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Data fetching is a <strong className="text-primary">side effect</strong> — it's something
          that happens outside React's render cycle. We can't just fetch data during render because:
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-error mb-2">Without useEffect</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Fetches on every render</li>
              <li>• Creates infinite loops</li>
              <li>• No control over timing</li>
              <li>• Can't handle cleanup</li>
            </ul>
          </div>
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-success mb-2">With useEffect</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Fetches when you want</li>
              <li>• Controls re-fetching</li>
              <li>• Handles cleanup properly</li>
              <li>• Follows React lifecycle</li>
            </ul>
          </div>
        </div>
        <FetchBasicsDemo />
      </Section>

      {/* Section 2: The Fetch Pattern */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineRefresh className="text-primary" size={20} />
            Fetching with Dependencies
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          The <strong className="text-primary">dependency array</strong> controls when your fetch
          runs. An empty array <code className="text-secondary">[]</code> fetches once on mount;
          adding dependencies re-fetches when they change.
        </p>
        <DependencyFetchDemo />
      </Section>

      {/* Section 3: Race Conditions & Cleanup */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineShieldExclamation className="text-primary" size={20} />
            Race Conditions & Cleanup
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          When fetching data that depends on changing values, you can encounter{' '}
          <strong className="text-error">race conditions</strong> — where responses arrive out of
          order. The solution is to use <code className="text-secondary">AbortController</code> or a
          cleanup flag.
        </p>
        <RaceConditionDemo />
      </Section>

      {/* Section 4: Interactive Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Data Fetching Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Try these real-world fetching scenarios! Each demo shows a common pattern you'll use in
          production applications.
        </p>
        <FetchPlayground />
      </Section>

      {/* Section 5: The Complete Pattern */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            The Complete Fetch Pattern
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Here's the pattern you'll use for most data fetching in React:
        </p>
        <div className="bg-base-300 rounded-lg p-4 mb-4">
          <pre className="font-mono text-xs overflow-x-auto">
            <code>{`interface User {
  id: number;
  name: string;
}

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(\`/api/users/\${userId}\`, {
          signal: controller.signal
        });
        
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
    
    return () => controller.abort();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;
  
  return <div>{user.name}</div>;
}`}</code>
          </pre>
        </div>
      </Section>

      {/* Takeaways */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineClipboardCheck className="text-primary" size={20} />
            Key Takeaways
          </span>
        }
      >
        <TakeawayList
          items={[
            'Data fetching is a side effect — use useEffect, not the render body',
            'Empty dependency array [] = fetch once on mount',
            'Add dependencies to re-fetch when values change (e.g., userId)',
            'Always track loading and error states for good UX',
            'Use AbortController to cancel in-flight requests on cleanup',
            'Handle race conditions by ignoring stale responses',
            'The fetch-loading-error pattern is the foundation for data fetching',
          ]}
        />
      </Section>
    </div>
  );
}
