'use client'

import HomePage from '@/components/HomePage';
import LoggedInHome from '@/components/LoggedInHome';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isLoggedIn, login } = useAuth();

  return isLoggedIn ? <LoggedInHome /> : <HomePage handleLogin={login} />;
}

