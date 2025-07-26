'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import React, { useState } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Note: Metadata is usually for Server Components, but we'll keep it for now.
// export const metadata: Metadata = {
//   title: "냥커뮤 - 고양이 집사들을 위한 공간",
//   description: "고양이 용품 추천, 동물병원 찾기, 집사 커뮤니티를 한 곳에서 만나보세요!",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = {
    name: '집사님',
    profileImageUrl: '',
  };

  const handleLogin = () => {
    console.log('Login triggered in RootLayout');
    setIsLoggedIn(true);
  };
  const handleLogout = () => setIsLoggedIn(false);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // @ts-expect-error: handleLogin prop is passed to children
      return React.cloneElement(child, { handleLogin });
    }
    return child;
  });

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pink-50`}>
        <Navigation isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />
        <main className="pt-16">{childrenWithProps}</main>
      </body>
    </html>
  );
}
