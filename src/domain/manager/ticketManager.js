import container from "../../shared/container";
import { cartStockValidation } from "../validations/product/productValidation.js";

class  ticketManager {

    constructor() {
        this.ticketsRepository = container.resolve('ticketRepository');
    };

    async create (data) {
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