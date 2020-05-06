import { Schema } from 'mongoose';

export const baseSchema = {
  createdOn: { type: Date, default: Date.now },
  createdBy: { type: Schema.ObjectId, ref: 'User' },
  lastModifiedOn: Date,
  lastModifiedBy: { type: Schema.ObjectId, ref: 'User' },
  deletedOn: Date,
  deletedBy: { type: Schema.ObjectId, ref: 'User' },
};
