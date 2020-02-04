import mongoose from 'mongoose';
import Base from '../core/base.model';

const userSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String,
        handle: String, // sort of username
    },
    email: String, // used for authentication
    password: String, // encrypted of course (bcrypt)
    role: [String], // EMPLOYEE, SYSTEM, USER, COOK, whatever you want as roles
});

const User = Base.discriminator('User', userSchema);

export default mongoose.model('User');

userSchema.statics.findByEmail = function (email) {
    return this.find({ email: email }).exec();
}
