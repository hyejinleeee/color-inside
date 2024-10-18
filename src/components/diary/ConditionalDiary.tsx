'use client';

import useAuth from '@/hooks/useAuth';
import React from 'react';
import GuestDiaryContainer from './GuestDiaryContainer';
import UserDiaryContainer from './UserDiaryContainer';

const ConditionalDiary = () => {
  const { user } = useAuth();

  if (user) {
    return <UserDiaryContainer />;
  } else {
    return <GuestDiaryContainer />;
  }
};

export default ConditionalDiary;
