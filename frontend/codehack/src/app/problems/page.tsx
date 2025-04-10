"use client";
import Link from "next/link";
import problems from '../../../public/problems.json';
import { useState, useEffect } from 'react';

type DifficultyLevel = 'easy' | 'medium' | 'hard';
const difficultyColors = {
  easy: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-400' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-400' },
  hard: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-400' }
} as const;


export default function ProblemsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProblems = problems.filter(problem => {
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    const matchesSearch = problem.slug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const counts = {
    all: problems.length,
    easy: problems.filter(p => p.difficulty === 'easy').length,
    medium: problems.filter(p => p.difficulty === 'medium').length,
    hard: problems.filter(p => p.difficulty === 'hard').length
  };

  const difficultyColors = {
    easy: {
      bg: 'bg-teal-100 dark:bg-teal-900/40',
      text: 'text-teal-700 dark:text-teal-300',
      border: 'border-teal-200 dark:border-teal-800'
    },
    medium: {
      bg: 'bg-amber-100 dark:bg-amber-900/40',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-800'
    },
    hard: {
      bg: 'bg-rose-100 dark:bg-rose-900/40',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-200 dark:border-rose-800'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative mb-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-40 -right-20 w-80 h-80 rounded-full bg-teal-500 opacity-5 blur-3xl"></div>
            <div className="absolute -bottom-20 left-10 w-80 h-80 rounded-full bg-amber-500 opacity-5 blur-3xl"></div>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              Master Coding
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-amber-500">
                {" "}Challenges
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8">
              Browse through our collection of problems and improve your algorithmic thinking.
              From simple challenges to advanced algorithms, there's something for everyone.
            </p>
          </div>

          {/* Stats/Filters section */}
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${selectedDifficulty === 'all'
                  ? 'bg-gradient-to-br from-teal-500/10 to-amber-500/10 border-teal-200 dark:border-teal-800 shadow-lg'
                  : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800'
                  }`}
              >
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{counts.all}</span>
                <span className={`text-sm font-medium ${selectedDifficulty === 'all'
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-slate-600 dark:text-slate-400'
                  }`}>
                  All Problems
                </span>
              </button>

              <button
                onClick={() => setSelectedDifficulty('easy')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${selectedDifficulty === 'easy'
                  ? 'bg-teal-500/10 border-teal-200 dark:border-teal-800 shadow-lg'
                  : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800'
                  }`}
              >
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{counts.easy}</span>
                <span className={`text-sm font-medium ${selectedDifficulty === 'easy'
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-slate-600 dark:text-slate-400'
                  }`}>
                  Easy
                </span>
              </button>

              <button
                onClick={() => setSelectedDifficulty('medium')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${selectedDifficulty === 'medium'
                  ? 'bg-amber-500/10 border-amber-200 dark:border-amber-800 shadow-lg'
                  : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-800'
                  }`}
              >
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{counts.medium}</span>
                <span className={`text-sm font-medium ${selectedDifficulty === 'medium'
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-slate-600 dark:text-slate-400'
                  }`}>
                  Medium
                </span>
              </button>

              <button
                onClick={() => setSelectedDifficulty('hard')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${selectedDifficulty === 'hard'
                  ? 'bg-rose-500/10 border-rose-200 dark:border-rose-800 shadow-lg'
                  : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-800'
                  }`}
              >
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{counts.hard}</span>
                <span className={`text-sm font-medium ${selectedDifficulty === 'hard'
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-slate-600 dark:text-slate-400'
                  }`}>
                  Hard
                </span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-3 bottom-9 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl px-10 py-3 w-full md:min-w-[300px] shadow-sm hover:border-teal-400 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <svg className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-900/60">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-24">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((problem) => (
                    <tr key={problem.sid} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm">
                          {problem.sid}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/problems/${problem.slug}/solve`}
                          className="group flex items-center text-lg font-medium text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        >
                          {problem.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          <svg className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">

                          {problem.slug.length > 25 ? 'Solve this algorithmic challenge and improve your coding skills.' : 'A quick problem to test your fundamental coding knowledge.'}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border ${difficultyColors[problem.difficulty as DifficultyLevel].bg} ${difficultyColors[problem.difficulty as DifficultyLevel].text} ${difficultyColors[problem.difficulty as DifficultyLevel].border}`}
                        >
                          {problem.difficulty === 'easy' && (
                            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {problem.difficulty === 'medium' && (
                            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          )}
                          {problem.difficulty === 'hard' && (
                            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          )}
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                      <div className="flex flex-col items-center">
                        <svg className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-medium">No problems found matching your criteria</p>
                        <p className="text-sm mt-2">Try adjusting your search or filter settings</p>
                        <button
                          onClick={() => {
                            setSelectedDifficulty('all');
                            setSearchQuery('');
                          }}
                          className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-700">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-medium text-slate-700 dark:text-slate-300">{filteredProblems.length}</span> of <span className="font-medium text-slate-700 dark:text-slate-300">{problems.length}</span> problems
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50" disabled={true}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 font-medium">
                1
              </button>
              <button className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}


