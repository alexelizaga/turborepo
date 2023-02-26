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
    case "PUT":
      return updateEntry(req, res);

    default:
      return res.status(400).json({ message: "Invalid method" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await EntryModel.findById(`${id}`);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "Entry not found: " + id });
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
    await db.disconnect();
    return res.status(200).json(updateEntry);
  } catch (error: any) {
    console.log({error});
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
  
};
