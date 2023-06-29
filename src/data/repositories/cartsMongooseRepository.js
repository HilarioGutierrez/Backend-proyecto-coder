import Cart from "../../domain/entities/cart.js";
import cartSchema from "../models/cartSchema.js";

class cartMongooseRepository {

// addProduct to cart -- delete cart

    async create () {
        return await cartSchema.create({ products: [] });
    }

    async getAll () {
        return await cartSchema.find().populate( 'products' );
    }

    async getOne (id) {
        const cart = await cartSchema.findOne( {_id:id} );
        return new Cart (
            cart._id,
            cart.products
        )
    }

    async updateOne (id, data) {
        const cart = await cartSchema.findOneAndUpdate( {_id:id}, data );
        return new Cart (
            cart._id,
            cart.products
        )
    }

    async deleteOne (id) {
        return await cartSchema.findOneAndDelete( {_id:id} );
    }
}

export default cartMongooseRepository;