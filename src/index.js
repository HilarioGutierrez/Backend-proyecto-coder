import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AppExpress from './presentation/application/appExpress.js'

dotenv.config()


void (async () => 
{
  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) 
  
  const app = new AppExpress();
  
  app.init();
  app.build();
  app.listen();

})()





