import type { NextApiRequest, NextApiResponse } from 'next';
import { Comment } from '@prisma/client';

import { serverAuth, prisma } from '@/libs';

type Data =
  | { name: string }
  | Comment

export default async function handle (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);
    const { body } = req.body;
    const { postId } = req.query;

    if ( typeof postId !== 'string') {
      throw new Error('');
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      }
    });

    return res.status(200).json(comment)
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }

}