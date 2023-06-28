import productsMongooseRepository from '../../data/repositories/productsMongooseRepository.js';
import container from '../../shared/container.js';

class productManager {

    constructor() {
        this.productDao = container.resolve('productsRepository');
    }

    //Get products.
    async find(query) 
    {
    return this.productDao.find(query);
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

}

export default productManager;