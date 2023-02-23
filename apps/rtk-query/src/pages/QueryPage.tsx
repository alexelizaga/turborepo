import { FC } from "react";
import { useSelector } from "react-redux";
import { useGetHeroesQuery, useLazyGetHeroByIdQuery } from "../services"
import { heroesApi } from '../services/heroesApi';
import { HeroType } from '../interfaces';


export const QueryPage = () => {
  const { data: heroes } = useGetHeroesQuery(undefined, {
    // refetchOnMountOrArgChange: 60,
    // refetchOnMountOrArgChange: true, // refetch cuando se monta el componente
    // refetchOnFocus: true, // refetch cuando el foco está sobre el componente
    // refetchOnReconnect: true, // refetch cuando recupera la conexión
    // pollingInterval:  3000 // refetch cada cierto tiempo
    // skip: true // isUninitialized = true
  });

  const [_, { data: hero }] = useLazyGetHeroByIdQuery();

  return (
    <>
      <h2>Query Page</h2>
      <hr />
      {
        heroes?.map(h => {
          return <Hero key={h.name} hero={h} />
        })
      }
      <hr />
      <div>{hero?.name}</div>
    </>
    
  )
}

const Hero: FC<{hero: HeroType}> = ({ hero }) => {
  const [trigger] = useLazyGetHeroByIdQuery();
  const { isSuccess } = useSelector(heroesApi.endpoints.getHeroById.select(+hero.id!))

  return (
    <div
      className={ isSuccess ? "link-sucess": ""}
      onClick={() => trigger(+hero.id!)}
    >
      {hero?.name}
    </div>
  )
}