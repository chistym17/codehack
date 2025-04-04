type Props = {
  params: {
    slug: string
  }
}

const problemDetails = {
  "two-sum": {
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 104",
      "-109 <= nums[i] <= 109",
      "-109 <= target <= 109"
    ]
  }
  // Add other problem details as needed
};

export default function ProblemPage({ params }: Props) {
  const problem = problemDetails[params.slug as keyof typeof problemDetails];

  if (!problem) {
    return <div>Problem not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
      <span className={`px-2 py-1 rounded-full text-sm ${
        problem.difficulty === "Easy" ? "bg-green-100 text-green-800" :
        problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
        "bg-red-100 text-red-800"
      }`}>
        {problem.difficulty}
      </span>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
        <p className="text-gray-700 dark:text-gray-300">{problem.description}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Examples</h2>
        {problem.examples.map((example, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p><strong>Input:</strong> {example.input}</p>
            <p><strong>Output:</strong> {example.output}</p>
            {example.explanation && (
              <p><strong>Explanation:</strong> {example.explanation}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Constraints</h2>
        <ul className="list-disc list-inside">
          {problem.constraints.map((constraint, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">{constraint}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 