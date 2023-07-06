import container from '../../shared/container.js'

class cartManager {
  constructor () {
    this.cartRepository = container.resolve('cartRepository')
    this.productRepository = container.resolve('productsRepository')
  }

  async create () {
    return this.cartRepository.create()
  }

  async getAll () {
    return this.cartRepository.getAll()
  }

  async getOne (id) {
    return this.cartRepository.getOne(id)
  }

  async addProduct (cid, pid) {
    return this.cartRepository.addProduct(cid, pid)
  }

  async deleteOne (id) {
    const cart = await this.cartRepository.deleteOne(id)
    if (!cart) throw new Error(`Not found cart with id: ${id}`)
  }

  async delateProduct (cid, pid) {
    //get cart
    const cart = await this.cartRepository.getOne(cid);
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
    return this.cartRepository.updateOne(cid, cart);
  }

  async updateQuantity (cid, pid, quantity) {
    try {
      const cart = await this.cartRepository.getOne(cid);
      if (!cart) throw new Error(`Not found cart with id: ${cid}`)

    const cartProductIndex = cart.products.findIndex(cartProduct => cartProduct.id.toString() === pid);
    if (cartProductIndex !== -1) {
      cart.products[cartProductIndex].quantity = quantity;
    }
    return this.cartRepository.updateOne(cid, cart);

    } catch (error) {
      console.log(error.message);
    }
  }

}

export default cartManager