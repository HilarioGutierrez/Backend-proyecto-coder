import productManager from "../manager/productManager.js";

const manager = new productManager();

class productController {

    static find = async (req, res) => {

        try {
                let consult = +req.query.limit;
                const products = await manager.find();
                
            
                // if consult is not a number, send all products. Else send the number of products limited by consult
                if (!consult) {
                    res.send( { message: 'success' , payload: products } );
                    return;
                }
                //Show the number of products limited by consult
                const filteredProducts = products.slice(0, consult);
                res.status(200).send(filteredProducts);
            
            } catch (error) {
                res.status(500).send({error: `Internal server. ${error}`});
            }
    };
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

//add product. Validate porps with productSchema
export const add = async (req, res) => {
    try {
        const product = req.body;

        //desestructuring
        const { title, description, price, category , stock, code, thumbnail } = product;
        
        //Validate data
        if ( !title || !description || !price || !code || !category|| !stock || !thumbnail) {
            throw new Error('Invalid data');
            }
            const newProduct = await manager.add(product);
            
            const exist = await newProduct.find(product => product.code === code || product.id === id);
            if (!exist) {
                //add product
                res.status(200).send({message: 'Product Added', payload: newProduct});
            }else{
                res.status(404).send(`Product with code: ${product.code} already exist`);
            }
    } catch (error) {
        console.log(error);
        
    }
}

//update product
export const updateOne = async (req, res) => {
    //param is the id of the product to update
    const param = req.params.pid;
    try {
        const product = await manager.updateOne(param, req.body);
        res.send(product);

    } catch (error) {
        res.status(404).send({message: 'Product not found', error: error.message});
        throw new Error(`Not found product with id: ${param}`);
    }
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

export default productController;