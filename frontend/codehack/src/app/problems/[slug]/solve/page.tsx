'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '@/components/problems/CodeEditor';
import ProblemStatement from '@/components/problems/ProblemStatement';
import SubmissionList from '@/components/problems/SubmissionList';
import problems from '../../../../../public/problems.json';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  </div>
);

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
  sid: number;
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
  const [selectedTab, setSelectedTab] = useState<'problem' | 'submissions'>('problem');
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (user === null) {
      router.push(`/auth?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (!resolvedParams) return;

    const currentProblem = problems.find(p => p.slug === resolvedParams.slug);
    if (currentProblem) {
      setProblem(currentProblem as Problem);
      setCode(currentProblem.functionTemplates[language]?.default || '');
    }
  }, [user, loading, resolvedParams, language, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user === null) {
    return null;
  }

  if (!problem) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <Toaster position="top-right" />
      <div className="h-[calc(100vh-64px)] flex">
        <div className="w-[45%] overflow-y-auto border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 mb-4 mt-4">
            <button
              className={`px-4 py-2 font-medium focus:outline-none ${selectedTab === 'problem' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
              onClick={() => setSelectedTab('problem')}
            >
              Problem
            </button>
            <button
              className={`ml-2 px-4 py-2 font-medium focus:outline-none ${selectedTab === 'submissions' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
              onClick={() => setSelectedTab('submissions')}
            >
              Submissions
            </button>
          </div>
          {selectedTab === 'problem' ? (
            <ProblemStatement
              problem={problem}
              submissionResult={submissionResult}
              isSubmitting={isSubmitting}
            />
          ) : (
            <SubmissionList userId={Number(user?.id)} problemId={Number(problem.sid)} />
          )}
        </div>
        <div className="w-[55%]">
          <CodeEditor
            problem={problem}
            language={language}
            setLanguage={setLanguage}
            code={code}
            setCode={setCode}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            submissionResult={submissionResult}
            setSubmissionResult={setSubmissionResult}
          />
        </div>
      </div>
    </div>
  );
}
