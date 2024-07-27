'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useZustandStore from '@/zustand/zustandStore';

const CheckEditMode = ({ children }: { children: React.ReactNode }) => {
  const { isDiaryEditMode } = useZustandStore();
  const router = useRouter();

  useEffect(() => {
    if (!isDiaryEditMode) {
      router.replace('/');
    }
  }, [isDiaryEditMode, router]);

  if (!isDiaryEditMode) {
    return null;
  }

  return <>{children}</>;
};

export default CheckEditMode;
