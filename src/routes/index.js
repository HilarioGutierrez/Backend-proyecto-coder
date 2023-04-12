import { Router } from "express";
import homeProductRouter from "./homeProductsRouter/homeProductsRouter.js";
import realTimeProductsRouter from "./realTimeProductRouter/realTimeProductsRouter.js";
import productRouter from "./productRouter/productRouter.js";
import cartRouter from "./cartRouter/cartRouter.js";

const router = new Router();

router.use('/', homeProductRouter)
router.use('/realtimeproducts', realTimeProductsRouter)
router.use('/api/products', productRouter);
router.use('/api/carts',cartRouter)

export default router;