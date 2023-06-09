import userManager from "../../domain/manager/userManager.js";

const manager = new userManager();

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
        const { email } = req.params;
        const user = await manager.getOne(email);
        res.status(200).send({message: 'success', payload: user});
    }
    catch (e) {
        next(e);
    } 
};

export const create = async (req, res,next) => {
    try {
        const  user  = req.body;
        const newUser = await manager.create(user);
        
        res.status(200).send({message: 'success', payload: newUser});
        
    } 
    catch (e) {
        next(e);
    }
};

export const updateOne = async (req, res,next) => {
    try {
        const { email } = req.params;
        const user = req.body;

        if(!email) {
            res.status(404).send({message: 'User not found'});
            throw new Error('Missing fields');
        }
        const result = await manager.updateOne(email, user);
        res.status(200).send({message: 'success', payload: result });

    } 
    catch (e) {
        next(e);
    }
};

export const deleteOne = async (req, res,next) => {
    try {
        const { email } = req.params;
        
        if(!email) {
            res.status(404).send({message: 'User not found'});
            throw new Error('Missing fields');
        }
        await manager.deleteOne(email);
        res.status(200).send({message: 'success'});

    } 
    catch (e) {
        next(e);
    }
};

