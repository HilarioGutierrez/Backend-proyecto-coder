import mongoose, { Schema } from "mongoose";

// DB collection's name
const productCollection = "carts";

// //Schema definition for the cart

const cartSchema = new mongoose.Schema({
    user: { type: Schema.Types.Array, required:true},
    products:{
        type:[{
            _id:{ type: Schema.Types.ObjectId, required:true, ref: 'products'},
            quantity:{ type: Schema.Types.Number, required:true },
        }]
    },
});


cartSchema.pre('find', function() {
    this.populate('products');
})

cartSchema.pre('findOne', function() {
    this.populate('products');
})

export default mongoose.model(productCollection, cartSchema);