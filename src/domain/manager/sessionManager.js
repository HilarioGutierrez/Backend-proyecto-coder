import { generateToken } from "../utils/generateToken.js";
import { creatHash, isValidPassword } from "../utils/passwardHash.js";
import { singupValidation } from "../validations/session/singupValidation.js";
import { userCreateValidation } from "../validations/user/userCreateValidation.js";
import userManager from "./userManager.js";

const manager = new userManager();

class sessionManager {

//en singup hacer dto y que user agregue el dto

async singup(user) {
    const dto = {...user, password: await creatHash(user.password,10)};
    userCreateValidation.parse(dto);

    const newUser = await manager.create(dto);

    return newUser;
};

async login(userData){

    const { email, password } = userData;
    singupValidation.parseAsync({ email, password });

    const user = await manager.getOneByEmail(email);
    const isHashedPassword = await isValidPassword(password,user.password); // compara constraseña encriptada con la que se envia en el body

    if(!isHashedPassword){
        return {message: 'error', error: 'Invalid credentials'};
    }
    const accessToken = generateToken(user); // genera token de acceso JWT
    const data = { ...user, password: undefined, accessToken}
    return {message: 'success',data};
}

}

export default sessionManager;