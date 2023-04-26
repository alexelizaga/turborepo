import { FC } from 'react';
import { useRouter } from 'next/router';

import { Header, UserBio, UserHero } from '@/components';
import { useUser } from '@/hooks';
import { ClipLoader } from 'react-spinners';


const UserView: FC = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div
        className='
          flex
          justify-center
          items-center
          h-full
        '
      >
        <ClipLoader color='Lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  )
}

export default UserView;