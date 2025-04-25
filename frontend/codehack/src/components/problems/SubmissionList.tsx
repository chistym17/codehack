import React, { useEffect, useState } from 'react';

interface Submission {
  id: number;
  code: string;
  status: string;
  createdAt: string;
}

interface SubmissionListProps {
  userId: number;
  problemId: number;
}

const submissionCache: Record<string, { data: Submission[]; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000;

const SubmissionList: React.FC<SubmissionListProps> = ({ userId, problemId }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cacheKey = `${userId}-${problemId}`;
    const now = Date.now();
    const cached = submissionCache[cacheKey];
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      setSubmissions(cached.data);
      setLoading(false);
      return;
    }
    const fetchSubmissions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/${userId}/${problemId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (Array.isArray(data)) {
          setSubmissions(data);
          submissionCache[cacheKey] = { data, timestamp: Date.now() };
        } else {
          setSubmissions([]);
        }
      } catch (err: any) {
        setError('Unable to fetch submissions. Please try again later.');
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    if (userId && problemId) fetchSubmissions();
  }, [userId, problemId]);

  if (loading) return <div>Loading submissions...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (submissions.length === 0) return <div>No submissions found for this problem.</div>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Your Submissions</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 font-semibold">Status</th>
              <th className="px-4 py-2 font-semibold">Time</th>
              <th className="px-4 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">
                  <span className={`font-semibold px-2 py-1 rounded-full text-xs
                    ${sub.status.toLowerCase() === 'accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border border-red-400'}`}
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-300 font-mono">
                  {new Date(sub.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => navigator.clipboard.writeText(sub.code)}
                  >
                    Copy Code
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionList;
