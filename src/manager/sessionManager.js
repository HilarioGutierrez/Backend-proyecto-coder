import { generateToken } from "../utils/generateToken.js";
import { creatHash, isValidPassword } from "../utils/passwardHash.js";
import { singupValidation, userValidation } from "../validations/userValidation.js";
import userManager from "./userManager.js";

const manager = new userManager();

class sessionManager {

//en singup hacer dto y que user agregue el dto

async singup(user) {
    const dto = {...user, password: await creatHash(user.password,10)};
    userValidation.parse(dto);

    const newUser = await manager.create(dto);

    return newUser;
};

async login(userData){

    const { email, password } = userData;
    singupValidation.parse({ email, password });

    const user = await manager.getOneByEmail(email);
    const isHashedPassword = await isValidPassword(password,user.password); // compara constraseña encriptada con la que se envia en el body

    if(!isHashedPassword){
        return {message: 'error', error: 'Invalid credentials'};
    }
    const accessToken = await generateToken(user); // genera token de acceso JWT
    return {message: 'success', accessToken};
}

}

export default sessionManager;