import container from "../../shared/container.js";
import cartManager from "./cartManager.js";


class  ticketManager {

    constructor() {
        this.ticketsRepository = container.resolve('ticketRepository');
    };

    async create(data) {
        
        const manager = new cartManager()
        const cart = await manager.getOne()
        
        return this.ticketsRepository.create(data);
        
    }

    async find (query) {
        return this.ticketsRepository.find(query);
    }

    async findOne (id) {
        return this.ticketsRepository.findOne(id);
    }
}

export default ticketManager;