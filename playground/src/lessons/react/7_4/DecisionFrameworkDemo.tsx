// ============================================
// Decision Framework Demo - Flowchart for choosing state management
// ============================================

import { useState } from 'react';
import {
  HiOutlineQuestionMarkCircle,
  HiCheck,
  HiArrowRight,
  HiOutlineRefresh,
} from 'react-icons/hi';

type Answer = 'yes' | 'no' | null;

interface Question {
  id: string;
  text: string;
  yesNext: string | 'result';
  noNext: string | 'result';
  yesResult?: string;
  noResult?: string;
}

interface Result {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  color: string;
}

const questions: Question[] = [
  {
    id: 'start',
    text: 'Is the state shared between multiple components?',
    yesNext: 'sibling',
    noNext: 'result',
    noResult: 'usestate',
  },
  {
    id: 'sibling',
    text: 'Is it shared between sibling/distant components (not parent-child)?',
    yesNext: 'frequency',
    noNext: 'result',
    noResult: 'lift-state',
  },
  {
    id: 'frequency',
    text: 'Does the state update very frequently (e.g., every keystroke, mouse move)?',
    yesNext: 'result',
    noNext: 'complexity',
    yesResult: 'zustand-perf',
  },
  {
    id: 'complexity',
    text: 'Do you have more than 5-8 pieces of global state (contexts)?',
    yesNext: 'team',
    noNext: 'result',
    noResult: 'context-reducer',
  },
  {
    id: 'team',
    text: 'Is this a large team project requiring strict patterns and excellent DevTools?',
    yesNext: 'result',
    noNext: 'result',
    yesResult: 'redux-toolkit',
    noResult: 'zustand',
  },
];

const results: Result[] = [
  {
    id: 'usestate',
    title: 'useState',
    description: 'Perfect for component-local state',
    recommendation: "Keep it simple! State that doesn't need to be shared stays in the component.",
    color: 'text-primary',
  },
  {
    id: 'lift-state',
    title: 'Lift State Up',
    description: 'Move state to the nearest common parent',
    recommendation: 'Pass state down as props, callbacks up. No library needed.',
    color: 'text-primary',
  },
  {
    id: 'context-reducer',
    title: 'Context + useReducer',
    description: "React's built-in global state solution",
    recommendation:
      'Great for theme, auth, cart, notifications. You learned this in 7.3! Use it first.',
    color: 'text-secondary',
  },
  {
    id: 'zustand',
    title: 'Zustand',
    description: 'Minimal global state library',
    recommendation:
      'When Context gets unwieldy. Tiny bundle, no boilerplate, great DX. Try this first!',
    color: 'text-amber-400',
  },
  {
    id: 'zustand-perf',
    title: 'Zustand (with selectors)',
    description: 'For performance-critical state',
    recommendation:
      'Zustand selectors prevent re-renders. Perfect for mouse position, real-time data, animations.',
    color: 'text-amber-400',
  },
  {
    id: 'redux-toolkit',
    title: 'Redux Toolkit',
    description: 'For large-scale applications',
    recommendation:
      'When you need DevTools time-travel, team conventions, and ecosystem integrations.',
    color: 'text-purple-400',
  },
];

