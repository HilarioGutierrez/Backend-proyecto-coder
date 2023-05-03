import fs from 'fs/promises';
import productsMongooseDaos from '../daos/productsMongooseDaos.js';

class productManager {

    constructor() {
        this.productDao = new productsMongooseDaos();
    }

    //Get products.
    async find() 
    {
    return this.productDao.find();
    }

    async getOne(id){
        return this.productDao.getOne(id);
    }

    async add(product){
        return this.productDao.add(product);
    }

    async updateOne(id, data){
        return this.productDao.updateOne(id, data);
    }

    async deleteOne(id){
        return this.productDao.deleteOne(id);
    }

// async deleteProduct(id) {
//         try {
//             const products = await fs.readFile(this.path, 'utf-8');
//             const productArray = JSON.parse(products);

//             //search product by id for delete
//             const searchProduct = await productArray.find(product => product.id === id);
//             //search index of product for delete
//             const index = productArray.indexOf(searchProduct);
//             //delete product
//             if (index === -1) {
//                 throw new Error(`Not found product with id: ${id}`)
//             }
//             productArray.splice(index, 1);
//             //Write new array whitout product deleted
//             fs.writeFile(this.path, JSON.stringify(productArray, null, 2));
//         } catch (error) {
//             console.log(error);
//         }
//     }
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