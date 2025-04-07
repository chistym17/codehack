'use client';

import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';

interface MenuItemProps {
  active: boolean;
}

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuthContext();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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

              {isAuthenticated ? (
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500">
                    <span>{user?.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }: MenuItemProps) => (
                            <Link
                              href="/profile"
                              className={`${
                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }: MenuItemProps) => (
                            <button
                              onClick={logout}
                              className={`${
                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Link 
                  href="/auth"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}