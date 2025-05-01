'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/providers/AuthProvider';

const demoAccount = {
  email: 'demo@codehack.com',
  password: 'demo123'
};

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/problems';
  const { login, isAuthenticated } = useAuthContext();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      ...(isLogin ? {} : { name: formData.get('name') as string })
    };

    try {
      const endpoint = isLogin ? '/api/auth/signin' : '/api/auth/signup';
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      login(result);
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      router.push(redirect);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(demoAccount)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      login(result);
      toast.success('Welcome to the demo account!');
      router.push(redirect);
    } catch (error) {
      toast.error('Failed to login with demo account');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    router.push(redirect);
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16 px-4">
      <div className="max-w-md mx-auto pt-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {isLogin ? 'Sign in to continue coding' : 'Join our coding community'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required={!isLogin}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col items-center space-y-4 mt-6">
              <div className="w-full flex flex-col items-center">
                <button
                  onClick={handleDemoLogin}
                  disabled={loading}
                  className={`w-full flex items-center justify-center py-4 px-6 border-2 border-teal-500 rounded-xl shadow-lg text-lg font-bold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400 transition-all duration-300 transform hover:scale-105 relative animate-pulse ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ boxShadow: '0 0 16px 4px #14b8a6' }}
                >
                  <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
                  Demo Account
                  <span className="ml-2 px-2 py-0.5 bg-teal-400 text-teal-900 text-xs rounded-full font-semibold animate-bounce">Try Instantly</span>
                </button>
                <span className="mt-2 text-xs text-teal-700 font-medium">No signup required. Experience all features instantly!</span>
              </div>
              <div className="flex justify-center w-full space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Signing in...' : isLogin ? 'Sign in' : 'Create account'}
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
