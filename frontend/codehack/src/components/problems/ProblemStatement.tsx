'use client';

import { Problem } from '@/types/problems';
import { SubmissionResponse } from '../../types/submissions';

interface ProblemStatementProps {
  problem: Problem;
  submissionResult: SubmissionResponse | null;
  isSubmitting: boolean;
}

export default function ProblemStatement({ problem, submissionResult, isSubmitting }: ProblemStatementProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {problem.slug.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </h1>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {problem.statement}
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-4">Examples</h3>
        {problem.test_cases.slice(0, 2).map((testCase, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
            <div className="font-mono">
              <p><strong>Input:</strong> {testCase.input}</p>
              <p><strong>Output:</strong> {testCase.output}</p>
            </div>
          </div>
        ))}

        {isSubmitting && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Evaluating Test Cases</h3>
            <div className="space-y-4">
              {problem.test_cases.map((_, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Test Case {index + 1}: Evaluating...
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isSubmitting && submissionResult && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Test Results</h3>
            <div className="space-y-4">
              {submissionResult?.results?.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${result.passed
                    ? 'bg-green-100 dark:bg-green-800/30'
                    : 'bg-red-100 dark:bg-red-800/30'
                    }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm font-medium ${result.passed
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                      }`}>
                      Test Case {index + 1}: {result.passed ? 'Passed ✓' : 'Failed ✗'}
                    </span>
                  </div>
                  {!result.passed && (
                    <div className="mt-2 text-sm space-y-1 font-mono">
                      <p><strong>Input:</strong> {result.input}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm font-medium flex items-center gap-2">
                {submissionResult?.summary?.passed > 0 && (
                  <span className="text-green-600 dark:text-green-400">
                    {submissionResult.summary.passed} Passed ✓
                  </span>
                )}
                {submissionResult?.summary?.failed > 0 && (
                  <span className="text-red-600 dark:text-red-400">
                    {submissionResult.summary.failed} Failed ✗
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
