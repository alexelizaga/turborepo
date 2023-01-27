import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from "next/image";
import { Button, Card, Container, Grid, Text } from "@nextui-org/react";

import { Layout } from "../../components";
import { pokeApi } from "../../api";
import { PokemonListResponse, PokemonResponse } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils"


type Props = {
  pokemon: PokemonResponse,
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

  const onToggleFavorite = (pokeId: number) => {
    localFavorites.toggleFavorite(pokeId);
    setIsInFavorites(prev => !prev);
  }

  return (
    <Layout title={pokemon.name} logo={pokemon.sprites.front_default}>
      <Grid.Container css={{ pt: '5px' }} gap={2}>
        <Grid xs={12} sm={4} >
          <Card isHoverable css={{ p: '30px'}}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8} >
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">{ pokemon.name }</Text>
              <Button
                color="gradient"
                bordered={!isInFavorites}
                onClick={() => onToggleFavorite(pokemon.id)}
              >
                <Text>{ isInFavorites ? 'In Favorites' : 'Save in favorites' }</Text>
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  height={100}
                  width={100}
                />
              </Container>

            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemonNames: string[] = data.results.map(pokemon => pokemon.name);
  return {
    paths: pokemonNames.map((name) => ({
      params: { name }
    })),
    // fallback: false
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      pokemon
    }, // will be passed to the page component as props
    revalidate: 86400
  }
}

export default PokemonByNamePage;