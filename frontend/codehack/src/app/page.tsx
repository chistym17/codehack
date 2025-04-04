import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-16">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
            <div className="text-center">
              <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-8">
                Master Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}Coding Skills
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                Join thousands of developers solving algorithmic challenges and improving their problem-solving abilities.
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  href="/problems"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 hover:shadow-lg"
                >
                  Start Coding Now
                </Link>
                <Link 
                  href="/leaderboard"
                  className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 hover:shadow-lg border border-gray-200"
                >
                  View Leaderboard
                </Link>
              </div>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-300">Coding Problems</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-500 mb-2">10K+</div>
                <div className="text-gray-600 dark:text-gray-300">Active Users</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-500 mb-2">1M+</div>
                <div className="text-gray-600 dark:text-gray-300">Submissions</div>
              </div>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all hover:scale-105">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Practice</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Solve algorithmic challenges to improve your coding skills and problem-solving abilities.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all hover:scale-105">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Learn</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Master different algorithms and data structures with our comprehensive learning resources.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all hover:scale-105">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Compete</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Join contests and compete with other programmers to test your skills and climb the leaderboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
