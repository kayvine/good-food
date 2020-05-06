import { Schema, model } from 'mongoose';
import { baseSchema } from '../core/baseSchema';

const userSchema = new Schema({
  name: {
    first: String,
    last: String,
    handle: String, // sort of username
  },
  email: String, // used for authentication
  password: String, // encrypted of course (bcrypt)
  roles: [String], // EMPLOYEE, SYSTEM, USER, COOK, whatever you want as roles
  ...baseSchema,
});

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

export default model('User', userSchema);
