'use client';

import { fetchUser } from '@/apis/user';
import { useQuery } from '@tanstack/react-query';

const useAuth = () => {
  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5분 동안

    refetchOnWindowFocus: true
  });

  return { user, isPending };
};

export default useAuth;
