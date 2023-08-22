import userManager from "../../domain/manager/userManager.js";
import { nodemailerForgotPassword } from "../../domain/utils/nodemailerForgotPassword.js";
import { generateToken } from "../../domain/utils/generateToken.js";
import { creatHash } from "../../domain/utils/passwardHash.js";
import jwt from "jsonwebtoken";

export const restartPassword = async (req, res) => {
    try {
        const manager = new userManager();

        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        if (newPassword !== confirmPassword) {
            res.status(400).send({message: 'error', error: 'passwords do not match'});
        }

        const passwardHash = await creatHash(newPassword);

        await manager.updatePassword(req.user.email, {password: passwardHash});
        res.status(200).send({message: 'success', UserPassUpdate: req.user.email});

    } catch (error) {
        throw new Error(error);
    }
}

export const forgotPassword = async (req, res) => {
try {
    
    const manager = new userManager();

    const user = await manager.getOne(req.body.email); //busca el usuario por email

    if(!user) {
        res.status(400).send({message: 'error', error: 'user not found'});
    }

    const forgotPasswordToken =  generateToken() //Si existe el usuario, genera un token

    const mail = await nodemailerForgotPassword(forgotPasswordToken, user.firstName) //Envia token por mail mediante un link para cambiar la contraseña

    res.status(200).send({message: 'success'});
} catch (error) {
    res.status(500).send({message: 'error', error: error});
}

}

export const renderFormPassword = async (req, res) => {
    try {
        const token = req.query.token;
        
        jwt.verify(token, process.env.PRIVATE_KEY, (error, credentials) =>{
            if(error) return res.status(403).render('notAuth')
        });
        
        res.render('formPassword');

    } catch (error) {
        error
    }
}

export const changePassword = async (req, res) => {
        
    try {
        const newPassword = req.body.newPass
        const confirmPassword = req.body.confirmPassword;

        if (newPassword !== confirmPassword) {
            res.status(400).send({message: 'error', error: 'passwords do not match'});
        }

        const passwardHash = await creatHash(newPassword);

        const manager = new userManager();
        const updatePassword = await manager.updatePassword(req.user.email, {password: passwardHash});

        res.status(200).send({message: 'success', UserPassUpdate: req.user.email})
        
    } catch (error) {
        
    }
;
}