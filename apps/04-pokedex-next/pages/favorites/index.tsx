import { NextPage } from 'next';

import { BcFavoritePokemons, BcNoFavorites, Layout } from '../../components';
import { useEffect, useState } from 'react';
import { localFavorites } from '../../utils';


const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);
  
  
  return (
    <Layout title="Favorites">
      {
        favoritePokemons.length === 0
          ? ( <BcNoFavorites /> )
          : (
            <BcFavoritePokemons pokemons={favoritePokemons} />
          )
      }
    </Layout>
  )
}

export default FavoritesPage;