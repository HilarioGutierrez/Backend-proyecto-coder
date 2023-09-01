import productManager from "../../domain/manager/productManager.js";

const manager = new productManager();

export const find = async (req, res) => {

        const query = {
            status: req.query.status || 'true',
            limit: +req.query.limit || 5,
            page: +req.query.page || 1,
            sort: req.query.sort || 'asc',
        }
    
    try {
        
        const products = await manager.find(query);

        // function to order by price
        const orderByPrice = (products, order) => {
            const sortedProducts = products.sort((a, b) => {
            if (order === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
            });
            return sortedProducts;
        }

        orderByPrice(products.docs, query.sort);

        // Object whit pagination data
        const pagination = { 
            totalPages: products.totalPages, 
            prevPages: products.prevPage, 
            nextPage: products.nextPage, 
            page: products.page, 
            hasPrevPage: products.hasPrevPage, 
            hasNextPage: products.hasNextPage, 
            prevLink: products.prevLink, 
            nextLink: products.nextLink
        }
        
        res.status(200).send({message: 'success', payload: products.docs, pagination: pagination })
        
    } catch (error) {
        res.status(500).send({message: 'error', error: error.message});
        throw new Error(error);
    }

}

//get one product by id
export const getOne = async (req, res) => {
    const param = req.params.pid;
    try {
        let products = await manager.getOne({_id: param});
                
        res.send(products);
    } catch (error) {
        res.status(500).send({message: `Internal server. not found product by id ${param}`, error: error.message});
    }
}

//create product. Validate porps with productSchema
export const create = async (req, res) => {
    try {
        const product = req.body;
        req.logger.warn('ERROR EN CARGA PRODUCTO')

        //desestructuring
        const { title, description, price, category , stock, code, thumbnail } = product;
        
        //Validate data
        if ( !title || !description || !price || !code || !category|| !stock || !thumbnail) {
            throw new Error('Invalid data');
            }
            const newProduct = await manager.create(product);
            res.status(200).send({message: 'Product Added', payload: {... newProduct}});
            
    } catch (error) {
        res.status(400).send({error:error.message});
        
    }
}

//update product
export const updateOne = async (req, res) => {
    //param is the id of the product to update
    const param = req.params.pid;
    try {
        const product = await manager.updateOne(param, req.body);
        res.send({ product: product });

    } catch (error) {
        res.status(404).send({message: 'Product not found', error: error.message});
    }
//--> VER PORQUE EL SEND MUESTRA EL PRODUCT NO ACTUALIZADO, PERO EN DB SE ACTALIZO <--//
}

//delete product
export const deleteOne = async (req, res) => {
    try {
         //param is the id of the product to delete
            const param = req.params.pid;
            //delete the product
            const product = await manager.deleteOne(param);
        
        res.status(200).send({message: 'Delete ok!', deletedProduct: product});
        } catch (error) {
        res.status(500).send({error: `Internal server. ${error}`});
        }
};

