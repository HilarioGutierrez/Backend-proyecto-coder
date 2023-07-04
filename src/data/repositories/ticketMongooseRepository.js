import ticket from "../../domain/entities/ticket.js";
import ticketSchema from "../models/ticketSchema";
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
}

export default ticketMongooseRepository;