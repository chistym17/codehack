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

export interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
}
