import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import { Billboard, InfoModal, MovieList, Navbar } from '@/components';
import { useFavorites, useInfoModal, useMovieList } from '@/hooks';

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
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending now' data={movies}  />
        <MovieList title='My List' data={favorites}  />
      </div>
    </>
  );
}

export default Home;