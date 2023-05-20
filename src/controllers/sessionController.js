import userManager from "../manager/userManager.js";
import { creatHash, isValidPassword } from "../utils/passwardHash.js";

const manager = new userManager();

//Login user. Compare password and email. Password is encrypted.
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email && !password) {
        throw new Error('Email and Password invalid format.');
    }

        const user = await manager.getOneByEmail(email);
        const isHashedPassword = await isValidPassword(password,user.password); // compara constraseña encriptada con la que se envia en el body

        if(!isHashedPassword){
            res.status(401).send({message: 'error', error: 'Invalid credentials'});
        }else{
            req.session.user = { user: user.email };
            res.status(200).send({message: 'success', payload: {...user, password:undefined}});
        }
        

    } catch (error) {
        res.status(500).send({message: 'error', error: error.message});
        throw new Error(error.message);
    } 
};

//Logout user. Destroy session.
export const logout = async (req, res) => {
    try {
        req.session.destroy(err =>{
            if(!err){
                res.status(200).send({message: 'Logout ok!'});
            }else{

                res.status(500).send({message: 'error', error: err.message});
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};

//Create user. Password is encrypted.
export const singup = async (req, res) => {
    try {
        const  user  = req.body;

        const payload = {...user, password: await creatHash(user.password)}; // encripta la contraseña

        const newUser = await manager.create(payload);

        if (!newUser) {
            res.status(500).send({message: 'error', error: 'Error creating user'});
        }
        res.status(200).send({message: 'success', user: newUser});

    } catch (error) {
        console.log(error);
        
    }
};