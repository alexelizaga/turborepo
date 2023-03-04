import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';

export const getProductBySlug = async(slug: string): Promise<IProduct | null> => {

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product ) {
    return null
  };

  return JSON.parse(JSON.stringify(product));
}

type ProductSlug = {
  slug: string;
}

export const getAllProductsSlugs = async(): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select("slug -_id").lean();
  await db.disconnect();

  return slugs;
}

export const getProductsByTerm = async( term: string ): Promise<IProduct[]> => {
  term = term.toString().toLowerCase();

  db.connect();
  const products = await Product.find({
    $text: { $search: `${term}` }
  })
  .select("title images price inStock slug -_id")
  .lean();
  db.disconnect();

  return products;
}