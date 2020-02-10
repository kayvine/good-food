import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";
import { SECRET } from "../config/config";
import { findByEmail } from "../users/user.service"
import { getPermissionFromRole } from "../core/roles";

export const authenticate = async ({ email, password }) => {
    try {
        const user = await findByEmail(email);
        if (!user) { throw Error('User not found!') }
        const valid = await compare(password, user.password);
        if (valid) {
            delete user.password;
            const payload = { ...user };
            // Get permissions
            payload.permissions = !user.roles === [] ? user.roles.map(getPermissionFromRole) : [];
            //log
            console.log('user.roles', user.roles);
            console.log('permissions', payload.permissions);
            return sign(payload, SECRET);
        } else {
            throw Error('The provided password is incorrect!');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}
