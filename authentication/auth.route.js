import { isValidForCreation } from "./auth.validator";
import { authenticate } from "./auth.service";

export default (router) => {

    router.post('/authentication', isValidForCreation, (req, res, next) => {
        authenticate(req.body)
            .then(data => res.status(200).send(data))
            .catch(error => res.status(500).send({ error: error.message }));
    })

};