import { Router } from 'express'
import cartController, { addProduct, deleteOne, deleteProduct, getAll, getOne, updateQuantity } from '../../controllers/cartController.js'
import auth from '../../middlewares/auth.js'
import { create } from '../../controllers/ticketController.js';

const cartRouter = Router()

// Create empty cart.
cartRouter.post('/',auth, cartController.create);

cartRouter.get('/',auth, getAll);

cartRouter.get('/:cid',auth, getOne);

cartRouter.post('/:cid/product/:pid', auth, addProduct);

cartRouter.put('/:cid/product/:pid',auth, updateQuantity);

cartRouter.delete('/:cid',auth, deleteOne);

cartRouter.delete('/:cid/product/:pid',auth, deleteProduct);

cartRouter.get('/:cid/purchase',auth,create);

export default cartRouter
