import { Router } from "express";
import cartManager from "../../manager/cartManager.js"


//new instanse of cartManager
const manager = new cartManager();
const cartRouter = Router();

cartRouter.post('/',async (req,res)=>{
    const cart = await manager.createCart();
        
    res.status(201).send({message: 'Cart created'});
});

cartRouter.get('/:cid', async (req, res) => {
    try {
        const param = +req.params.cid;
        const cart = await manager.getProductById(param);
        res.status(302).send(cart);
        
    } catch (error) {
        res.status(404).send({error: error.message});
    }
})

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cid = +req.params.cid;
        const pid = +req.params.pid;

        const cart = await manager.addProduct(cid, pid);
        
        res.status(201).send(cart);
    } catch (error) {
        throw new Error(error);
    }
});
export default cartRouter;