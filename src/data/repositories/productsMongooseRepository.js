import Product from "../../domain/entities/product.js";
import productSchema from "../models/productSchema.js";

class productsMongooseRepository {

    async find(query)
    {
        try {
            const { status, limit, page } = query;
            const productsDocument = await productSchema.paginate({status},{ limit , page });
            const { docs, ...pagination } = productsDocument
            const product = productsDocument.docs.map(p => new Product (
                p._id,
                p.title,
                p.description,
                p.price,
                p.thumbnail,
                p.code,
                p.stock,
                p.status,
                p.category
            ))

            return { product, pagination }

        } catch (error) {
            console.log(error);
        }
    }

    async getOne (id) {

        const product = await productSchema.findOne({_id:id});
        return new Product (
            product._id,
            product.title,
            product.description,
            product.price,
            product.thumbnail,
            product.code,
            product.stock,
            product.status,
            product.category
        )

    }

    async add (data) {

        const newProduct = await productSchema.create(data);
        return new Product (
            newProduct._id,
            newProduct.title,
            newProduct.description,
            newProduct.price,
            newProduct.thumbnail,
            newProduct.code,
            newProduct.stock,
            newProduct.status,
            newProduct.category
        )
    }

    async updateOne (id, data) {
    
            const product = await productSchema.findOneAndUpdate({_id:id}, data);
            return new Product (
                product._id,
                product.title,
                product.description,
                product.price,
                product.thumbnail,
                product.code,
                product.stock,
                product.status,
                product.category
            )
    }

    async deleteOne (id) {
        const product = await productSchema.findOneAndDelete({_id:id});
        const productDeleted = new Product (
            product._id,
            product.title,
            product.description,
            product.price,
            product.thumbnail,
            product.code,
            product.stock,
            product.status,
            product.category
        );
        return {
            "message": "Product deleted",
            "product": productDeleted
                
            }
        }
}

export default productsMongooseRepository;