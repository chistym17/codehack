'use client';

import { useState, useEffect, use } from 'react';
import Editor from '@monaco-editor/react';
import problems from '../../../../../public/problems.json';
import toast, { Toaster } from 'react-hot-toast';

interface TestCase {
  input: string;
  output: string;
}

interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
}

interface SubmissionResponse {
  message: string;
  results: TestResult[];
  summary: {
    totalTests: number;
    passed: number;
    failed: number;
    firstFailedTest: number;
  };
}

interface FunctionTemplate {
  default: string;
  boilerplate: string;
}

interface Problem {
  slug: string;
  statement: string;
  test_cases: TestCase[];
  functionTemplates: {
    python: FunctionTemplate;
    cpp: FunctionTemplate;
    c: FunctionTemplate;
  };
}

type Language = 'python' | 'cpp' | 'c';

export default function ProblemSolvePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [code, setCode] = useState('');
  const [problem, setProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState<Language>('cpp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);

  useEffect(() => {
    const currentProblem = problems.find(p => p.slug === resolvedParams.slug);
    if (currentProblem) {
      setProblem(currentProblem as Problem);
      setCode(currentProblem.functionTemplates[language]?.default || '');
    }
  }, [resolvedParams.slug, language]);

  useEffect(() => {
    if (problem && problem.functionTemplates[language]) {
      setCode(problem.functionTemplates[language].default);
    }
  }, [language, problem]);

  const handleSubmit = async () => {
    if (!problem || !code) return;

    const fullcode = problem.functionTemplates[language]?.boilerplate.replace('{user_code}', code);
    console.log(fullcode);

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullCode: fullcode,
          language: language,
          problem: {
            test_cases: problem.test_cases
          }
        })
      });

      const data: SubmissionResponse = await response.json();
      setSubmissionResult(data);


      if (data.summary.failed === 0) {
        toast.success('All test cases passed!');
      } else {
        toast.error(`Failed ${data.summary.failed} test case(s)`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit code');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <Toaster position="top-right" />
      <div className="h-[calc(100vh-64px)] flex">
        <div className="w-[45%] overflow-y-auto border-r border-gray-200 dark:border-gray-700">
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
              {problem.test_cases.slice(0, 2).map((testCase: TestCase, index: number) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="font-mono">
                    <p><strong>Input:</strong> {testCase.input}</p>
                    <p><strong>Output:</strong> {testCase.output}</p>
                  </div>
                </div>
              ))}

              {submissionResult && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Test Results</h3>
                  <div className="space-y-4">
                    {submissionResult.results.map((result, index) => (
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
                    <p className="text-sm font-medium">
                      Summary: {submissionResult.summary.passed} passed, {submissionResult.summary.failed} failed
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
              >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="c">C</option>
              </select>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-200 ${isSubmitting
                  ? 'bg-green-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
                  }`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              theme="vs-dark"
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                automaticLayout: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
