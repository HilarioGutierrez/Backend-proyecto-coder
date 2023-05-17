import express from 'express'
import { resolve } from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import router from '../routes/index.js'


export const connectExpress = () => {
    
    const app = express();
    const PORT = 8080;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Listen app(express) on port 8080. HTTP server
    const httpServer = app.listen(PORT, () => { console.log('Server running on port 8080') })

}

export const handlebars = () => {

    const app = express();
    
    const view = resolve('src/views')
    app.set('view engine', 'handlebars')
    app.set('views', view)
    app.engine('handlebars', engine({
        layoutsDir: `${view}/layouts`,
        defaultLayout: `${view}/layouts/main.handlebars`
    }))
}

export const socket = () => {
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

export const routers = () => {
    const app = express();
app.use('/', router);

}