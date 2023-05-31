import { Router } from 'express'
import { find } from '../../controllers/productController.js'

const homeProductRouter = Router()

homeProductRouter.get('/', async (req, res) => {
  try {
    
    const listRpoducts =  find
    res.render('homeProducts', { products: listRpoducts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
export default homeProductRouter
