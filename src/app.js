import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { connectExpress, routers } from './middleware/index.js'

dotenv.config()

// Connect to MongoDB
void (async () => {
  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})
()

connectExpress();
routers();

