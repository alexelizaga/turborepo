import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

import { db } from "@/database";
import { EntryModel, EntryInterface } from "@/models";

type Data =
  | { message: string; }
  | EntryInterface
  | null;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid id: " + id });
  }

  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);

    default:
      return res.status(400).json({ message: "Invalid method" });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entryInDB = await EntryModel.findById(`${id}`);
  await db.disconnect();

  if (!entryInDB) {
    return res.status(400).json({ message: "Entry not found: " + id });
  }

  return res.status(200).json(entryInDB);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await EntryModel.findById(`${id}`);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: `Entry not found: ${id}`});
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updateEntry = await EntryModel.findByIdAndUpdate(
      `${id}`,
      { description: `${description}`, status: `${status}` },
      { runValidators: true, new: true }
    );
    return res.status(200).json(updateEntry);
  } catch (error: any) {
    console.log({error});
    return res.status(400).json({ message: error.errors.status.message });
  } finally {
    await db.disconnect();
  }
  
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await EntryModel.findById(`${id}`);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: `Entry not found: ${id}`});
  }

  try {
    await EntryModel.deleteOne({ _id: `${id}` });
    return res.status(200).json({ message: `Entry deleted successfully`});
  } catch (error: any) {
    console.log({error});
    return res.status(400).json({ message: error.errors.status.message });
  } finally {
    await db.disconnect();
  }
  
};