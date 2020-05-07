import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SECRET } from '../config/config';
import { User } from '../users/user.model';
import { getPermissionFromRole } from '../core/roles';

export const authenticate = async ({ email, password }) => {
  try {
    console.log(email, password)
    const user = await User.findByEmail(email);
    if (!user) {
      throw Error('User not found!');
    }
    const valid = await compare(password, user.password);
    if (valid) {
      delete user.password;
      const payload = {
        ...user,
      };
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
};
