import userManager from "../manager/userManager.js";

const manager = new userManager();

export const list  = async (req, res,next) => {
    try {
        const query = {
        limit: +req.query.limit || 5,
        page: +req.query.page || 1,

    }
        const users = await manager.paginate(query);
        res.status(200).send({message: 'success', users: users.docs, ...users, docs: undefined});
    
    } catch (error) {
        res.status(500).send({message: 'error', error: error.message});
        next(error);

    }
};

export const getOne = async (req, res,next) => {
    try {
        const { email } = req.params;
        const user = await manager.getOne(email);
        res.status(200).send({message: 'success', payload: user});
    } catch (error) {
        res.status(500).send({message: 'error', error: error.message});
        next(error);
        console.log({error: error.message});
        throw new Error(error.message);
    } 
};

export const create = async (req, res,next) => {
    try {
        const  user  = req.body;
        const newUser = await manager.create(user);
        
        // const { firstName, LastName, email, password } = newUser;

        // if(!firstName || !LastName || !email || !password) {
        //     throw new Error('Missing fields');
        // };
        res.status(200).send({message: 'success', payload: newUser});
        
    } catch (error) {
        console.log(error.message);
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

    } catch (error) {
        res.status(500).send({message: 'error', error: error.message});
        next(error);
        throw new Error(error.message);
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

    } catch (error) {
        res.status(500).send({message: 'error', error: error.message});
        next(error);
        throw new Error(error.message);
    }
};

