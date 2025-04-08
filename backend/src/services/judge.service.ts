import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface TestCase {
  input: string;
  output: string;
}

interface Problem {
  test_cases: TestCase[];
}

interface TestResult {
  testCaseNumber: number;
  input: string;
  expected_output: string;
  actual_output: string;
  passed: boolean;
  status: string;
  error: string | null;
}

interface SubmissionSummary {
  totalTests: number;
  passed: number;
  failed: number;
  firstFailedTest: number | null;
}

interface LanguageInfo {
  id: number;
  extension: string;
}

type LanguageMap = {
  [key in 'python' | 'cpp' | 'c']: LanguageInfo;
};

const languageMap: LanguageMap = {
  python: { id: 71, extension: '.py' },
  cpp: { id: 54, extension: '.cpp' },
  c: { id: 50, extension: '.c' },
};

async function submitTestCase(
  fullCode: string,
  language: string,
  input: string,
  output: string,
  testCaseNumber: number
): Promise<TestResult> {
  const languageInfo = languageMap[language.toLowerCase() as keyof LanguageMap];
  if (!languageInfo) {
    throw new Error('Unsupported language');
  }

  const submissionRes = await axios.post(
    `https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true`,
    {
      source_code: fullCode,
      language_id: languageInfo.id,
      stdin: input,
      expected_output: output
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        'x-rapidapi-host': process.env.RAPIDAPI_HOST || ''
      }
    }
  );

  const result = submissionRes.data;
  const passed = result.status.id === 3 && result.stdout?.trim() === output.trim();

  return {
    testCaseNumber,
    input,
    expected_output: output,
    actual_output: result.stdout || '',
    passed,
    status: passed ? 'Passed' : 'Failed',
    error: result.stderr || result.compile_output || null
  };
}

export async function submitSolution(
  fullCode: string,
  language: string,
  problem: Problem
): Promise<{
  message: string;
  summary: SubmissionSummary;
  results: TestResult[];
}> {
  const results: TestResult[] = [];
  let failedTestCase: number | null = null;

  for (let i = 0; i < problem.test_cases.length; i++) {
    const testCase = problem.test_cases[i];
    const result = await submitTestCase(
      fullCode,
      language,
      testCase.input,
      testCase.output,
      i + 1
    );

    results.push(result);
    if (!result.passed && failedTestCase === null) {
      failedTestCase = i + 1;
    }
  }

  const summary = {
    totalTests: results.length,
    passed: results.filter(r => r.passed).length,
    failed: results.filter(r => !r.passed).length,
    firstFailedTest: failedTestCase
  };

  return {
    message: 'All test cases processed.',
    summary,
    results
  };
}
