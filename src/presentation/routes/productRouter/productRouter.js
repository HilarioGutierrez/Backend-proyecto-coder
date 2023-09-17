import { Router } from "express";
import { create, deleteOne, find, getOne, updateOne } from "../../controllers/productController.js";
import authorization from "../../middlewares/authorization.js";
import auth from "../../middlewares/auth.js"
const productRouter = Router();

//GET products from DB. Req.query limited the number of products to show
productRouter.get('/', find );

//GET products by ID from productManager
productRouter.get('/:pid', getOne );

//PUT products at productManager
productRouter.post('/', auth, authorization(), create );

//PUT products at productManager. Req.params.pid is the id of the product to update
productRouter.put('/:pid', auth, authorization(), updateOne);

//DELETE products at productManager. Req.params.pid is the id of the product to delete
productRouter.delete('/:pid', auth, authorization(), deleteOne)


export default productRouter;
