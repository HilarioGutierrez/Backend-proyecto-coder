import cartManager from '../../domain/manager/cartManager.js'

const manager = new cartManager()

class cartController {
      static create = async (req, res,next) => {
        try {
          const user = req.user;
          const {firstName,lastName,email} = user;
          const cart = await manager.create({firstName,lastName,email})

          res.status(201).send({ message: 'Cart created', cart })
        } catch (e) {
          next(e)
          res.status(404).send({ error: e.message })
        }
      }
    }

export const getAll = async (req, res,next) => {
  try {
    const carts = await manager.getAll()
    res.status(200).send(carts)
  } catch (e) {
    next(e)
    res.status(404).send({ error: e.message })
  }
}

export const getOne = async (req, res,next) => {
  try {
    const cid = req.params.cid;
    const cart = await manager.getOne(cid)
    res.status(200).send({ message: 'Cart found', cart: cart })
  } catch (e) {
    next(e)
    console.log('Error: ',e.message)
  }
}

export const addProduct = async (req, res,next) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await manager.addProduct(cid, pid);

    const user = req.user;
    const {firstName,lastName,email} = user;

    cart.user = {firstName,lastName,email};
    
    res.status(200).send({ message: 'Product added', payload: cart });
  } catch (e) {
    next(e)
    console.log("error del carrito.",e.message);
  }
}

export const deleteOne = async (req, res,next) => {
  try {
    const param = req.params.cid
    const cart = await manager.deleteOne(param)
    res.status(200).send({ message: 'Cart deleted'})
  } catch (e) {
    next(e)
    console.log(e.message)
  }
}

export const deleteProduct = async (req, res,next) => {
  try {
    const { cid, pid } = req.params
    const deleteProduct = await manager.delateProduct(cid, pid)
    res.status(200).send({ message: 'Product deleted' })
  } catch (e) {
    next(e)
    res.status(400).send({ error: e.message })
  }
}

export const updateQuantity = async (req, res,next) => {
  try {
    const { cid, pid } = req.params
    const { quantity } = req.body
    const updateQuantity = await manager.updateQuantity(cid, pid, quantity)
    res.status(200).send({ message: 'Quantity updated' })
  } catch (e) {
    next(e)
    console.log(e.message);
    throw new Error(e.message);
  }
}

export default cartController