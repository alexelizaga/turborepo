import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '@prisma/client';

import { serverAuth, prisma } from '@/libs';

type Data =
  | { name: string }
  | Post

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if(req.method !== 'POST' && req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;

    const { currentUser } = await serverAuth(req,res);

    if (typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })

    if (!post) {
      throw new Error('Invalid ID');
    }

    let updatedLikeIds = [...(post.likedIds || [])]

    if (req.method === 'POST') {
      updatedLikeIds.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId
          }
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: 'Someone linked your tweet!',
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
    }

    if (req.method === 'PATCH') {
      updatedLikeIds = updatedLikeIds.filter((likeId) => likeId !== currentUser.id);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        likedIds: updatedLikeIds
      }
    })

    return res.status(200).json(updatedPost)

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}