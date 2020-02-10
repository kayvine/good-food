import userModel from "./user.model";
import { toObject } from "../core/database.helpers";

export default {

    findByEmail: (email) => userModel.findOne({ email: email }).exec().then(toObject)

}