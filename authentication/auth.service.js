import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SECRET } from '../config/config';
import User from '../users/user.model';
import { getPermissionsFromRole } from '../core/roles';

export const authenticate = async ({ email, password }) => {
  const user = await User.findByEmail(email).lean();
  if (!user) {
    throw Error(`No user found with email ${email}`);
  }
  const valid = await compare(password, user.password);
  if (valid) {
    delete user.password;
    const payload = { ...user };
    // Get permissions
    payload.permissions = user.roles !== [] ? user.roles.map(getPermissionsFromRole) : [];
    //log
    console.log('user.roles', user.roles);
    console.log('payload', payload);
    return sign(payload, SECRET);
  } else {
    throw Error('The provided password is incorrect!');
  }
};
