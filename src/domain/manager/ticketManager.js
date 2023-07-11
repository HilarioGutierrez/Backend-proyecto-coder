import ticketMongooseRepository from '../../data/repositories/ticketMongooseRepository.js';
class  ticketManager {

    constructor() {
        this.ticketsRepository = new ticketMongooseRepository();
    };

    async create(id) {
            return this.ticketsRepository.create(id);
    }   

    async find (query) {
        return this.ticketsRepository.find(query);
    }

    async findOne (id) {
        return this.ticketsRepository.findOne(id);
    }
}

export default ticketManager;