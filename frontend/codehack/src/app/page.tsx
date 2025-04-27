"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Code, BookOpen, Trophy, ChevronRight, ArrowRight } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-hidden').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const [stats, setStats] = useState({ problems: 0, users: 0, submissions: 0 });

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setStats(current => ({
        problems: Math.min(current.problems + 25, 500),
        users: Math.min(current.users + 500, 10000),
        submissions: Math.min(current.submissions + 50000, 1000000)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Navbar />

      <main className="pt-16">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 -right-40 w-96 h-96 rounded-full bg-teal-400 dark:bg-teal-600 opacity-10 blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 left-20 w-96 h-96 rounded-full bg-amber-400 dark:bg-amber-600 opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-60 left-1/4 w-64 h-64 rounded-full bg-rose-400 dark:bg-rose-600 opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
            <div className="text-center animate-hidden opacity-0 translate-y-8 transition duration-1000 ease-out"
              style={mounted ? { opacity: 1, transform: 'translateY(0)' } : {}}>
              <div className="inline-block mb-8 p-2 rounded-2xl bg-gradient-to-r from-teal-500 to-amber-500 rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white dark:bg-slate-800 px-6 py-2 rounded-xl">
                  <span className="text-slate-800 dark:text-slate-200 font-medium">New: Weekly coding contests now available!</span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-7xl font-bold text-slate-800 dark:text-white mb-8 tracking-tight">
                Master Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-amber-500">
                  {" "}Coding Skills
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of developers solving algorithmic challenges and improving their problem-solving abilities.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  href="/problems"
                  className="group relative bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:shadow-xl hover:shadow-teal-500/20 dark:hover:shadow-teal-400/10 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Coding Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </div>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 animate-hidden opacity-0 translate-y-8 transition duration-1000 ease-out delay-300"
              style={mounted ? { opacity: 1, transform: 'translateY(0)' } : {}}>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700">
                <div className="text-4xl font-bold text-teal-500 dark:text-teal-400 mb-2">{stats.problems}+</div>
                <div className="text-slate-700 dark:text-slate-300">Coding Problems</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700">
                <div className="text-4xl font-bold text-amber-500 dark:text-amber-400 mb-2">{stats.users.toLocaleString()}+</div>
                <div className="text-slate-700 dark:text-slate-300">Active Users</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700">
                <div className="text-4xl font-bold text-rose-500 dark:text-rose-400 mb-2">{stats.submissions.toLocaleString()}+</div>
                <div className="text-slate-700 dark:text-slate-300">Submissions</div>
              </div>
            </div>

            <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card animate-hidden opacity-0 translate-y-8 transition duration-700 ease-out delay-100"
                style={mounted ? { opacity: 1, transform: 'translateY(0)' } : {}}>
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700 h-full group hover:shadow-2xl hover:shadow-teal-500/10 dark:hover:shadow-teal-400/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-white">Practice</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Solve algorithmic challenges to improve your coding skills and problem-solving abilities through our interactive platform.
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <Link href="/practice" className="text-teal-500 dark:text-teal-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      Start practicing
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="feature-card animate-hidden opacity-0 translate-y-8 transition duration-700 ease-out delay-300"
                style={mounted ? { opacity: 1, transform: 'translateY(0)' } : {}}>
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700 h-full group hover:shadow-2xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-white">Learn</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Master different algorithms and data structures with our comprehensive learning resources and guided tutorials.
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <Link href="/learn" className="text-amber-500 dark:text-amber-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      Explore tutorials
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="feature-card animate-hidden opacity-0 translate-y-8 transition duration-700 ease-out delay-500"
                style={mounted ? { opacity: 1, transform: 'translateY(0)' } : {}}>
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700 h-full group hover:shadow-2xl hover:shadow-rose-500/10 dark:hover:shadow-rose-400/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-white">Compete</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Join contests and compete with other programmers to test your skills and climb the leaderboard in weekly challenges.
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <Link href="/compete" className="text-rose-500 dark:text-rose-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      Join competition
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-32 animate-hidden opacity-0 translate-y-8 transition duration-700 ease-out delay-200"
              style={mounted ? { opacity: 1, transform: 'translateY(0)' } : {}}>
              <div className="bg-gradient-to-r from-teal-500/10 to-amber-500/10 dark:from-teal-900/20 dark:to-amber-900/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Stay updated with coding tips</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-8">
                    Subscribe to our newsletter to receive weekly coding challenges, tips, and updates on new features.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 max-w-md w-full"
                    />
                    <button className="bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 text-white font-semibold px-6 py-4 rounded-xl transition-all whitespace-nowrap">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-teal-500 dark:text-teal-400 font-bold text-2xl mb-6">CodeHack</div>
            <p className="text-slate-600 dark:text-slate-400 mb-8">Helping developers become better problem solvers since 2023</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-slate-500 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}