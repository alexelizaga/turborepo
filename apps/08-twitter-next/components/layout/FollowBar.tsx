import { FC } from 'react';
import { User } from '@prisma/client';

import { useUsers } from '@/hooks';
import { Avatar } from '@/components';

const FollowBar: FC = () => {
  const { data: users = [] } = useUsers();

  if (users.lenght === 0) return null;

  return (
    <div className='px-6 py-4 hidden lg:block'>
      <div className='bg-neutral-800 rounded-xl p-4'>
        <h2 className='text-white text-xl font-semibold'>Who to follow</h2>
        <div className='flex flex-col gap-6 mt-4'>
          { users.map((user: User) => (
            <div key={user.id}
              className='flex flex-row gap-4'
            >
              <Avatar userId={user.id} isLarge={false} hasBorder={false} />
              <div className='flex flex-col'>
                <p className='
                  text-white
                  font-semibold
                  text-sm
                '>
                  { user.name }
                </p>
                <p className='
                  text-neutral-400
                  text-sm
                '>
                  @{ user.username }
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FollowBar