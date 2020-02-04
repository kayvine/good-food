import { hash } from 'bcryptjs';
import CrudRepository from '../core/crudRepository';
import User from './user.model';

// Pass along model to CRUD repository only once
const UserRepository = CrudRepository(User);

export const getUsers = UserRepository.getAll;

export const getUserById = UserRepository.getById;

export const createUser = (user) => {

    return hash(user.password, 2).then((hashed) => {
        user.password = hashed;

        return UserRepository.create(user);
    });
};

export const updateUser = (user) => {
    return getUserById(user.id).then((old) => {
        user.password = old.password;
        return UserRepository.update(user);
    });
};

export const removeUser = UserRepository.remove;
