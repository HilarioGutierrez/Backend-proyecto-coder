import { Router } from 'express'
import cartController, { addProduct, deleteOne, deleteProduct, getAll, getOne, updateQuantity } from '../../controllers/cartController.js'

const cartRouter = Router()

// Create empty cart.
cartRouter.post('/', cartController.create);

cartRouter.get('/', getAll);

cartRouter.get('/:cid', getOne);

cartRouter.post('/:cid/product/:pid', addProduct);

cartRouter.put('/:cid/product/:pid', updateQuantity);

cartRouter.delete('/:cid', deleteOne);

cartRouter.delete('/:cid/product/:pid', deleteProduct);

cartRouter.get('/:cid/purchase');

export default cartRouter
