import { Router } from "express";
import {  create, deleteOne, getOne, list, updateOne } from "../../controllers/userController.js";
import auth from "../../middlewares/auth.js";
import authorization from "../../middlewares/authorization.js";

const userRouter = new Router();

userRouter.get('/:email', auth, authorization('getUser'), getOne);

userRouter.get('/', auth, authorization('getUsers'), list);

userRouter.post('/', auth,authorization('createUser'), create);

userRouter.put('/:email', auth, authorization('updateUser'), updateOne);

userRouter.delete('/:email', auth, authorization('deleteUser'), deleteOne);

export default userRouter