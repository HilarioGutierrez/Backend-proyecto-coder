import { Router } from "express";
import {  create, deleteOne, getOne, list, updateOne } from "../../controllers/roleController.js";
import auth from "../../middlewares/auth.js";
import authorization from "../../middlewares/authorization.js";

const roleRouter = new Router();

roleRouter.get('/', auth, authorization('admin'), list);

roleRouter.get('/:id', auth, authorization('admin'), getOne);

roleRouter.post('/', auth, authorization('admin'), create);

roleRouter.put('/:id', auth, authorization('admin'), updateOne);

roleRouter.delete('/:id', auth, authorization('admin'), deleteOne);

export default roleRouter