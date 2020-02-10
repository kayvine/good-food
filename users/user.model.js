import { Schema, model } from 'mongoose';
import { baseSchema } from '../core/baseSchema';

const userSchema = {
    name: {
        first: String,
        last: String,
        handle: String, // sort of username
    },
    email: String, // used for authentication
    password: String, // encrypted of course (bcrypt)
    roles: [String], // EMPLOYEE, SYSTEM, USER, COOK, whatever you want as roles
    ...baseSchema
};

export default model('User', new Schema(userSchema));
