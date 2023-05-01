import type { NextApiRequest, NextApiResponse } from 'next';
import { Notification } from '@prisma/client';

import { prisma } from '@/libs';

type Data =
  | { name: string }
  | Notification[]

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const { userId } = req.query;

    if ( typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        hasNotification: false
      }
    });

    return res.status(200).json(notifications)
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }

}