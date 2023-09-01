import { Router } from 'express'
import productManager from '../../../domain/manager/productManager.js'
// import { socketServer } from '../../app.js'

const realTimeProductsRouter = Router()
const manager = new productManager()

realTimeProductsRouter.get('/', async (req, res) => {
  try {
    const listRpoducts = await manager.find({status: true, limit:10, page:2})
    res.render('realTimeProducts', { products: listRpoducts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default realTimeProductsRouter
