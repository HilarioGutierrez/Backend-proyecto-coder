import { Router } from "express";
import productManager from "../../classes/productManager.js";
import { socketServer } from "../../app.js";


const realTimeProductsRouter = Router();
const manager = new productManager();

realTimeProductsRouter.get('/', async (req, res) => {
    try {
        const listRpoducts = await manager.getProducts();
        res.render('realTimeProducts', {products:listRpoducts})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

realTimeProductsRouter.get('/realtimeproducts', async (req,res)=>{        
    try {
        
        res.render('realtimeproducts', {title: "Real Time Products"});    
    } catch (error) {
        res.status(404).send(error);

    }
});


export default realTimeProductsRouter;