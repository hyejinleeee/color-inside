'use client';

import { fetchDiaries } from '@/apis/diary';
import { DiaryList } from '@/types/diary.type';
import { fetchLocalDiariesByDate } from '@/utils/diaryLocalStorage';
import { useQuery } from '@tanstack/react-query';

const useDiaries = (year: number, month: number, isUserLoggedIn: boolean) => {
  const {
    data: diaries,
    isPending: isDiariesPending,
    error: diariesError
  } = useQuery<DiaryList>({
    queryKey: ['diaries', year, month],
    queryFn: () => fetchDiaries(year, month),
    staleTime: 1000 * 60 * 30, // 30분
    enabled: !!isUserLoggedIn
  });

  if (!isUserLoggedIn) {
    const diaries = fetchLocalDiariesByDate(year, month);

    return { diaries, isDiariesPending: false, diariesError: null };
  }

  return { diaries, isDiariesPending, diariesError };
};

export default useDiaries;
