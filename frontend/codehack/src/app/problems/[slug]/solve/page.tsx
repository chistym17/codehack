'use client';

import { useState, useEffect, use } from 'react';
import Editor from '@monaco-editor/react';
import problems from '../../../../../public/problems.json';

interface TestCase {
  input: string;
  output: string;
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

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullCode: code,
          language: language,
          problem: {
            test_cases: problem.test_cases
          }
        })
      });

      const data = await response.json();
      console.log('Submission response:', data);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
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
              <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                Run
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
