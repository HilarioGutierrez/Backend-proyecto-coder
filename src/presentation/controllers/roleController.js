import roleManager from "../../domain/manager/roleManager.js";

const manager = new roleManager();

export const list  = async (req, res,next) => {
    try {
        const query = {
        limit: +req.query.limit || 5,
        page: +req.query.page || 1,

    }
        const roles = await manager.paginate(query);
        res.status(200).send({message: 'success', roles: roles.docs, ...roles, docs: undefined});
    
    }
    catch (e) {
        next(e);

    }
};

export const getOne = async (req, res,next) => {
    try {
        const { id } = req.params;
        const role = await manager.getOne(id);
        res.status(200).send({message: 'success', payload: role});
    }
    catch (e) {
        next(e);
    } 
};

export const create = async (req, res,next) => {
    try {
        const  role  = req.body;
        const newRole = await manager.create(role);
        
        res.status(200).send({message: 'success', payload: newRole});
        
    } 
    catch (e) {
        next(e);
    }
};

export const updateOne = async (req, res,next) => {
    try {
        const { id } = req.params;
        const role = req.body;

        if(!id) {
            res.status(404).send({message: 'role not found'});
            throw new Error('Missing fields');
        }
        const result = await manager.updateOne(id, role);
        res.status(200).send({message: 'success', payload: result });

    } 
    catch (e) {
        next(e);
    }
};

export const deleteOne = async (req, res,next) => {
    try {
        const { id } = req.params;
        
        if(!id) {
            res.status(404).send({message: 'Role not found'});
            throw new Error('Missing fields');
        }
        await manager.deleteOne(id);
        res.status(200).send({message: 'success'});

    } 
    catch (e) {
        next(e);
    }
};

