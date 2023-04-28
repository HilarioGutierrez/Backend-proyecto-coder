import { Router } from "express";
import productManager from "../../manager/productManager.js"
import productSchema from "../../models/productsSchema.js";

//new instanse of productManager
const manager = new productManager();
const productRouter = Router();

//GET products from DB. Req.query limited the number of products to show
productRouter.get('/', async (req, res) => {
    try {
        let consult = +req.query.limit;
        let products = await productSchema.find();
    
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
});

//GET products by ID from productManager
productRouter.get('/:pid', async (req, res) => {
    try {
        const param = req.params.pid;
        let products = await productSchema.findOne({_id: param});
        
        res.send(products);
    } catch (error) {
        res.status(500).send({error: `Internal server. ${error}`});
    }
});

//PUT products at productManager
productRouter.post('/', async (req, res) => {
    const product = req.body;
    //add product
    const newProduct = await productSchema.create(product)
    //if any of the properties is empty, send error message. Else show status 201 and the product created
    if(!newProduct) {
        return res.status(409).send({error: 'Conflict'});
    }
        return res.status(201).send({message:'Create product', newProduct});
        
    });

//PUT products at productManager. Req.params.pid is the id of the product to update
productRouter.put('/:pid', async (req, res) => {
    //param is the id of the product to update
    const param = req.params.pid;
    //find products
    const products = await productSchema.updateOne({_id: param}, req.body);
    res.status(202).send({message: 'Update ok!', updatedProduct: products});

//     //product is the body of the request. The new product to update
//     const product = req.body
    
//     //filtered id's products same as param.
//     const filteredProducts = products.filter(p => p._id === param);

//     //if FilteredProducts is empty, send error message. Else send the product
// if(filteredProducts.length === 0) {
//         res.status(404).send({error: 'Sorry. Product not found'});
//         return;
// }
//     //update product
//     const updateProduct = await manager.updateProduct(param, product);
//     res.status(202).send({message: 'Update ok!', updatedProduct: updateProduct});

});

//DELETE products at productManager. Req.params.pid is the id of the product to delete
productRouter.delete('/:pid', async (req, res) => {
    try {
    //param is the id of the product to delete
    const param = req.params.pid;
    //delete the product
    const products = await productSchema.deleteOne({_id: param});
    
    res.status(200).send({message: 'Delete ok!', deletedProduct: products});
} catch (error) {
    res.status(500).send({error: `Internal server. ${error}`});
}

})

export default productRouter;
