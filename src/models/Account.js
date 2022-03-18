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
  firstName: String,
  lastName: String,
  dob: String,
  buildingName: String,
  buildingNumber: String,
  country: String,
  flatNumber: String,
  line1: String,
  line2: String,
  line3: String,
  postcode: String,
  state: String,
  street: String,
  subStreet: String,
  town: String,
});
schema.index({applicantId: 1, checkId: 1}, {unique: false});

export const Account = model('Account', schema);
