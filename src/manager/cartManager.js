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
            //Read file
            const carts = await fs.readFile(this.#path, 'utf-8');
            const cartsArray = JSON.parse(carts);
            //finde product by id
            const searchCart = await cartsArray.find(cart => cart.id === cid);
            if (!searchCart) {
                throw new Error(`Not found cart with id: ${cid}`);
            }
            const pathProducts = './src/db/product.json';
            const products = await fs.readFile(pathProducts, 'utf-8');
            const productsArray = JSON.parse(products);

            const searchProduct = await productsArray.find(product => product.id === pid);

            if (!searchProduct) {
                throw new Error(`Not found product with id: ${pid}`);
            }
            
            searchCart.products.push(searchProduct);

            await fs.writeFile(this.#path, JSON.stringify(cartsArray, null, 2));
            return searchCart;
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default cartManager;