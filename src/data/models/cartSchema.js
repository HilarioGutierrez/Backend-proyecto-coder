import mongoose, { Schema } from "mongoose";

// DB collection's name
const productCollection = "carts";

//Schema definition for the cart

const cartSchema = new mongoose.Schema({
    products: [{type:Schema.Types.ObjectId, ref: "products", default: [], required: true}]
});

cartSchema.pre('find', function() {
    this.populate('products');
})

cartSchema.pre('findOne', function() {
    this.populate('products');
})

export default mongoose.model(productCollection, cartSchema);