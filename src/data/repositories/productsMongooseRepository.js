import Product from "../../domain/entities/product.js";
import productSchema from "../models/productSchema.js";

class productsMongooseRepository {

    async find(query)
    {
        try {
            const { status, limit, page } = query;
            const productsDocument = await productSchema.paginate({status},{ limit , page });
                productsDocument.docs.map(p => ({
                id: p._id,
                title: p.title,
                description: p.description,
                price: p.price,
                thumbnail: p.thumbnail,
                code: p.code,
                stock: p.stock,
                status: p.status,
                category: p.category
            }))
            
            return productsDocument

        } catch (error) {
            console.log(error);
        }
    }

    async getOne (id) {

        const product = await productSchema.findOne({_id:id});
        return new Product ({
            id:product._id,
            title:product.title,
            product:product.description,
            price:product.price,
            thumbnail:product.thumbnail,
            code:product.code,
            stock:product.stock,
            status:product.status,
            category:product.category
        })

    }

    async create (data) {

        const product = await productSchema.create(data);
        const dto = new Product ({
            id:product._id.toString(),
            title:product.title,
            description:product.description,
            price:product.price,
            thumbnail:product.thumbnail,
            code:product.code,
            stock:product.stock,
            status:product.status,
            category:product.category
        })
        console.log(dto);
        return dto;
    }

    async updateOne (id, data) {
    
            const product = await productSchema.findOneAndUpdate({_id:id}, data);
            return new Product ({
                id:product._id,
                title:product.title,
                product:product.description,
                price:product.price,
                thumbnail:product.thumbnail,
                code:product.code,
                stock:product.stock,
                status:product.status,
                category:product.category
            })
    }

    async deleteOne (id) {
        const product = await productSchema.findOneAndDelete({_id:id});
        const productDeleted = new Product ({
            id:product._id,
            title:product.title,
            product:product.description,
            price:product.price,
            thumbnail:product.thumbnail,
            code:product.code,
            stock:product.stock,
            status:product.status,
            category:product.category
        });
        return {
            "message": "Product deleted",
            "product": productDeleted
                
            }
        }
}

export default productsMongooseRepository;