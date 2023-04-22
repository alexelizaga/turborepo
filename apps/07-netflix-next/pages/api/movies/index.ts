import type { NextApiRequest, NextApiResponse } from 'next';
import { Movie } from '@prisma/client';

import { prismadb, serverAuth } from "@/libs";

type Data =
  | { message: string }
  | Movie[]

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  if ( req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);
    const movies = await prismadb.movie.findMany();
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }

}