'use client';
import Editor from '@monaco-editor/react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { Problem } from '@/types/problems';
import { Language } from '@/types/problems';

interface CodeEditorProps {
  problem: Problem;
  language: Language;
  setLanguage: (lang: Language) => void;
  code: string;
  setCode: (code: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  submissionResult: any;
  setSubmissionResult: (result: any) => void;
}

export default function CodeEditor({
  problem,
  language,
  setLanguage,
  code,
  setCode,
  isSubmitting,
  setIsSubmitting,
  submissionResult,
  setSubmissionResult
}: CodeEditorProps) {
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!problem || !code) return;

    const fullcode = problem.functionTemplates[language]?.boilerplate.replace('{user_code}', code);

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/submit`, {
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

      const data = await response.json();
      setSubmissionResult(data);

      if (data?.summary?.failed === 0) {
        toast.success('All test cases passed!');
      } else {
        toast.error(`submission failed. try again`);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          userId: user?.id,
          status: data?.summary?.failed === 0 ? 'ACCEPTED' : 'FAILED',
          problemId: problem.sid
        })
      });
      const submissionData = await res.json();

    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit code');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mt-2">
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
            className={`px-3 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-200 ${isSubmitting
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
          height="calc(100vh - 250px)"
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
  );
}
