import { userExists } from "../users/user.service";
/**
 * For the name of the user, the first or lastname are only required if 
 * the handle is not filled in and vice versa. If first and last are filled in, 
 * but not handle,  the handle is generated from the first and last name 
 * (e.g. 4 letters of lastname, 2 letters of first)
 */
export const isValidForCreation = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const errors = [];

    if (name.first && name.last && !name.handle) {
        name.handle = name.last.substring(0, 4) + name.first.substring(0, 2);
    }

    if ((name.first || name.last) && !name.handle) {
        errors.push({ level: 'error', code: 'USR0001', message: 'Either fullname or handle is mandatory' });
    }

    if (!email) {
        errors.push({ level: 'error', code: 'USR0002', message: 'email is mandatory' });
    }

    if (!password) {
        errors.push({ level: 'error', code: 'USR0003', message: 'password is mandatory' });
    }

    const exists = await userExists(req.body);
    if (exists) {
        errors.push({ level: 'error', code: 'USR0010', message: `A user with email ${email} already exists` });
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
    } else {
        console.log('isValidForCreation!')
        next();
    }
};

export const isValidForEditing = (req, res, next) => {
    // const user = req.body;
    // const errors = [];

    // if (req.user.id !== req.params.id) {
    //     errors.push({ level: 'error', code: 'USR0004', message: 'You cheecky bastard, trying to change someone elses stuff' });
    // }

    // if (!user.username) {
    //     errors.push({ level: 'error', code: 'USR0005', message: 'username is mandatory' });
    // }

    // if (!user.email) {
    //     errors.push({ level: 'error', code: 'USR0006', message: 'email is mandatory' });
    // }

    // if (errors.length > 0) {
    //     res.status(400).send(errors);
    // } else {
    //     next();
    // }
};