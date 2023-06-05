import mongoose from 'mongoose'
import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import router from './routes/index.js';

import { resolve } from 'path'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './config/passport.config.js';


dotenv.config()
const app = express();

// Connect to MongoDB
void (async () => {
  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  //Create a new express application instance
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //Cookies
  app.use(cookieParser(process.env.SECRET_KEY));
  
  //Session
  app.use(session({
    store: MongoStore.create({ // Se crea la session en la base de datos
      mongoUrl: process.env.MONGO_DB_URI,
      ttl: 100
    }),
    secret: process.env.SECRET_KEY,
    resave: false, // permite mantener la session activa mientras la session este inactiva
    saveUninitialized: false, //permite guardar la sessin aunque el obj no tenga data
  }))
  
  //Passport
  initializePassport()
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Listen app(express) on port 8080. HTTP server
  const httpServer = app.listen(process.env.NODE_PORT, () => { console.log(`Server running on port ${process.env.NODE_PORT}`) })
})
()

app.use('/', router);

const handlebars = () => {

  const app = express();
  
  const view = resolve('src/views')
  app.engine('handlebars', engine({
      layoutsDir: `${view}/layouts`,
      defaultLayout: `${view}/layouts/main.handlebars`
  }))
  app.set('view engine', 'handlebars')
  app.set('views', view)
}
//handlebars()

const socket = () => {
  const manager = new productManager()

  // Socket.io
  const socketServer = new Server(httpServer)
  const get = manager.find()
  socketServer.on('connection', async (socket) => {
  console.log(`New client connected. ID: ${socket.id}`)

  socket.on('new-product', async (data) => {
  console.log('data')
  manager.addProduct(data)
  socketServer.emit('listProducts', await get)
  })

  socket.on('delete-product', async (data) => {
  manager.deleteProduct(data)
  socketServer.emit('listProducts', await get)
  })
})
}




