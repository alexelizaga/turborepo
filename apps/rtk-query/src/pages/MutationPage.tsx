import { useAddNewHeroMutation } from "../services"
import { HeroType } from '../interfaces';


export const MutationPage = () => {
  const [trigger, { data: heroes, isSuccess }] = useAddNewHeroMutation();

  const handleSubmit = () => {
    trigger({
      "id": 4,
      "name": "Ironman",
      "alterEgo": "Tony Stark"
    });
  }

  return (
    <>
      <button onClick={ handleSubmit }>Post</button>
      {
        isSuccess && heroes?.map( (h: HeroType) => {
          return <div key={h.name}>{h.name}</div>
        })
      }
    </>
  )
}
