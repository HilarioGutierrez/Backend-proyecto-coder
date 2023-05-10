import cartSchema from "../models/cartSchema.js";

class cartMongooseDao {

// addProduct to cart -- delete cart

    async create () {
        return await cartSchema.create({ products: [] });
    }

    async getAll () {
        return await cartSchema.find();
    }

    async getOne (id) {
        const cart = await cartSchema.findOne( {_id:id} );
        return {
            id: cart._id,
            products: cart.products
        }
    }

    async updateOne (id, data) {
        const cart = await cartSchema.findOneAndUpdate( {_id:id}, data );
        return {
            id: cart._id,
            products: cart.products
        }

    }

    async deleteOne (id) {
        return await cartSchema.findOneAndDelete( {_id:id} );
    }

    async deleteProduct(cid){
        const cart = await cartSchema.findOne( {_id:cid} );
        return cart
    }
}

export default cartMongooseDao;