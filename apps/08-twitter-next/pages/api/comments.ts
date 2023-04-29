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

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId
        }
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: 'Someone reply to your tweet!',
            userId: post.userId
          }
        });
        await prisma.user.update({
          where: {
            id: post.userId
          },
          data: {
            hasNotification: true
          }
        })
      }
    } catch (error) {
      console.log(error);
    }

    return res.status(200).json(comment)
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }

}