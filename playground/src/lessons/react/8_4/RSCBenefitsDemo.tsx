// ============================================
// RSCBenefitsDemo: Benefits & Trade-offs of RSC
// ============================================

import { useState } from 'react';
import {
  HiOutlineLightningBolt,
  HiOutlineScale,
  HiOutlineDatabase,
  HiOutlineShieldCheck,
  HiOutlineExclamationCircle,
  HiOutlineClock,
  HiChevronDown,
  HiChevronUp,
} from 'react-icons/hi';

interface BenefitCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  color: string;
}

const BENEFITS: BenefitCard[] = [
  {
    icon: <HiOutlineScale size={24} />,
    title: 'Reduced Bundle Size',
    description: 'Heavy dependencies stay on the server',
    details: [
      'Markdown parsers, syntax highlighters, date libraries never ship to client',
      'Only interactive components add to JavaScript bundle',
      'Faster page loads, especially on mobile networks',
      'Better Core Web Vitals (LCP, FID, CLS)',
    ],
    color: 'text-blue-400',
  },
  {
    icon: <HiOutlineDatabase size={24} />,
    title: 'Direct Data Access',
    description: 'No API layer needed for server data',
    details: [
      'Query databases directly in components',
      'Read files from the file system',
      'Call internal APIs without network round-trips',
      'Simpler architecture, less boilerplate',
    ],
    color: 'text-green-400',
  },
  {
    icon: <HiOutlineShieldCheck size={24} />,
    title: 'Better Security',
    description: 'Sensitive logic never reaches the client',
    details: [
      'API keys and secrets stay server-side',
      'Business logic hidden from users',
      'Reduced attack surface',
      'No risk of exposing sensitive data',
    ],
    color: 'text-purple-400',
  },
  {
    icon: <HiOutlineLightningBolt size={24} />,
    title: 'Streaming & Suspense',
    description: 'Progressive rendering for better UX',
    details: [
      'Components can stream as they complete',
      'Users see content faster',
      'Suspense boundaries show loading states',
      'Non-blocking data fetching',
    ],
    color: 'text-yellow-400',
  },
];

interface TradeOff {
  challenge: string;
  mitigation: string;
}

const TRADE_OFFS: TradeOff[] = [
  {
    challenge: 'No hooks in Server Components',
    mitigation: 'Split into Server (data) + Client (interactivity) components',
  },
  {
    challenge: 'Learning new mental model',
    mitigation: 'Start with "Server by default, Client when needed" principle',
  },
  {
    challenge: 'Framework-dependent',
    mitigation: 'Use Next.js App Router, or wait for other frameworks to add support',
  },
  {
    challenge: "Can't pass functions as props",
    mitigation: 'Use Server Actions for mutations, or restructure with children pattern',
  },
  {
    challenge: 'Debugging across server/client',
    mitigation: 'Use React DevTools, check terminal for server logs, browser for client',
  },
];

