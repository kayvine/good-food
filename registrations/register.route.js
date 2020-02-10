import { Router } from "express";

const router = Router();

router.post('/', (req, res) => {
    register(req.body)
        .then(data => res.status(201).send(data))
        .catch(error => res.status(500).send({ error: error.message }));
});

export default router;
