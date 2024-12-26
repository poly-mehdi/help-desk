import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
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

UserSchema.pre('save', function (next) {
  if (!this.username || !this.name || !this.email) {
    return next(
      new Error('Validation failed: username, name, and email are required.'),
    );
  }
  next();
});

export { UserSchema };
