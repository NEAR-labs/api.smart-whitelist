import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
  url: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  id: String,
  token: String,
  webhookTimestamp: Date,
});

export const Webhook = model('Webhook', schema);
