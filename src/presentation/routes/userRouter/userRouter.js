import { Router } from "express";
import {  create, deleteOne, getOne, list, updateOne } from "../../controllers/userController.js";
import auth from "../../middlewares/auth.js";
import authorization from "../../middlewares/authorization.js";
import { restartPassword } from "../../controllers/PasswordController.js";

const userRouter = new Router();

userRouter.get('/:email', auth, authorization('getUser'), getOne);

userRouter.get('/', auth, list);

userRouter.post('/', auth, create);

userRouter.put('/:email', auth, updateOne);

userRouter.delete('/:email', auth, deleteOne);

userRouter.post('/restartpassword', auth, restartPassword);

//userRouter.post('/:email/:role', authorization('addRole'), addRole); //hacer addRole que agregue el ID del roll al array de roles del usuario. verificando si el usuario es "admin" o no. si no es "admin" es "user"

export default userRouter