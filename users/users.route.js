import { createUser, getUserById, getUsers } from './user.service';
import { isValidForCreation } from '../validators/user.validator';

export default (router) => {

    // router.get('/users', (req, res) => {
    //     getUsers()
    //         .then(data => res.status(200).send(data))
    //         .catch(error => res.status(500).send({ stack: error.stack }));
    // });

    // router.get('/users/:id', (req, res) => {
    //     getUserById(req.params.id)
    //         .then(data => res.status(200).send(data))
    //         .catch(error => res.status(500).send({ stack: error.stack }));
    // });

    router.post('/users', isValidForCreation, (req, res) => {
        createUser(req.body)
            .then(data => res.status(201).send(data))
            .catch(error => res.status(400).send({ error: error.message }));
    });

};
