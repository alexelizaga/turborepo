import { useLazyGetHeroesQuery } from "../services";


export const LazyQueryPage = () => {
  const [trigger, {data: lazyHeroes, isUninitialized}] = useLazyGetHeroesQuery({
    // refetchOnMountOrArgChange: 60,
    // refetchOnMountOrArgChange: true, // refetch cuando se monta el componente
    // refetchOnFocus: true, // refetch cuando el foco está sobre el componente
    // refetchOnReconnect: true, // refetch cuando recupera la conexión
    // pollingInterval:  3000 // refetch cada cierto tiempo
    // skip: true // isUninitialized = true
  });

  if (isUninitialized) {
    return(
      <button onClick={() => trigger()}>Fetch</button>
    )
  }

  return (
    <>
      <h2>LazyQuery Page</h2>
      <hr />
      {
        lazyHeroes?.map(h => {
          return <div key={h.name}>{h.name}</div>
        })
      }
    </>
  )
}
