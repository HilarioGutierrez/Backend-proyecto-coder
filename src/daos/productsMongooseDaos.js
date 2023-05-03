import productSchema from "./models/productSchema.js";

class productsMongooseDaos {

    async find() // getAll, find, list, getStudents
    {
    const productsDocument = await productSchema.find();
        return productsDocument.map(p => ({
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

    }

    async getOne (id) {

        const product = await productSchema.findOne(id);
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

export default productsMongooseDaos;