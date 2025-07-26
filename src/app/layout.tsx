'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

// Note: Metadata is usually for Server Components, but we'll keep it for now.
// export const metadata: Metadata = {
//   title: "냥커뮤 - 고양이 집사들을 위한 공간",
//   description: "고양이 용품 추천, 동물병원 찾기, 집사 커뮤니티를 한 곳에서 만나보세요!",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const user = {
    name: '집사님',
    profileImageUrl: '',
  };

  return (
    <html lang="ko">
      <AuthProvider>
        <body className={`${inter.variable} antialiased bg-pink-50`}>
          <Navigation user={user} />
          <main className="pt-16">{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
}
