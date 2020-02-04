import { isValidForCreation } from "../validators/UserValidator";
import authenticate from "./auth.service";

export default (router) => {

    router.post('/authentication', isValidForCreation, (req, res, next) => {
        authenticate(req.body).then().catch()
    })

};
