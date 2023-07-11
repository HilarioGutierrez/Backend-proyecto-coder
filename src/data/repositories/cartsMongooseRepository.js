import Cart from "../../domain/entities/cart.js";
import availableStockValidation from "../../domain/validations/cart/availableStockValidation.js";
import cartSchema from "../models/cartSchema.js";
import productSchema from "../models/productSchema.js";

class cartMongooseRepository {

        // addProduct to cart -- delete cart

    async create (user) {
        return await cartSchema.create({ products: [], user:user });
    }


    async addProduct(cid, pid) {
        try {
            const document = await cartSchema.findOneAndUpdate(
            { _id: cid, 'products._id': pid },
            { $inc: { 'products.$.quantity': 1 } },
            { new: true }
            );
        
            const productDocument = await productSchema.findById(pid);

            if (!document) {
            await cartSchema.updateOne(
                { _id: cid },
                { $push: { products: { _id: productDocument._id, quantity: 1 } } }
            );
            }

            const cart = await cartSchema.findById(cid);
            const { _id: id, products } = cart;
        
            const updatedCart = new Cart({
            id,
            products: products.map(({ _id, quantity }) => ({ id: _id, quantity }))
            });
        
            availableStockValidation(cid, pid)

            return updatedCart;
        } catch (error) {
            throw error;
        }
        }

    async getAll () {
        return await cartSchema.find().populate( 'products' );
    }

    async getOne (id) {
        const cart = await cartSchema.findById(id);

        return new Cart ({
            _id: cart._id,
            user: cart.user,
            products: cart.products
        });
    }

    async updateOne (id, data) {
        const cart = await cartSchema.findOneAndUpdate( {_id:id}, data );
        return new Cart ({
            id:cart._id,
            products:cart.products
        })
    }

    async deleteOne (id) {
        return await cartSchema.findOneAndDelete( {_id:id} );
    }
}

export default cartMongooseRepository;