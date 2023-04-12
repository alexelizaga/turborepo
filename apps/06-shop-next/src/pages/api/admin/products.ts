import type { NextApiRequest, NextApiResponse } from 'next';

import { IProduct } from '@/interfaces';
import { db } from '@/database';
import { Product } from '@/models';
import { isValidObjectId } from 'mongoose';

type Data =
  | { message: string }
  | IProduct[]
  | IProduct

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'PUT':
      return updateProduct(req, res);
    case 'POST':
      break;
  
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find()
    .sort({ title: 'asc' })
    .lean();
  await db.disconnect();

  // TODO: Update pictures

  return res.status(200).json(products);
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id = '', images = []} = req.body as IProduct;

  if ( !isValidObjectId(_id) ) {
    return res.status(400).json({ message: "The product id is invalid"});
  }

  if ( images.length < 2 ) {
    return res.status(400).json({ message: "You need at least two images"});
  }

  try {
    await db.connect();

    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      return res.status(400).json({ message: "There is no product with that id"});
    }

    // TODO: delete Cloudinary images

    await product.updateOne(req.body);
    await db.disconnect();

    return res.status(200).json( product );
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Review server logs"});
  }

}

