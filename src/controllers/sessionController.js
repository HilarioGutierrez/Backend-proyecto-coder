import userManager from "../manager/userManager.js";
import bcrypt from 'bcrypt';
const manager = new userManager();

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await manager.getOneByEmail(email);
        const isHashedPassword =  await bcrypt.compare(password, user.password); // compara constraseña encriptada con la que se envia en el body
        if((isHashedPassword) && (user.email === email)) {
            req.session.user = { email };
            //req.session.admin = true;
            res.status(200).send({message: 'success', payload: {...user, password: '********'}});
        } else {
            res.status(401).send({message: 'error', error: 'Invalid credentials'});
        }
    } catch (error) {
        res.status(500).send({message: 'error', error: error.message});
        console.log({error: error.message});
        throw new Error(error.message);
    } 
};

export const logout = async (req, res) => {
    try {
        req.session.destroy(err =>{
            if(!err){
                res.status(200).send({message: 'Logout ok!'});
            }
            res.status(500).send({message: 'error', error: err.message});
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const singup = async (req, res) => {
    try {
        const  user  = req.body;

        const payload = {...user, password: await bcrypt.hash(user.password, 10)}; // encripta la contraseña

        const newUser = await manager.create(payload);
        res.status(200).send({message: 'success', user: newUser});

    } catch (error) {
        console.log(error);
        
    }
};