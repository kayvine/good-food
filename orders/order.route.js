import { Router } from 'express';
import { isValidForCreation } from './order.validator';

const router = Router();

router.post('/', isValidForCreation, (req, res) => {
  createOrder(req.user, req.body)
    .then((data) => res.status(201).send(data))
    .catch((error) => res.status(500).send({ error: error.message }));
});

// get actions of order
// /orders/actions ["String"]
// PATCH -> /orders/id?action=actionname -> execute actions and update order state history

export default router;
