import { compare } from "bcryptjs"
import User from "../users/user.model"

export const authenticate = ({ email, password }) => {
    // get user by email .then() check password
    User.findByEmail(email).then(user => {
        compare(password, user.password)
    })
}