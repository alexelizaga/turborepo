import type { NextApiRequest, NextApiResponse } from 'next';
import { prismadb, serverAuth } from '@/libs';
import { Movie } from '@prisma/client';

type Data =
  | { name: string }
  | Movie

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') return res.status(405).end();
  
  try {
    await serverAuth(req, res);

    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex
    });

    return res.status(200).json(randomMovies[0])
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }

}