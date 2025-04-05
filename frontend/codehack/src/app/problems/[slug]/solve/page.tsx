'use client';

import { useState, useEffect, use } from 'react';
import Editor from '@monaco-editor/react';
import problems from '../../../../../public/problems.json';

export default function ProblemSolvePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [code, setCode] = useState('');
  const [problem, setProblem] = useState<any>(null);
  const [language, setLanguage] = useState('cpp');

  useEffect(() => {
    const currentProblem = problems.find(p => p.slug === resolvedParams.slug);
    setProblem(currentProblem);
    if (currentProblem) {
      setCode(problem?.functionTemplates[language]?.default
      );
    }
  }, [resolvedParams.slug]);

  useEffect(() => {
    if (problem) {
      setCode(problem?.functionTemplates[language]?.default);
    }
  }, [language]);

  const handleSubmit = () => {
    if (problem) {
      const boilerplate = problem?.functionTemplates[language]?.boilerplate;
      const finalCode = boilerplate.replace('{user_code}', code.trim());
      console.log('Submitting this code:', finalCode);
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
              {problem.test_cases.map((testCase: any, index: number) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="font-mono">
                    <p><strong>Input:</strong> {testCase.input}</p>
                    <p><strong>Output:</strong> {testCase.output}</p>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Function Format</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your function should accept input as a string and return the result as a string.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <select
                className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-sm"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="cpp">cpp</option>
                <option value="python">Python</option>
                <option value="c">c</option>
              </select>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium">
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
