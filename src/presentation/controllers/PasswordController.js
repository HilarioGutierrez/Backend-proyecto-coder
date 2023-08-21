import userManager from "../../domain/manager/userManager.js";
import { nodemailerForgotPassword } from "../../domain/utils/nodemailerForgotPassword.js";
import { generateToken } from "../../domain/utils/generateToken.js";
import { creatHash } from "../../domain/utils/passwardHash.js";
import jwt from "jsonwebtoken";
import emailManager from "../../domain/manager/emailManager.js";

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


//Mediante un link enviar un jwt.
//El jwt tiene que tener un tiempo de expiracion.
//El jwt hay que tomarlo por queryParam para confirmar que sea el que enviamos. 
//Si el jwt es correcto, se le permite al usuario cambiar la contraseña.
//Si el jwt es incorrecto, se le niega el acceso al usuario.
//Correcto --> Redirige a url con front para cambiar la contraseña. los inputs tienen que ser password y confirm password. Estos al confirmar deben modificar pass en DB.
}

export const changePassword = async (req, res) => {
    try {
        const manager = new emailManager();
        const token = req.query.token;
        
        jwt.verify(token, process.env.PRIVATE_KEY, (error, credentials) =>{
            if(error) return res.status(403).send({ error: 'Authentication error'})
        });
        
        const email = manager.send('formPassword.hbs');
        


        // const newPassword = req.body.newPassword;
        // const confirmPassword = req.body.confirmPassword;

    } catch (error) {
        error
    }
}