import { rest } from 'msw';
import db from "./db.json";

export const handlers = [
  rest.get('https://api.com/heroes', (req, res, ctx) => {

    // successful response
    return res(ctx.status(200), ctx.json(db.superheroes), ctx.delay(30))
  }),
  rest.get('https://api.com/hero/:heroId', (req, res, ctx) => {
    const { heroId } = req.params
    // successful response
    return res(ctx.status(200), ctx.json(db.superheroes.filter(h => h.id === +heroId )[0]), ctx.delay(30))
  }),
  rest.post('https://api.com/hero', async (req, res, ctx) => {
    let newHeroes = db.superheroes;
    newHeroes.push(await req.json());
    // successful response
    return res(
      ctx.status(200),
      ctx.json(newHeroes),
      ctx.delay(30)
    )
  })
]