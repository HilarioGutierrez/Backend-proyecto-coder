import fs from 'fs/promises';

class productManager {

    autoId = 1;
    #products = [];

    constructor() {
        this.#products = [];
        this.path = "./product.json";
    }

    //Get products. If not exist file, create new.
    async getProducts() {
        try {
            //Read file
            const products = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            //If file dont exist, create new file
            await fs.writeFile(this.path, '[]');
            return 'No existe el archivo. Se creará uno nuevo'

        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            //objet product
            let product = {
                id: this.autoId++,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
            //Validate data
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                throw new Error('Missing Data');
            }
            //push product to array
            this.#products.push(product);
            //write file
            await fs.writeFile(this.path, JSON.stringify(this.#products, null, 2));
        }
        catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        //Read file
        const products = await fs.readFile(this.path, 'utf-8');
        const productArray = JSON.parse(products);
        //finde product by id
        const searchProduct = await productArray.find(product => product.id === id);

        if (!searchProduct) {
            throw new Error(`Not found product with id: ${id}`);
        }
        return searchProduct;
    }

async updateProduct(id, product) {
    try {
        const products = await fs.readFile(this.path, 'utf-8');
            const productArray = JSON.parse(products);
            
            const serchProduct = await productArray.find(product => product.id === id);
            //Merge product with new data
            const newProduct = { ...serchProduct, ...product };
            //map product for update
            const update = await productArray.map(product => {
                if (product.id === id){
                    return newProduct;
                }
                return product;
            })
            //Write new array with product updated
            fs.writeFile(this.path, JSON.stringify(update, null, 2));

    } catch (error) {
        throw new Error(`Not found product with id: ${id}`);
    }
}

async deleteProduct(id) {
        try {
            const products = await fs.readFile(this.path, 'utf-8');
            const productArray = JSON.parse(products);

            //search product by id for delete
            const searchProduct = await productArray.find(product => product.id === id);
            //search index of product for delete
            const index = productArray.indexOf(searchProduct);
            //delete product
            if (index === -1) {
                throw new Error(`Not found product with id: ${id}`)
            }
            productArray.splice(index, 1);
            //Write new array whitout product deleted
            fs.writeFile(this.path, JSON.stringify(productArray, null, 2));
        } catch (error) {
            throw new Error(`Not found product with id: ${id}`);
        }
    }
}

const main = async () => {

    let newProduct = new productManager();
    
    //Read file. If not exist create file. If exist return array
    // const getProduct = await newProduct.getProducts();
    // console.log(getProduct);
    
    //Add Product
    await newProduct.addProduct('remera','remera de algodon',9500,'url img','rem1',100)
    await newProduct.addProduct('medias','medias soquetes',800,'url img','med1',100)
    await newProduct.addProduct('zapato','zapato de cuero',15000,'url img','zap1',100)
    await newProduct.addProduct('pelota','pelota de futbol',1500,'url img','pel1',100);
    await newProduct.addProduct('campera','campera de cuero',25000,'url img','cam1',100);
    await newProduct.addProduct('gorra','gorra de cuero',2500,'url img','gor1',100);
    await newProduct.addProduct('pantalon','pantalon de cuero',7300,'url img','pan1',100);
    await newProduct.addProduct('camisa','camisa de cuero',9800,'url img','cami1',100);
    await newProduct.addProduct('pantaloneta','pantaloneta de cuero',8700,'url img','pan1',100);
    await newProduct.addProduct('pollera','pollera de cuero',5000,'url img','pol1',100);
    
    
    // //Get product by id
    // const product = await newProduct.getProductById(1);
    
    //Update product 
    //newProduct.updateProduct(8,{code:'camisa1'})

    //Dalete product
    //await newProduct.deleteProduct(21);

    // const products = await newProduct.getProducts();
    // console.log(products)

}

main();

export default productManager;