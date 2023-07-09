import ticket from "../../domain/entities/ticket.js";
import ticketSchema from "../models/ticketSchema.js";

class ticketMongooseRepository{

async create (data) {
const newTicket = await ticketSchema.create(data);

return new ticket({
    id: newTicket._id,
    code: newTicket.code,
    purchaseDatetime: newTicket.purchaseDatetime,
    product: newTicket.product,
    purchaser: newTicket.purchaser
}); 
}

async find (query) {
    const tickets = await ticketSchema.paginate({}, query);

    return tickets;
}

async findOne (id) {
    const ticket = await ticketSchema.findById(id);

    return ticket;
}
}

export default ticketMongooseRepository;