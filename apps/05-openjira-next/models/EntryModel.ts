import moongose, { Model, Schema } from 'mongoose';

import { Entry } from '../interfaces';

export interface EntryInterface extends Entry {};

const entrySchema = new Schema({
  description: { type: String, require: true},
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE} is not a valid state',
    },
    default: 'pending'
  },
});

const EntryModel: Model<EntryInterface> = moongose.models.Entry || moongose.model('Entry', entrySchema);

export default EntryModel;