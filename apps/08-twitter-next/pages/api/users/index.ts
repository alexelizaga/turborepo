import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

import { prisma } from '@/libs';

type Data =
  | { name: string }
  | User[]

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }

}