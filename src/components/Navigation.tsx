'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PawPrint, Menu, X, UserCircle, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Define types for the component props
interface User {
  name: string;
  profileImageUrl?: string;
}

interface NavigationProps {
  user: User | null;
}

const Navigation: React.FC<NavigationProps> = ({ user }) => {
  const { isLoggedIn, logout: handleLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: '홈' },
    { href: '/products', label: '고양이 용품' },
    { href: '/hospitals', label: '동물병원 찾기' },
    { href: '/community', label: '커뮤니티' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 text-pink-500 hover:text-pink-600 transition-colors">
              <PawPrint className="h-8 w-8" />
              <span className="font-bold text-2xl text-gray-800">냥커뮤</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-600 hover:text-pink-500 font-semibold transition-colors rounded-full px-4 py-2 hover:bg-pink-50">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-pink-500">
                  {user?.profileImageUrl ? (
                    <Image src={user.profileImageUrl} alt={user?.name || 'User profile'} width={32} height={32} className="rounded-full object-cover" />
                  ) : (
                    <UserCircle className="h-8 w-8 rounded-full text-gray-400" />
                  )}
                  <span className="font-semibold">{user?.name}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 font-semibold transition-colors rounded-full px-4 py-2 hover:bg-pink-50">
                  <LogOut size={18} />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 font-semibold transition-colors rounded-full px-4 py-2 hover:bg-pink-50">
                <LogIn size={18} />
                <span>로그인</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:bg-pink-100 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium">
                {link.label}
              </Link>
            ))}
            {/* User section - Mobile */}
            <div className="border-t border-gray-200 my-2 pt-2">
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="flex items-center space-x-3 text-gray-700 hover:bg-pink-100 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium">
                    {user?.profileImageUrl ? (
                      <Image src={user.profileImageUrl} alt={user?.name || 'User profile'} width={32} height={32} className="rounded-full object-cover" />
                    ) : (
                      <UserCircle className="h-8 w-8 rounded-full text-gray-400" />
                    )}
                    <span className="font-semibold">{user?.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left flex items-center space-x-2 text-gray-700 hover:bg-pink-100 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium">
                    <LogOut size={18} />
                    <span>로그아웃</span>
                  </button>
                </>
              ) : (
                <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:bg-pink-100 hover:text-pink-600 block px-3 py-2 rounded-md text-base font-medium">
                  <LogIn size={18} />
                  <span>로그인</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navigation
