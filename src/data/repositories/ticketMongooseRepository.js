import Ticket from "../../domain/entities/ticket.js";
import cartManager from "../../domain/manager/cartManager.js";
import ticketSchema from "../models/ticketSchema.js";

class ticketMongooseRepository{

async create (id) {
    const manager = new cartManager();
    const cart = await manager.getOne(id);
    const totalQuantity = cart.products.reduce((sum, product) => sum + product.quantity, 0);
    const dto = new Ticket({
        code: Math.floor(Math.random() * 1000000),
        purchaseDatetime: new Date(),
        product: cart.products,
        amount: totalQuantity,
        purchaser: cart.user[0].email
    });

    const ticket = await ticketSchema.create(dto);

    return ticket;
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