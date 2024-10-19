'use client';

import useAuth from '@/hooks/useAuth';
import React from 'react';
import GuestDiaryContainer from './GuestDiaryContainer';
import UserDiaryContainer from './UserDiaryContainer';
import { useParams, useSearchParams } from 'next/navigation';
import { DiaryContainerProps } from '@/types/diary.type';

const ConditionalDiary = () => {
  const params = useParams();
  const diaryId = params.id as string;
  const searchParams = useSearchParams();

  const form = searchParams.get('form');
  const YYMM = searchParams.get('YYMM');

  const commonProps: DiaryContainerProps = {
    diaryId,
    form,
    YYMM
  };

  const { user } = useAuth();

  if (user) {
    return <UserDiaryContainer {...commonProps} />;
  } else {
    return <GuestDiaryContainer {...commonProps} />;
  }
};

export default ConditionalDiary;
