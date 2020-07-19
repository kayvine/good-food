import { hash } from 'bcryptjs';
import User from './user.model';
import CRUD from '../core/crudRepository';

// Pass along model to CRUD repository only once
const CrudRepository = CRUD(User);

export const getUsers = CrudRepository.getAll;

export const getUserById = CrudRepository.getById;

export const userExists = async (user) => {
  const value = await User.findByEmail(user.email);
  console.log('value', value);
  return value ? true : false;
};

export const createUser = async (requestor, user) => {
  console.log('requestor', requestor);
  try {
    if (user.name.first && user.name.last && !user.name.handle) {
      user.name.handle = user.name.last.substring(0, 4) + user.name.first.substring(0, 2);
    }
    const hashed = await hash(user.password, 8);
    user.password = hashed;
    user.createdBy = requestor ? requestor._id : null;
    const newUser = await User.create(user);
    delete newUser.password;
    // console.log('new user', newUser);
    return newUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateUser = async (requestor, id, user) => {
  try {
    if (user.password) {
      const hashed = await hash(user.password, 8);
      user.password = hashed;
    }
    user.lastModifiedOn = Date.now(); // use moment.js
    user.lastModifiedBy = requestor ? requestor._id : null;
    // console.log('id', id);
    // console.log('user', user);
    return CrudRepository.update(id, user);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// export const removeUser = async (requestor, id) => {
//     try {
//         const user = await getUserById(id);
//         user.deletedOn = Date.now();
//         user.deletedBy = requestor.toString();
//         return CrudRepository.update(id, user);
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// };
