import { Router } from "express";
import productManager from "../manager/productManager.js"

//new instanse of productManager
const manager = new productManager();
const productRouter = Router();

//GET products from productManager. Req.query limited the number of products to show
productRouter.get('/', async (req, res) => {
    const products = await manager.getProducts();
    let consult = +req.query.limit;
    // if consult is not a number, send all products. Else send the number of products limited by consult
    if (!consult) {
        res.send(products);
        return;
    }
    //Show the number of products limited by consult
    const filteredProducts = products.slice(0, consult);
    res.status(200).send(filteredProducts);
});

//GET products by ID from productManager
productRouter.get('/:pid', async (req, res) => {
    const products = await manager.getProducts();
    const param = +req.params.pid;
    //filtered id's products same as param.
    const filteredProducts = products.filter(p => p.id === param);

    //if FilteredProducts is empty, send error message. Else send the product
if(filteredProducts.length === 0) {
        res.status(404).send({error: 'Sorry. Product not found'});
        return;
}
    res.send(filteredProducts);
});

//PUT products at productManager
productRouter.post('/', async (req, res) => {
    const product = req.body
    //add product
    const newProduct= await manager.addProduct(product);
    
    //if any of the properties is empty, send error message. Else show status 201 and the product created
    if(!newProduct) {
        res.status(409).send({error: 'Conflict'});
        return;
    }
        res.status(201).send({message:'Create product', product: product});
        
    });

//PUT products at productManager. Req.params.pid is the id of the product to update
productRouter.put('/:pid', async (req, res) => {
    //read products
    const products = await manager.getProducts();
    //param is the id of the product to update
    const param = +req.params.pid;
    //product is the body of the request. The new product to update
    const product = req.body
    
    //filtered id's products same as param.
    const filteredProducts = products.filter(p => p.id === param);

    //if FilteredProducts is empty, send error message. Else send the product
if(filteredProducts.length === 0) {
        res.status(404).send({error: 'Sorry. Product not found'});
        return;
}
    //update product
    const updateProduct = await manager.updateProduct(param, product);
    res.status(202).send({message: 'Update ok!', updatedProduct: updateProduct});

});

//DELETE products at productManager. Req.params.pid is the id of the product to delete
productRouter.delete('/:pid', async (req, res) => {
    //read products 
    const readProducts = await manager.getProducts();
    const param = +req.params.pid;
    //find product by id for delete
    const findProduct = readProducts.find(p => p.id === param);
    if(!findProduct) {
        res.status(404).send({error: 'Sorry. Product not found'});
        return;
    }
    
    await manager.deleteProduct(param);
    res.status(202).send({message: 'Delete ok!', deletedProduct: findProduct});
})

export default productRouter;
