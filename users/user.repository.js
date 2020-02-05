import userModel from "./user.model";

export default {

    findByEmail: (email) => {
        return userModel.findOne({ email: email }).exec();
    }

}