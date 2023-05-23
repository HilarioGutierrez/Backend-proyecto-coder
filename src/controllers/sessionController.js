import sessionManager from "../manager/sessionManager.js";
import userManager from "../manager/userManager.js";
import { generateToken } from "../utils/generateToken.js";
import { creatHash, isValidPassword } from "../utils/passwardHash.js";

const manager = new userManager();
const session = new sessionManager();
//Login user. Compare password and email. Password is encrypted.
export const login = async (req, res, next) => {
    try {
        const userData = req.body;
        const data = await session.login(userData);
        
        res.cookie('token', data.accessToken, 
        {httpOnly: true,
        sameSite: 'none',
        secure: true})
        .status(200).send(data)
    } 
    catch (e) {
        next(e);
    } 
};

//Logout user. Destroy session.
export const logout = async (req, res, next) => {
    try {
        req.session.destroy(err =>{
            if(!err){
                res.status(200).send({message: 'Logout ok!'});
            }else{
                res.status(500).send({message: 'error', error: err.message});
            }
        });
    } 
    catch (e) {
        next(e);
    }
};

//Create user. Password is encrypted.
export const singup = async (req, res, next) => {
    try {
        const  user  = req.body;

        const newUser = await session.singup(user);
        res.status(200).send({message: 'success', newUser});

        if(!newUser){
            return res.status(400).send({message: 'error', error: 'User already exists or invalid data'});
        }
    } 
    catch (e) {
        next(e);
        
    }
};