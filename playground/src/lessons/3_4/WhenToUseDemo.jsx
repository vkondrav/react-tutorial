// ============================================
// Demo: When to Use (and When NOT to)
// ============================================

import { HiCheck, HiX, HiOutlineExclamationCircle, HiOutlineLightBulb } from 'react-icons/hi';

export default function WhenToUseDemo() {
  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineExclamationCircle className="text-primary" size={20} />
        Decision Guide
      </h3>

      {/* DO use */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-success font-semibold mb-3">
          <HiCheck size={20} />
          DO Use When...
        </div>
        <div className="space-y-2">
          {[
            {
              hook: 'useMemo',
              scenario: 'Filtering/sorting large arrays (1000+ items)',
              example: 'const filtered = useMemo(() => items.filter(...), [items, filter])',
            },
            {
              hook: 'useMemo',
              scenario: 'Complex calculations that take >1ms',
              example: 'const result = useMemo(() => heavyMath(data), [data])',
            },
            {
              hook: 'useCallback',
              scenario: 'Passing callbacks to React.memo components',
              example: 'const onClick = useCallback(() => {...}, [deps])',
            },
            {
              hook: 'useCallback',
              scenario: 'Callbacks used in useEffect dependencies',
              example: 'useEffect(() => { fn() }, [fn]) // fn should be stable',
            },
          ].map((item, i) => (
            <div key={i} className="bg-success/10 rounded-lg p-3 border border-success/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-success badge-sm">{item.hook}</span>
                <span className="text-sm">{item.scenario}</span>
              </div>
              <code className="text-xs text-base-content/60 block">{item.example}</code>
            </div>
          ))}
        </div>
      </div>

      {/* DON'T use */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-error font-semibold mb-3">
          <HiX size={20} />
          DON'T Use When...
        </div>
        <div className="space-y-2">
          {[
            {
              reason: 'Simple calculations',
              example: 'useMemo(() => a + b, [a, b]) // Memoization costs more than the calc!',
            },
            {
              reason: 'Primitives or small objects',
              example: 'useMemo(() => ({ name }), [name]) // Just use the value directly',
            },
            {
              reason: 'Functions not passed to memoized children',
              example: "useCallback(() => {...}, []) // If child isn't memoized, no benefit",
            },
            {
              reason: 'Premature optimization',
              example: "// Don't optimize until you measure a real problem!",
            },
          ].map((item, i) => (
            <div key={i} className="bg-error/10 rounded-lg p-3 border border-error/20">
              <div className="text-sm mb-1">{item.reason}</div>
              <code className="text-xs text-base-content/60 block">{item.example}</code>
            </div>
          ))}
        </div>
      </div>

      {/* The Cost */}
      <div className="bg-warning/10 rounded-lg p-4 border border-warning/30 mb-4">
        <div className="flex items-center gap-2 text-warning font-semibold mb-2">
          <HiOutlineExclamationCircle size={18} />
          The Hidden Cost
        </div>
        <ul className="text-sm space-y-1 text-base-content/80">
          <li>
            • <strong>Memory:</strong> Cached values stay in memory
          </li>
          <li>
            • <strong>Comparison:</strong> React must compare dependencies every render
          </li>
          <li>
            • <strong>Complexity:</strong> More code to read and maintain
          </li>
          <li>
            • <strong>False security:</strong> Wrong dependencies = stale values
          </li>
        </ul>
      </div>

      {/* Rule of thumb */}
      <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border border-primary/30">
        <HiOutlineLightBulb className="text-primary shrink-0 mt-0.5" size={18} />
        <p className="text-sm text-base-content/80">
          <strong>Rule of thumb:</strong> Write your code without memoization first. If you notice
          performance issues, use React DevTools Profiler to identify slow components, then add
          memoization where it helps.
        </p>
      </div>
    </div>
  );
}
