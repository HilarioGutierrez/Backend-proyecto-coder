import { Router } from "express";
import {  create, deleteOne, getOne, list, updateOne } from "../../controllers/roleController.js";
import auth from "../../middlewares/auth.js";
import authorization from "../../middlewares/authorization.js";

const roleRouter = new Router();

roleRouter.get('/', auth, authorization('getRoles'), list);

roleRouter.get('/:id', auth, authorization('getRole'), getOne);

roleRouter.post('/', auth, authorization('getRole'), create);

roleRouter.put('/:id', auth, authorization('getRole'), updateOne);

roleRouter.delete('/:id', auth, authorization('getRole'), deleteOne);

export default roleRouter