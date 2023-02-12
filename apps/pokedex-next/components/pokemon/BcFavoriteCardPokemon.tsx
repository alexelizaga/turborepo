import { FC } from "react"
import { useRouter } from "next/router"
import { Card, Grid } from "@nextui-org/react"


type Props = {
  pokemonId: number
}

export const BcFavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {
  const router = useRouter();

  const onClick = (id: number) => {
    router.push(`/pokemon/${id}`);
  }

  return (
    <Grid key={pokemonId} xs={6} sm={3} md={2} xl={1}>
      <Card
        isHoverable
        isPressable
        css={{ p: 10 }}
        onClick={ () => onClick(pokemonId) }
      >
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          width='100%'
          height={140}
        />
      </Card>
    </Grid>
  )
}
