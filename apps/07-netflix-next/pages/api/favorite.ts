import type { NextApiRequest, NextApiResponse } from 'next'
import { without } from 'lodash';
import { User } from '@prisma/client';

import { prismadb, serverAuth } from '@/libs';

type Data =
  | { name: string }
  | User

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId
        }
      })

      if (!existingMovie) throw new Error('Invalid Id');

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || ''
        },
        data: {
          favoriteIds: {
            push: movieId
          }
        }
      });

      return res.status(200).json(user);
    }

    if (req.method === 'PUT') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId
        }
      });

      if (!existingMovie) throw new Error('Invalid Id');

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || ''
        },
        data: {
          favoriteIds: updatedFavoriteIds
        }
      })

      res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}