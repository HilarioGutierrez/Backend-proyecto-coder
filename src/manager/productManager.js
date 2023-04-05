import fs from 'fs/promises';

class productManager {
    #autoId = 1;
    #products = [];

    constructor() {
        this.#products = [];
        this.path = "./src/db/product.json";
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

    async addProduct(product) {
        try {
            //Read file
        const products = await fs.readFile(this.path, 'utf-8');
        const productArray = JSON.parse(products);

        if(productArray.length > 0) {
            const lastProduct = productArray[productArray.length - 1];
            this.#autoId = lastProduct.id + 1;
        }
            //desestructuring
            const {id, title, description, price, category , status,  stock, code, thumbnail } = product;
            //Validate data
            if ( !title || !description || !price || !code || !category|| !status || !stock || !thumbnail) {
                throw new Error('Invalid data');
            }
            //push product to array
            this.#products.push(product);
            
            const newProduct = {id: this.#autoId++, ...  product };
            const newArray = [... productArray, newProduct];

            const exist = await productArray.find(product => product.code === code || product.id === id);
            if (!exist) {
                //write file
                await fs.writeFile(this.path, JSON.stringify(newArray, null, 2));
                return newProduct;
            }else{
                throw new Error(`Product with code: ${product.code} already exist`);
            }
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

// const main = async () => {

//     let newProduct = new productManager();
    
    //Read file. If not exist create file. If exist return array
    // const getProduct = await newProduct.getProducts();
    // console.log(getProduct);
    
    // //Add Product
    // await newProduct.createProduct(
    //     //objet product
    // {
    //     id: uuidv4() ,
    //     title: 'medias',
    //     description: 'medias soquetes',
    //     price: 100 ,
    //     thumbnail: 'url img' ,
    //     code: 'med1a' ,
    //     stock: 100,
    //     status:true,
    //     category:'ropa'
    // })
    // await newProduct.createProduct(
    //     //objet product
    // {
    //     id: uuidv4() ,
    //     title: 'remera',
    //     description: 'remera manga corta',
    //     price: 300 ,
    //     thumbnail: 'url img' ,
    //     code: 'rem1a' ,
    //     stock: 100,
    //     status:true,
    //     category:'ropa'
    // })
    // await newProduct.createProduct(
    //     //objet product
    // {
    //     id: uuidv4() ,
    //     title: 'pantalon',
    //     description: 'pantalon jean',
    //     price: 900 ,
    //     thumbnail: 'url img' ,
    //     code: 'pan1a' ,
    //     stock: 100,
    //     status:true,
    //     category:'ropa'
    // })
    // await newProduct.createProduct(
    //     //objet product
    // {
    //     id: uuidv4() ,
    //     title: 'short',
    //     description: 'short futbol',
    //     price: 400 ,
    //     thumbnail: 'url img' ,
    //     code: 'sho1a' ,
    //     stock: 100,
    //     status:true,
    //     category:'ropa'
    // })
    // await newProduct.createProduct(
    //     //objet product
    // {
    //     id: uuidv4() ,
    //     title: 'camisa',
    //     description: 'camisa manga larga',
    //     price: 1200 ,
    //     thumbnail: 'url img' ,
    //     code: 'cam1a' ,
    //     stock: 100,
    //     status:true,
    //     category:'ropa'
    // })
    // await newProduct.createProduct(
    //     //objet product
    // {
    //     id: uuidv4() ,
    //     title: 'campera',
    //     description: 'campera de cuero',
    //     price: 12300 ,
    //     thumbnail: 'url img' ,
    //     code: 'cam2a' ,
    //     stock: 100,
    //     status:true,
    //     category:'ropa'
    // })
    // await newProduct.createProduct(
    //     //objet product
    // {
    //     id: uuidv4() ,
    //     title: 'gorra',
    //     description: 'gorra tracker',
    //     price: 200 ,
    //     thumbnail: 'url img' ,
    //     code: 'gor1a' ,
    //     stock: 100,
    //     status:true,
    //     category:'ropa'
    // })
    // await newProduct.createProduct(
    //     //objet product
    // {
    //     id: uuidv4() ,
    //     title: 'remera',
    //     description: 'remera manga larga',
    //     price: 500 ,
    //     thumbnail: 'url img' ,
    //     code: 'rem1b' ,
    //     stock: 100,
    //     status:true,
    //     category:'ropa'
    // })
    // await newProduct.createProduct(
    //     //objet product
    // {
    //     id: uuidv4() ,
    //     title: 'musculosa',
    //     description: 'musculosa de algodon',
    //     price: 850 ,
    //     thumbnail: 'url img' ,
    //     code: 'mus1a' ,
    //     stock: 100,
    //     status:true,
    //     category:'ropa'
    // })
    // await newProduct.createProduct(
    //     //objet product
    // {
    //     id: uuidv4() ,
    //     title: 'camiseta de futbol',
    //     description: 'camiseta de River',
    //     price: 23000 ,
    //     thumbnail: 'url img' ,
    //     code: 'cam3a' ,
    //     stock: 100,
    //     status:true,
    //     category:'ropa'
    // })

    
    
    // //Get product by id
    // const product = await newProduct.getProductById(1);
    
    //Update product 
    //newProduct.updateProduct(8,{code:'camisa1'})

    //Dalete product
    //await newProduct.deleteProduct(21);

    // const products = await newProduct.getProducts();
    // console.log(products)

//}

// main();

export default productManager;