'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '@/components/problems/CodeEditor';
import ProblemStatement from '@/components/problems/ProblemStatement';
import problems from '../../../../../public/problems.json';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

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
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(`/auth?redirect=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [user, router]);

  useEffect(() => {
    if (!resolvedParams) return;
    
    const currentProblem = problems.find(p => p.slug === resolvedParams.slug);
    if (currentProblem) {
      setProblem(currentProblem as Problem);
      setCode(currentProblem.functionTemplates[language]?.default || '');
    }
  }, [resolvedParams, language]);

  if (!problem) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // This should never happen due to the redirect above
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <Toaster position="top-right" />
      <div className="h-[calc(100vh-64px)] flex">
        <div className="w-[45%] overflow-y-auto border-r border-gray-200 dark:border-gray-700">
          <ProblemStatement 
            problem={problem} 
            submissionResult={submissionResult}
          />
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
