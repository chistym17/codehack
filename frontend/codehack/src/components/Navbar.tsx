import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                CodeHack
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link 
                href="/"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/problems"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              >
                Problems
              </Link>
              <Link 
                href="/leaderboard"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              >
                Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 