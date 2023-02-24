import moongose, { Model, Schema } from 'mongoose';

import { Entry } from '../interfaces';

interface EntryInterface extends Entry {};

const entrySchema = new Schema({
  description: { type: String, require: true},
  createAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE} is not a valid state'
    }
  },
});

const EntryModel: Model<EntryInterface> = moongose.models.Entry || moongose.model('Entry', entrySchema);

export default EntryModel;