import sessionManager from "../../domain/manager/sessionManager.js";
import userManager from "../../domain/manager/userManager.js";

const manager = new userManager();
const session = new sessionManager();
//Login user. Compare password and email. Password is encrypted.
export const login = async (req, res, next) => {
    try {
        const userData = req.body;
        const data = await session.login(userData);
        
        res.cookie('userToken', data.data.accessToken, 
            {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            })
            .status(200).send(data)
    } 
    catch (e) {
        next(e);
    } 
};

//Logout user. Destroy session.
export const logout = async (req, res, next) => {
    try {
        const user = req.user.email
        req.session.destroy(err =>{
            if(!err){
                res.status(200).send({message: `Logout ${user}`});
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

export const current = async (req, res, next) => {

    try {
        res.status(200).send({message: 'success', user: req.user});
        next();
        
    } catch (e) {
        next(e);
    }
};

// export const login2 = async (req, res) =>
// {
//     if(!req.user) return res.status(400).send({ status: 'error', message: 'Invalid credentials'});

//     req.session.user = {
//     firstName: req.user.firstName,
//     lastName: req.user.lastName,
//     email: req.user.email,
//     };

//     res.send({ status: 'success', message: 'Login success'});
// }

// export const register = async (req, res) =>{
//     res.status(200).send({message: 'success', newUser: req.user})
// };

// export const fail = async (req, res) =>{
//     console.log('fail strategy');
//     res.status(400).send({message: 'error', error: 'Fail strategy'});
// };

// export const forgetPassword = async (req, res) =>{
//     try {
//         const { email, password } = req.body;

//         const dto = { email, password: await creatHash(password,10)};

//         const user = await manager.getOneByEmail(email);
//         const isHashedPassword = await isValidPassword(password,user.password);

//         const newUser = await manager.update(user.id, dto);

//         return res.status(200).send({message: 'success', newUser});
//     } catch (e) {
//         console.log(e);
//     }
// };