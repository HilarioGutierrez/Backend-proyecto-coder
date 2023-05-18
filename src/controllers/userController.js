import userManager from "../manager/userManager";

const manager = new userManager();

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

export const addOne = async (req, res,next) => {
    try {
        const { user } = req.body;
        const newUser = await manager.addOne(user);
        
        const { firstName, LastName, email, password } = newUser;

        if(!firstName || !LastName || !email || !password) {
            throw new Error('Missing fields');
        };
        res.status(200).send({message: 'success', payload: newUser});
        
    } catch (error) {
        res.status(500).send({message: 'error', error: error.message});
        next(error);
        throw new Error(error.message);
    }
};

export const getAll = async (req, res,next) => {
    try {
        const users = await manager.getAll();
        res.status(200).send({message: 'success', payload: users});
    
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

export const updateOne = async (req, res,next) => {
    try {
        const { email } = req.params;
        const { user } = req.body;

        if(!email) {
            res.status(404).send({message: 'User not found'});
            throw new Error('Missing fields');
        }
        await manager.updateOne(email, user);
        const updatedUser = await manager.getOne(email);
        res.status(200).send({message: 'success', payload: updatedUser });

    } catch (error) {
        res.status(500).send({message: 'error', error: error.message});
        next(error);
        throw new Error(error.message);
    }
};