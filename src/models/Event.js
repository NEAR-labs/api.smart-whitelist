import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
  checkId: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  event: String,
  eventTimestamp: Date,
  processed: Boolean,
});

export const Event = model('Event', schema);
