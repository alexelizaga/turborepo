import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

import { serverAuth, prisma } from '@/libs';


type Data =
  | { name: string }
  | User

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if(req.method !== 'PATCH') return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);
    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username ) {
      throw new Error('Missing filds');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage
      }
    })

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}