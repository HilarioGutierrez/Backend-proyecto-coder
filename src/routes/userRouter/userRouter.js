import { Router } from "express";
import {  create, deleteOne, getOne, list, updateOne } from "../../controllers/userController.js";
import auth from "../../middlewares/auth.js";

const userRouter = new Router();

userRouter.get('/:email', getOne);

userRouter.get('/', list);

userRouter.post('/', auth, create);

userRouter.put('/:email', updateOne);

userRouter.delete('/:email', deleteOne);

export default userRouter