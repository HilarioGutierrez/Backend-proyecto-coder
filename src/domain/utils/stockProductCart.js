import cartManager from "../manager/cartManager.js";
import productManager from "../manager/productManager.js";

const stockProductCart = async (cid, pid) => {
    const productManagerInstance = new productManager();
    const cartManagerInstance = new cartManager();

    const cart = await cartManagerInstance.getOne(cid);
    if (!cart) {
        throw new Error('Cart not found');
    }

    const product = await productManagerInstance.getOne(pid);

    if (!product) {
        throw new Error('Product not found');
    }

    const stockProduct = product.stock;
    const quantityCart = cart.products.find((product) => product.id === pid).quantity;

    if (stockProduct < quantityCart) {
        throw new Error('Stock not available');
    }
    productManagerInstance.updateOne(pid, { stock: +(stockProduct - quantityCart) });

    return stockProduct;
}

export default stockProductCart;
