import fs from 'fs/promises';

class cartManager {

    #autoId = 1;
    #path = '';
    #cart = [];

    constructor() {
        this.#cart = [];
        this.#path = './src/db/cart.json';
    }

    createCart = async () => {
    try {
        const newCart = {id: this.#autoId++, products: []};
        this.#cart.push(newCart);
        fs.writeFile(this.#path, JSON.stringify(this.#cart, null, 2));

    } catch (error) {
        throw new Error(error);
    }
    }

    async getProductById(id) {
        //Read file
        const carts = await fs.readFile(this.#path, 'utf-8');
        const cartsArray = JSON.parse(carts);
        //finde product by id
        const searchcart = await cartsArray.find(product => product.id === id);

        if (!searchcart) {
            throw new Error(`Not found cart with id: ${id}`);
        }
        return searchcart;
    }

    async addProduct(cid, pid) {
        try {
        // Read file
        const cartsFile = await fs.readFile(this.#path, 'utf-8');
        const cartsJson = JSON.parse(cartsFile);
    
        // Find cart by id
        const searchCart = cartsJson.find(cart => cart.id === cid);
        if (!searchCart) {
            throw new Error(`Not found cart with id: ${cid}`);
        }
    
        // Read products file
        const pathProducts = './src/db/product.json';
        const productsFile = await fs.readFile(pathProducts, 'utf-8');
        const productsJson = JSON.parse(productsFile);
    
        // Find product by id
        const searchProduct = productsJson.find(product => product.id === pid);
        if (!searchProduct) {
            throw new Error(`Not found product with id: ${pid}`);
        }
    
        // Check if product already exists in cart
        const cartProductIndex = searchCart.products.findIndex(cartProduct => cartProduct.idProduct === pid);
        if (cartProductIndex !== -1) {
            // If product already exists, increase its quantity
            searchCart.products[cartProductIndex].quantity += 1;
        } else {
            // If product does not exist, add it to the cart with a quantity of 1
            searchCart.products.push({
        idProduct: pid,
        quantity: 1
            });
        }
    
        // Write updated cart to file
        await fs.writeFile(this.#path, JSON.stringify(cartsJson, null, 2));

        return `Product with id ${pid} added to cart with id ${cid}`;
        } catch (error) {
        console.log(error);
        }
    }
}

export default cartManager;