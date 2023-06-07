import cartMongooseDao from '../daos/cartsMongooseDao.js'
import productsMongooseDao from '../daos/productsMongooseDao.js'
import { ObjectId } from 'mongodb'

class cartManager {
  constructor () {
    this.cartDao = new cartMongooseDao()
    this.productDao = new productsMongooseDao()
  }

  async create () {
    return this.cartDao.create()
  }

  async getAll () {
    return this.cartDao.getAll()
  }

  async getOne (id) {
    return this.cartDao.getOne(id)
  }

  async addProduct (cid, pid) {
    const product = await this.productDao.getOne(pid)
    if (!product) throw new Error(`Not found product with id: ${pid}`)

    const cart = await this.cartDao.getOne(cid)
    if (!cart) throw new Error(`Not found cart with id: ${cid}`)

    // Check if product already exists in cart
    const cartProductIndex = cart.products.findIndex(cartProduct => cartProduct.id.toString() === pid);
    if (cartProductIndex !== -1) {
      // If product already exists, increase its quantity
      cart.products[cartProductIndex].quantity += 1
    } else {

      cart.products.push( product.id);

    }

    return this.cartDao.updateOne(cid, cart)
  }

  async deleteOne (id) {
    const cart = await this.cartDao.deleteOne(id)
    if (!cart) throw new Error(`Not found cart with id: ${id}`)
  }

  async delateProduct (cid, pid) {
    //get cart
    const cart = await this.cartDao.getOne(cid);
    //check if cart exists
    if (!cart) throw new Error(`Not found cart with id: ${cid}`)

    //check if product exists in cart
    const cartProductIndex = cart.products.findIndex(cartProduct => cartProduct.id.toString() === pid);
    //if product exists and quantity is greater than 1, decrease quantity by 1, else delete product from cart
    if (cartProductIndex !== -1) {
      cart.products[cartProductIndex].quantity -= 1 || 0;
      if (cart.products[cartProductIndex].quantity === 0) {
        cart.products.splice(cartProductIndex, 1);
      }
    }
    return this.cartDao.updateOne(cid, cart);
  }

  async updateQuantity (cid, pid, quantity) {
    try {
      const cart = await this.cartDao.getOne(cid);
      if (!cart) throw new Error(`Not found cart with id: ${cid}`)

    const cartProductIndex = cart.products.findIndex(cartProduct => cartProduct.id.toString() === pid);
    if (cartProductIndex !== -1) {
      cart.products[cartProductIndex].quantity = quantity;
    }
    return this.cartDao.updateOne(cid, cart);

    } catch (error) {
      console.log(error.message);
    }
  }

}

export default cartManager