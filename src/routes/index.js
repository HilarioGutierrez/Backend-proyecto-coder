import { Router } from 'express'
import homeProductRouter from './viewsRouter/homeProductsRouter.js'
import realTimeProductsRouter from './viewsRouter/realTimeProductsRouter.js'
import productRouter from './productRouter/productRouter.js'
import cartRouter from './cartRouter/cartRouter.js'
import cookieRouter from './cookieRouter/cookieRouter.js'
import sessionRouter from './sessionRouter/sessionRouter.js'
import userRouter from './userRouter/userRouter.js'

const router = Router()

router.use('/', homeProductRouter)
router.use('/realtimeproducts', realTimeProductsRouter)
router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/api/users', userRouter)
router.use('/api/cookies', cookieRouter)
router.use('/api/sessions', sessionRouter)

export default router
