import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import { Billboard, Navbar } from '@/components';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Home = () => {
  return (
    <>
      <Navbar />
      <Billboard />
    </>
  );
}

export default Home;