export default function DecisionFrameworkDemo(): React.ReactElement {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('start');
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [resultId, setResultId] = useState<string | null>(null);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);
  const result = resultId ? results.find((r) => r.id === resultId) : null;

  const handleAnswer = (answer: 'yes' | 'no') => {
    if (!currentQuestion) return;

    setAnswers((prev) => ({ ...prev, [currentQuestionId]: answer }));

    const nextId = answer === 'yes' ? currentQuestion.yesNext : currentQuestion.noNext;
    const resultKey = answer === 'yes' ? currentQuestion.yesResult : currentQuestion.noResult;

    if (nextId === 'result' && resultKey) {
      setResultId(resultKey);
    } else if (nextId !== 'result') {
      setCurrentQuestionId(nextId);
    }
  };

  const handleReset = () => {
    setCurrentQuestionId('start');
    setAnswers({});
    setResultId(null);
  };

  // Calculate progress
  const answeredCount = Object.keys(answers).length;
  const progressPercent = resultId ? 100 : (answeredCount / questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between text-xs text-base-content/60 mb-1">
          <span>Progress</span>
          <span>{resultId ? 'Complete!' : `Question ${answeredCount + 1}`}</span>
        </div>
        <div className="h-2 bg-base-300 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${resultId ? 'bg-success' : 'bg-primary'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question/Result Card */}
      <div className="card bg-base-200 p-6">
        {!resultId && currentQuestion ? (
          /* Question Mode */
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <HiOutlineQuestionMarkCircle className="text-primary text-2xl mt-0.5 shrink-0" />
              <h3 className="text-lg font-medium text-base-content">{currentQuestion.text}</h3>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleAnswer('yes')}
                className="btn btn-lg btn-success flex-1 max-w-[150px]"
              >
                <HiCheck className="mr-1" /> Yes
              </button>
              <button
                onClick={() => handleAnswer('no')}
                className="btn btn-lg btn-error flex-1 max-w-[150px]"
              >
                No
              </button>
            </div>
          </div>
        ) : result ? (
          /* Result Mode */
          <div className="space-y-4 text-center">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mx-auto`}
            >
              <HiCheck className="text-success text-3xl" />
            </div>

            <div>
              <p className="text-base-content/60 text-sm mb-1">Recommendation</p>
              <h3 className={`text-2xl font-bold ${result.color}`}>{result.title}</h3>
              <p className="text-base-content/70 mt-1">{result.description}</p>
            </div>

            <div className="bg-base-300 rounded-lg p-4 text-left">
              <p className="text-sm text-base-content/80">{result.recommendation}</p>
            </div>

            <button onClick={handleReset} className="btn btn-outline btn-sm">
              <HiOutlineRefresh className="mr-1" /> Start Over
            </button>
          </div>
        ) : null}
      </div>

      {/* Answer Trail */}
      {answeredCount > 0 && (
        <div className="card bg-base-300 p-4">
          <h4 className="text-sm font-medium text-base-content/70 mb-3">Your Path:</h4>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {Object.entries(answers).map(([qId, answer], idx) => {
              const q = questions.find((question) => question.id === qId);
              return (
                <span key={qId} className="flex items-center gap-2">
                  {idx > 0 && <HiArrowRight className="text-base-content/40" />}
                  <span
                    className={`badge ${answer === 'yes' ? 'badge-success' : 'badge-error'} badge-sm`}
                  >
                    {q?.text.split(' ').slice(0, 3).join(' ')}... → {answer}
                  </span>
                </span>
              );
            })}
            {resultId && (
              <>
                <HiArrowRight className="text-base-content/40" />
                <span className={`font-bold ${result?.color}`}>{result?.title}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quick Reference Chart */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-medium text-base-content mb-3">Quick Reference</h4>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between p-2 rounded bg-base-300/50">
            <span>1-2 components need state</span>
            <span className="text-primary font-medium">useState</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-base-300/50">
            <span>Parent-child sharing</span>
            <span className="text-primary font-medium">Lift state + props</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-base-300/50">
            <span>2-5 global state items</span>
            <span className="text-secondary font-medium">Context + Reducer</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-base-300/50">
            <span>5+ global items, simpler setup</span>
            <span className="text-amber-400 font-medium">Zustand</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-base-300/50">
            <span>Large team, strict patterns</span>
            <span className="text-purple-400 font-medium">Redux Toolkit</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-base-300/50">
            <span>API data, caching, sync</span>
            <span className="text-red-400 font-medium">TanStack Query</span>
          </div>
        </div>
      </div>

      {/* Final Tip */}
      <div className="card bg-success/10 border border-success/20 p-4">
        <p className="text-sm text-base-content/80">
          <strong className="text-success">Pro Tip:</strong> When in doubt, start with built-in
          solutions. You can always migrate to a library later. It's much easier to add complexity
          than to remove it.
        </p>
      </div>
    </div>
  );
}
