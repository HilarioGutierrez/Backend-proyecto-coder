import productSchema from "../models/productSchema.js";

const sort = {
    'asc': 1,
    'desc': -1
} 

class productsMongooseDao {

    async  find(query)
    {
        try {
            const { status, limit, page } = query;
            const productsDocument = await productSchema.paginate({status},{ limit , page });
            console.log(productsDocument);
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
        return {
            id: product._id,
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            status: product.status,
            category: product.category
        }

    }

    async add (data) {

        const newProduct = await productSchema.create(data);
        return {
            id: newProduct._id,
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            code: newProduct.code,
            stock: newProduct.stock,
            status: newProduct.status,
            category: newProduct.category
        }
    }

    async updateOne (id, data) {
    
            const product = await productSchema.findOneAndUpdate({_id:id}, data);
            return {
                id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                status: product.status,
                category: product.category
            }
    }

    async deleteOne (id) {
        const product = await productSchema.findOneAndDelete({_id:id});
        return {
            "message": "Product deleted",
            "product": {
                id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                status: product.status,
                category: product.category
            }
        }
    }
}

export default productsMongooseDao;