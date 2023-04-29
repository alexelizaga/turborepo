import { useCurrentUser, useLoginModal, useUser } from '@/hooks';
import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);


  const toggleFollows = useCallback( async () => {
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (isFollowing) {
          request = () => axios.patch('/api/follow', { userId });
        } else {
          request = () => axios.post('/api/follow', { userId});
        }

        await request();

        mutateCurrentUser();
        mutateFetchedUser();

        toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong');
      }
  }, [currentUser, isFollowing, loginModal, mutateCurrentUser, mutateFetchedUser, userId]);

  return {
    isFollowing,
    toggleFollows
  }
  
}

export default useFollow;