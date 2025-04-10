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
    <nav className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md fixed w-full z-50 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-amber-500 flex items-center justify-center mr-3 shadow-lg shadow-teal-500/20 dark:shadow-teal-500/10 group-hover:shadow-amber-500/20 transition-all group-hover:rotate-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-amber-500 bg-clip-text text-transparent group-hover:from-teal-600 group-hover:to-amber-600 transition-all">
                  CodeHack
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              <Link
                href="/"
                className="text-slate-700 dark:text-slate-200 hover:text-teal-500 dark:hover:text-teal-400 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all font-medium"
              >
                Home
              </Link>
              <Link
                href="/problems"
                className="text-slate-700 dark:text-slate-200 hover:text-teal-500 dark:hover:text-teal-400 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all font-medium"
              >
                Problems
              </Link>

              {isAuthenticated ? (
                <Menu as="div" className="relative ml-4">
                  <Menu.Button className="flex items-center space-x-2 text-slate-700 dark:text-slate-200 hover:text-teal-500 dark:hover:text-teal-400 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all font-medium">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-amber-500 flex items-center justify-center mr-2 text-white font-medium text-sm">
                      {user?.name?.charAt(0)}
                    </div>
                    <span>{user?.name}</span>
                    <svg className="w-5 h-5 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-slate-800 rounded-xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 focus:outline-none overflow-hidden border border-slate-100 dark:border-slate-700">
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{user?.email}</p>
                        </div>
                        <Menu.Item>
                          {({ active }: MenuItemProps) => (
                            <Link
                              href="/profile"
                              className={`${active ? 'bg-slate-100 dark:bg-slate-700 text-teal-500 dark:text-teal-400' : 'text-slate-700 dark:text-slate-200'
                                } flex items-center px-4 py-3 text-sm transition-colors`}
                            >
                              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }: MenuItemProps) => (
                            <Link
                              href="/settings"
                              className={`${active ? 'bg-slate-100 dark:bg-slate-700 text-teal-500 dark:text-teal-400' : 'text-slate-700 dark:text-slate-200'
                                } flex items-center px-4 py-3 text-sm transition-colors`}
                            >
                              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <div className="border-t border-slate-200 dark:border-slate-700 mt-1"></div>
                        <Menu.Item>
                          {({ active }: MenuItemProps) => (
                            <button
                              onClick={logout}
                              className={`${active ? 'bg-slate-100 dark:bg-slate-700 text-rose-500' : 'text-slate-700 dark:text-slate-200'
                                } flex items-center w-full text-left px-4 py-3 text-sm transition-colors`}
                            >
                              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <div className="ml-4 flex items-center space-x-3">
                  <Link
                    href="/auth"
                    className="group relative inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg transition-all overflow-hidden"
                  >
                    <span className="relative z-10 text-white">Sign In</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-amber-500 group-hover:from-teal-600 group-hover:to-amber-600 transition-all"></div>
                    <div className="absolute inset-0 scale-0 group-hover:scale-100 rounded-lg transition-transform duration-300 origin-bottom-right">
                      <div className="h-full w-full bg-gradient-to-r from-amber-500 to-teal-500"></div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}