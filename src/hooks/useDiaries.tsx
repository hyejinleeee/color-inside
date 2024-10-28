'use client';

import { fetchDiaries } from '@/apis/diary';
import { DiaryList } from '@/types/diary.type';
import { useQuery } from '@tanstack/react-query';

const useDiaries = (year: number, month: number) => {
  const {
    data: diaries,
    isPending: isDiariesPending,
    error: diariesError
  } = useQuery<DiaryList>({
    queryKey: ['diaries', year, month],
    queryFn: () => fetchDiaries(year, month),
    staleTime: 1000 * 60 * 30 // 30분
  });

  return { diaries, isDiariesPending, diariesError };
};

export default useDiaries;
