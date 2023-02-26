import { Grid } from "@nextui-org/react";
import { BcFavoriteCardPokemon } from "./BcFavoriteCardPokemon";


type Props = {
  pokemons: number[]
}

export const BcFavoritePokemons = ({ pokemons }: Props) => {

  

  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
      {
        pokemons.map( id => (
          <BcFavoriteCardPokemon key={id} pokemonId={id} />
        ))
      }
    </Grid.Container>
  )
}
