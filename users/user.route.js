import { getUsers, getUserById, createUser, updateUser } from './user.service';
import { isValidForCreation, isValidForEditing } from './user.validator';
import { isOwnerOrHasPermission } from '../validators/permission.validator';

export default (router) => {
  router.get(
    '/users',
    isOwnerOrHasPermission('CAN_GET_USER', getUserById),
    (req, res) => {
      getUsers()
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send({ stack: error.stack }));
    }
  );

  router.get(
    '/users/:id',
    isOwnerOrHasPermission('CAN_GET_USER', getUserById),
    (req, res) => {
      getUserById(req.params.id)
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send({ stack: error.stack }));
    }
  );

  router.post('/users', isValidForCreation, (req, res) => {
    createUser(req.user, req.body)
      .then((data) => res.status(201).send(data))
      .catch((error) => res.status(500).send({ error: error.message }));
  });

  router.put(
    '/users/:id',
    isOwnerOrHasPermission('CAN_EDIT_USER', getUserById),
    isValidForEditing,
    (req, res) => {
      updateUser(req.user, req.params.id, req.body)
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(500).send({ error: error.message }));
    }
  );
};
