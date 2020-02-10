import { Schema, model } from "mongoose";
import { baseSchema } from "../core/baseSchema";

const orderSchema = {
    origin: User, // employee or system or application user
    history: [{ status: String, on: Date }],
    products: [Product],
    paid: { type: String, required: false }, // Optional if not paid, type could be PayPal, Bancontact, Cash
    ...baseSchema
};

export default model('Order', new Schema(orderSchema));
