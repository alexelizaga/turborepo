// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/database';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({
      ok: false,
      message: 'Does not have access to this service',
    })
  }

  await db.connect();




  await db.disconnect();

  res.status(200).json({
    ok: true,
    message: 'Process done correctly'
  })
}
