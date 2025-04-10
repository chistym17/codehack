export interface TestCase {
  input: string;
  output: string;
}

export interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
}

export interface SubmissionResponse {
  message: string;
  results: TestResult[];
  summary: {
    totalTests: number;
    passed: number;
    failed: number;
    firstFailedTest: number;
  };
}

export interface FunctionTemplate {
  default: string;
  boilerplate: string;
}

export interface Problem {
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

export type Language = 'python' | 'cpp' | 'c';
