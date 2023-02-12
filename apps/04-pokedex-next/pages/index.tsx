import { GetStaticProps, NextPage } from "next";
import { Grid } from "@nextui-org/react";

import { Layout, PokemonCard } from "../components";
import { pokeApi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces";


type Props = {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokemon List">
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map( (pokemon) => (
            <PokemonCard key={pokemon.id} {...pokemon}  />
          ))
        }
        
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }) )
  return {
    props: {
      pokemons
    }, // will be passed to the page component as props
  }
}

export default HomePage;