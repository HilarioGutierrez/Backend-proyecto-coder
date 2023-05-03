import mongoose, { Schema } from "mongoose";

// DB collection's name
const productCollection = "carts";

//Schema definition for the cart

const cartSchema = new mongoose.Schema({
    products:[
        {id: {type: Schema.Types.ObjectId, require:true}, },
        {quantity: {type: Schema.Types.Number, require:true}, },]
});

export default mongoose.model(productCollection, cartSchema);