export default function RSCBenefitsDemo(): React.ReactElement {
  const [expandedBenefit, setExpandedBenefit] = useState<number | null>(0);
  const [showTradeOffs, setShowTradeOffs] = useState(false);

  return (
    <div className="space-y-6">
      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BENEFITS.map((benefit, index) => (
          <button
            key={index}
            onClick={() => setExpandedBenefit(expandedBenefit === index ? null : index)}
            className={`card bg-base-300 p-4 text-left transition-all ${
              expandedBenefit === index ? 'ring-2 ring-primary' : 'hover:bg-base-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={benefit.color}>{benefit.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold ${benefit.color}`}>{benefit.title}</h4>
                  {expandedBenefit === index ? (
                    <HiChevronUp size={16} className="text-base-content/50" />
                  ) : (
                    <HiChevronDown size={16} className="text-base-content/50" />
                  )}
                </div>
                <p className="text-sm text-base-content/70 mt-1">{benefit.description}</p>

                {expandedBenefit === index && (
                  <ul className="mt-3 space-y-1">
                    {benefit.details.map((detail, i) => (
                      <li key={i} className="text-xs text-base-content/60 flex items-start gap-2">
                        <span className="text-success mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Bundle Size Comparison */}
      <div className="card bg-base-300 p-6">
        <h4 className="font-semibold mb-4">Bundle Size Impact: Real Example</h4>
        <div className="space-y-4">
          <p className="text-sm text-base-content/70">
            Consider a blog post page that uses a markdown parser and syntax highlighter:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Traditional */}
            <div className="bg-base-200 rounded-lg p-4">
              <h5 className="font-semibold text-error mb-2">Traditional (CSR/SSR)</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>React + ReactDOM</span>
                  <span className="text-base-content/70">~42 KB</span>
                </div>
                <div className="flex justify-between">
                  <span>marked (markdown)</span>
                  <span className="text-base-content/70">~35 KB</span>
                </div>
                <div className="flex justify-between">
                  <span>Prism (syntax)</span>
                  <span className="text-base-content/70">~67 KB</span>
                </div>
                <div className="flex justify-between">
                  <span>date-fns</span>
                  <span className="text-base-content/70">~24 KB</span>
                </div>
                <div className="border-t border-base-content/10 pt-2 flex justify-between font-semibold">
                  <span>Total JS</span>
                  <span className="text-error">~168 KB</span>
                </div>
              </div>
            </div>

            {/* RSC */}
            <div className="bg-base-200 rounded-lg p-4">
              <h5 className="font-semibold text-success mb-2">With RSC</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>React runtime</span>
                  <span className="text-base-content/70">~12 KB</span>
                </div>
                <div className="flex justify-between text-base-content/40">
                  <span>marked (server only)</span>
                  <span>0 KB</span>
                </div>
                <div className="flex justify-between text-base-content/40">
                  <span>Prism (server only)</span>
                  <span>0 KB</span>
                </div>
                <div className="flex justify-between text-base-content/40">
                  <span>date-fns (server only)</span>
                  <span>0 KB</span>
                </div>
                <div className="border-t border-base-content/10 pt-2 flex justify-between font-semibold">
                  <span>Total JS</span>
                  <span className="text-success">~12 KB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-success/10 border border-success/30 rounded-lg p-3 text-center">
            <span className="text-success font-semibold">~93% smaller bundle</span>
            <span className="text-base-content/70 text-sm"> for this page</span>
          </div>
        </div>
      </div>

      {/* Trade-offs Section */}
      <button
        onClick={() => setShowTradeOffs(!showTradeOffs)}
        className="w-full card bg-warning/10 border border-warning/30 p-4 text-left hover:bg-warning/20 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HiOutlineExclamationCircle className="text-warning" size={24} />
            <div>
              <h4 className="font-semibold text-warning">Trade-offs & Challenges</h4>
              <p className="text-sm text-base-content/70">
                RSC aren't a silver bullet — understand the constraints
              </p>
            </div>
          </div>
          {showTradeOffs ? (
            <HiChevronUp size={20} className="text-warning" />
          ) : (
            <HiChevronDown size={20} className="text-warning" />
          )}
        </div>
      </button>

      {showTradeOffs && (
        <div className="card bg-base-300 p-6 space-y-4">
          {TRADE_OFFS.map((tradeOff, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1 bg-error/10 border border-error/30 rounded-lg p-3">
                <div className="text-xs font-semibold text-error mb-1">Challenge</div>
                <p className="text-sm">{tradeOff.challenge}</p>
              </div>
              <div className="flex items-center">
                <HiOutlineClock className="text-base-content/30" size={20} />
              </div>
              <div className="flex-1 bg-success/10 border border-success/30 rounded-lg p-3">
                <div className="text-xs font-semibold text-success mb-1">Mitigation</div>
                <p className="text-sm">{tradeOff.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
