import { Router } from "express";
import cartManager from "../../manager/cartManager.js"
import cartController, { addProduct, deleteOne, getAll, getOne } from "../../controllers/cartController.js";


//new instanse of cartManager
const manager = new cartManager();
const cartRouter = Router();

//Create empty cart.
cartRouter.post('/', cartController.create);

cartRouter.get('/', getAll);

cartRouter.get('/:cid', getOne);

cartRouter.post('/:cid/product/:pid', addProduct);

cartRouter.delete('/:cid', deleteOne);


export default cartRouter;