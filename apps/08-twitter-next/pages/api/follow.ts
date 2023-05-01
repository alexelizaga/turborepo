import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

import { serverAuth, prisma } from '@/libs';

type Data =
  | { name: string }
  | User

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST' && req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const { userId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (typeof userId !== 'string') {
      throw new Error('Invalid ID')
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new Error('Invalid ID')
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === 'POST') {
      updatedFollowingIds.push(userId);

      try {
        await prisma.notification.create({
          data: {
            body: 'Someone follow you',
            userId
          }
        })
        await prisma.user.update({
          where: {
            id: userId
          },
          data: {
            hasNotification: true
          }
        })
      } catch (error) {
        console.log(error);
      }

    }

    if (req.method === 'PATCH') {
      updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId)
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingIds: updatedFollowingIds
      }
    })

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }

}