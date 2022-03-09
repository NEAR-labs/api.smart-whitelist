import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
  accountId: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  sessionToken: String,
  sessionTokenTimestamp: Date,
  publicKey: String,
  status: String,
  applicantId: String,
  sdkToken: String,
  sdkTokenTimestamp: Date,
  checkId: String,
  checkResult: String,
  checkStartTimestamp: Date,
  checkFinishTimestamp: Date,
  email: String,
});
schema.index({applicantId: 1, checkId: 1}, {unique: false});

export const Account = model('Account', schema);
