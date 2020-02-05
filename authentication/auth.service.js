import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";
import { SECRET } from "../config/config";
import { findByEmail } from "../users/user.service"

export const authenticate = async ({ email, password }) => {
    const user = await findByEmail(email);
    if (!user) { throw Error('User not found!') }
    const value = await compare(password, user.password);
    if (value) {
        user.permissions = [];
        delete user.password;
        return sign(user, SECRET);
    } else {
        throw Error('The provided password is incorrect!');
    }
}
