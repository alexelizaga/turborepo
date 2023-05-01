import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { Header, NotificationsFeed } from '@/components';


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session))
    }
  }
}

const Notifications: FC = () => {
  return (
    <>
      <Header label='Notifications' showBackArrow />
      <NotificationsFeed />
    </>
  )
}

export default Notifications;