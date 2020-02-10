import { hash } from 'bcryptjs';
import User from './user.model';
import CRUD from '../core/crudRepository';
import UserRepository from './user.repository';

// Pass along model to CRUD repository only once
const CrudRepository = CRUD(User);

export const getUsers = CrudRepository.getAll;

export const getUserById = CrudRepository.getById;

export const findByEmail = UserRepository.findByEmail;

export const userExists = async (user) => {
    const value = await findByEmail(user.email);
    return value ? true : false;
}

export const createUser = async (requestor, user) => {
    console.log('requestor', requestor)
    try {
        if (user.name.first && user.name.last && !user.name.handle) {
            user.name.handle = user.name.last.substring(0, 4) + user.name.first.substring(0, 2);
        }
        const hashed = await hash(user.password, 2);
        user.password = hashed;
        user.createdOn = Date.now();
        user.createdBy = requestor._id;
        const newUser = await CrudRepository.create(user);
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
            const hashed = await hash(user.password, 2);
            user.password = hashed;
        }
        user.lastModifiedOn = Date.now(); // use moment.js
        user.lastModifiedBy = requestor.toString();
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
