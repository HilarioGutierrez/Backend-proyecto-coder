import ticketManager from "../../domain/manager/ticketManager.js";

const manager = new ticketManager();

export const create = async (req, res, next) => {
    try {
        const cid = req.params.cid
        const ticket = await manager.create(cid);
        
        res.status(201).send({ message: 'Ticket created', ticket });
        
        return ticket;

        
    } catch (e) {
        console.log(e);
    }
};