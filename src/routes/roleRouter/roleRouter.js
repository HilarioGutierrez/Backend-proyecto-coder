import { Router } from "express";
import {  create, deleteOne, getOne, list, updateOne } from "../../controllers/roleController.js";
import auth from "../../middlewares/auth.js";
import authorization from "../../middlewares/authorization.js";

const roleRouter = new Router();

roleRouter.get('/', auth, list);

roleRouter.get('/:id', auth, getOne);

roleRouter.post('/', auth, create);

roleRouter.put('/:id', auth, updateOne);

roleRouter.delete('/:id', auth, deleteOne);

export default roleRouter