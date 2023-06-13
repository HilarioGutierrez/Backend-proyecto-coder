import mongoose from 'mongoose'
import dotenv from 'dotenv'
import appFactory from './presentation/factory/appFactory.js'

dotenv.config()


void (async () => 
{
  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) 
  
  const app = appFactory.create(process.env.APPLICATION);
  
  app.init();
  app.build();
  app.listen();

})()





