import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import { EntryModel, EntryInterface } from '@/models';


export const getEntryById = async(id: string): Promise<EntryInterface | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();
  const entry = await EntryModel.findById(id).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(entry));
}