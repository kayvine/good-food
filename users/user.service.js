import { hash } from 'bcryptjs';
import User from './user.model';
import CRUD from '../core/crudRepository';
import UserRepository from './user.repository';

// Pass along model to CRUD repository only once
const CrudRepository = CRUD(User);

// export const getUsers = CrudRepository.getAll;

// export const getUserById = CrudRepository.getById;

export const findByEmail = UserRepository.findByEmail;

export const userExists = async (user) => {
    const value = await findByEmail(user.email);
    return value ? true : false;
}

export const createUser = async (user) => {
    try {
        const hashed = await hash(user.password, 2);
        user.password = hashed;
        return CrudRepository.create(user);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// export const updateUser = async (user) => {

//     User.findById(user.id).then((old) => {
//         user.password = old.password;
// return user.update see mongoose
//     return UserRepository.update(user);
// });
// };

// export const removeUser = CrudRepository.remove;
