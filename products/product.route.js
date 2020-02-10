import { Router } from 'express';
import { isValidForCreation } from './product.validator';
import { createProduct } from './product.service';

/**
 * Express Router for '/products'
 */
const router = Router();

router.post('/', isValidForCreation, (req, res) => {
    console.log()
    createProduct(req.user, req.body)
        .then(data => res.status(201).send(data))
        .catch(error => res.status(500).send({ error: error.message }));
});

export default router;
