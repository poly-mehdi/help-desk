import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  date: { type: Date, default: Date.now },
  appName: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled', 'On Hold'],
    default: 'Pending',
  },
});
