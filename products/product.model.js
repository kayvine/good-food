import { Schema, model } from "mongoose";
import { baseSchema } from "../core/baseSchema";

const productSchema = {
    number: { type: Number, required: false }, // optional
    name: String,
    type: String, // food or drink
    price: Number,
    estimatedTimeToPrepare: Number,
    ...baseSchema
};

export default model('Product', new Schema(productSchema));