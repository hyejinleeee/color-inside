'use client';

import { fetchUser } from '@/apis/user';
import { useQuery } from '@tanstack/react-query';

const useAuth = () => {
  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    refetchOnWindowFocus: true
  });

  return { user, isPending };
};

export default useAuth;
