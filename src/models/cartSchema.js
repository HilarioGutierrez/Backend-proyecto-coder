import mongoose, { Schema } from "mongoose";

// DB collection's name
const productCollection = "carts";

//Schema definition for the cart

const cartSchema = new mongoose.Schema({
    products: {type:Schema.Types.Array, ref: "products", default: [], required: true}
});

export default mongoose.model(productCollection, cartSchema);