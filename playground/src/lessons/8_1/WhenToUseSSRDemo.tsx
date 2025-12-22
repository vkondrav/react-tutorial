// ============================================
// When to Use SSR Demo
// ============================================
// Decision framework for choosing SSR
// ============================================

import { useState } from 'react';
import { HiCheck, HiX, HiOutlineArrowRight } from 'react-icons/hi';

interface DecisionNode {
  id: string;
  question: string;
  yes: string | 'ssr' | 'csr' | 'ssg';
  no: string | 'ssr' | 'csr' | 'ssg';
}

const DECISION_TREE: DecisionNode[] = [
  {
    id: 'seo',
    question: 'Is SEO critical for this page?',
    yes: 'dynamic',
    no: 'public',
  },
  {
    id: 'dynamic',
    question: 'Does content change frequently or per-user?',
    yes: 'ssr',
    no: 'ssg',
  },
  {
    id: 'public',
    question: 'Is this a public marketing/content page?',
    yes: 'ssg',
    no: 'auth',
  },
  {
    id: 'auth',
    question: 'Is this behind authentication?',
    yes: 'fcp',
    no: 'fcp',
  },
  {
    id: 'fcp',
    question: 'Is First Contentful Paint critical?',
    yes: 'ssr',
    no: 'csr',
  },
];

type Recommendation = 'ssr' | 'csr' | 'ssg';

interface RecommendationInfo {
  title: string;
  description: string;
  color: string;
  examples: string[];
}

const RECOMMENDATIONS: Record<Recommendation, RecommendationInfo> = {
  ssr: {
    title: 'Server-Side Rendering',
    description: 'Render on each request. Best for dynamic, personalized content that needs SEO.',
    color: 'text-primary',
    examples: ['E-commerce product pages', 'News articles', 'Social media feeds', 'Dashboards'],
  },
  csr: {
    title: 'Client-Side Rendering',
    description: 'Render in the browser. Simplest to implement, good for authenticated apps.',
    color: 'text-warning',
    examples: ['Admin panels', 'SaaS dashboards', 'Internal tools', 'Real-time apps'],
  },
  ssg: {
    title: 'Static Site Generation',
    description: 'Pre-render at build time. Fastest performance, perfect for static content.',
    color: 'text-success',
    examples: ['Blogs', 'Documentation', 'Marketing pages', 'Landing pages'],
  },
};

export default function WhenToUseSSRDemo(): React.ReactElement {
  const [currentNodeId, setCurrentNodeId] = useState<string>('seo');
  const [history, setHistory] = useState<{ nodeId: string; answer: boolean }[]>([]);
  const [result, setResult] = useState<Recommendation | null>(null);

  const currentNode = DECISION_TREE.find((n) => n.id === currentNodeId);

  const handleAnswer = (answer: boolean) => {
    if (!currentNode) return;

    const nextId = answer ? currentNode.yes : currentNode.no;
    setHistory((prev) => [...prev, { nodeId: currentNodeId, answer }]);

    if (nextId === 'ssr' || nextId === 'csr' || nextId === 'ssg') {
      setResult(nextId);
    } else {
      setCurrentNodeId(nextId);
    }
  };

  const reset = () => {
    setCurrentNodeId('seo');
    setHistory([]);
    setResult(null);
  };

  const goBack = () => {
    if (history.length === 0) return;
    const newHistory = [...history];
    const lastStep = newHistory.pop()!;
    setHistory(newHistory);
    setResult(null);
    setCurrentNodeId(lastStep.nodeId);
  };

  return (
    <div className="card bg-base-200 p-6">
      {/* Decision Flow */}
      {!result ? (
        <>
          {/* Progress */}
          <div className="flex items-center gap-2 mb-6 text-sm text-base-content/50">
            <span>Start</span>
            {history.map((h, i) => {
              const node = DECISION_TREE.find((n) => n.id === h.nodeId);
              return (
                <span key={i} className="flex items-center gap-2">
                  <HiOutlineArrowRight size={14} />
                  <span className={h.answer ? 'text-success' : 'text-error'}>
                    {node?.question.split(' ').slice(0, 3).join(' ')}...{' '}
                    {h.answer ? <HiCheck className="inline" /> : <HiX className="inline" />}
                  </span>
                </span>
              );
            })}
          </div>

          {/* Current Question */}
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold mb-8">{currentNode?.question}</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="btn btn-success btn-lg gap-2 min-w-[120px]"
              >
                <HiCheck size={20} />
                Yes
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="btn btn-error btn-lg gap-2 min-w-[120px]"
              >
                <HiX size={20} />
                No
              </button>
            </div>
          </div>

          {/* Back Button */}
          {history.length > 0 && (
            <div className="text-center mt-4">
              <button onClick={goBack} className="btn btn-ghost btn-sm">
                ← Go Back
              </button>
            </div>
          )}
        </>
      ) : (
        /* Result */
        <div className="text-center py-6">
          <div className="mb-6">
            <div
              className={`text-6xl mb-4 ${
                result === 'ssr' ? '🖥️' : result === 'csr' ? '🌐' : '📄'
              }`}
            >
              {result === 'ssr' ? '🖥️' : result === 'csr' ? '🌐' : '📄'}
            </div>
            <h3 className={`text-2xl font-bold ${RECOMMENDATIONS[result].color}`}>
              {RECOMMENDATIONS[result].title}
            </h3>
            <p className="text-base-content/70 mt-2 max-w-md mx-auto">
              {RECOMMENDATIONS[result].description}
            </p>
          </div>

          <div className="bg-base-300 rounded-lg p-4 max-w-md mx-auto mb-6">
            <h4 className="font-semibold mb-2">Good for:</h4>
            <ul className="text-sm text-base-content/70 space-y-1">
              {RECOMMENDATIONS[result].examples.map((ex, i) => (
                <li key={i}>• {ex}</li>
              ))}
            </ul>
          </div>

          <button onClick={reset} className="btn btn-primary">
            Start Over
          </button>
        </div>
      )}

      {/* Quick Reference */}
      <div className="mt-8 pt-6 border-t border-base-300">
        <h4 className="font-semibold mb-4 text-center">Quick Reference</h4>
        <div className="grid md:grid-cols-3 gap-4">
          {(Object.entries(RECOMMENDATIONS) as [Recommendation, RecommendationInfo][]).map(
            ([key, info]) => (
              <div key={key} className="p-4 bg-base-300 rounded-lg">
                <h5 className={`font-semibold ${info.color} mb-1`}>{info.title}</h5>
                <p className="text-xs text-base-content/60">
                  {key === 'ssr' && 'Per-request rendering'}
                  {key === 'csr' && 'Browser rendering'}
                  {key === 'ssg' && 'Build-time rendering'}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
