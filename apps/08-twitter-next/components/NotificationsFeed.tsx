import React, { FC, useEffect } from 'react';
import { Notification } from '@prisma/client';
import { BsTwitter } from 'react-icons/bs';

import { useCurrentUser, useNotifications } from '@/hooks';

interface NotificationsFeedProps {

}

const NotificationsFeed: FC<NotificationsFeedProps> = () => {
  const { data: currentUser,  mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div
        className='
          text-neutral-600
          text-center
          text-xl
        '
      >
        No notifications
      </div>
    )
  }
  

  return (
    <div className='flex flex-col'>
      {fetchedNotifications.map((notification: Notification) => (
        <div
          key={notification?.id}
          className='
            flex
            flex-row
            items-center
            p-6
            gap-4
            border-b-[1px]
            border-neutral-800
          '
        >
          <BsTwitter color='white' size={32} />
          <p className='text-white'>
            {notification.body}
          </p>
        </div>
      ))}
    </div>
  )
}

export default NotificationsFeed;