import express  from "express";
import { engine } from "express-handlebars";
import { resolve } from "path";
import { Server } from "socket.io";
import fs from "fs/promises";

const handlebars = (async ()=>{
    try {
        const SERVER_PORT = 8083;
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        
        const products = await fs.readFile('./src/db/product.json', 'utf-8');
        const productArray = JSON.parse(products);

        const view = resolve('src/views');
        
        app.engine('handlebars', engine({
            layoutsDir: `${view}/layouts`,
            defaultLayout: `${view}/layouts/main.handlebars`,
        }))
        
        app.set('view engine', 'handlebars');
        app.set('views', view);
        
        app.get('/', (req, res) => {
            res.render('home', {products: productArray});
        })

        app.get('/realtimeproducts', (req, res) => {
            
        })

        const httpServer = app.listen(SERVER_PORT, () => {console.log(`Server running on port ${SERVER_PORT}`)});
        









        //se instancia el servidor de socket en base del servidor de express
        //const socketServer = new Server(httpServer)
        //forma de hacer el handshake
        // socketServer.on('connection', (socket) => {
        //     console.log('Nuevo cliente conectado');

        //     socket.on('message', (data) => {
        //         console.log(data);
        //     })
        //     //emit emite el evento "evento_para_socket_individual" al socket que se conecto
        //     socket.emit('evento_para_socket_individual', 'Este es un mensaje solo lo debe recibir el socket que se conecto')
        //     //on escucha el evento "ChatRoom1" y retransmite la data a todos los sockets conectados
        //     socket.on('ChatRoom1', (data) => {
        //         console.log(data);
        //         socket.broadcast.emit('ChatRoom1', data)
        //     })
        //     //brodcast para retransmitir la data a todos los sockets conectados
        //     socket.broadcast.emit('evento_para_todos_los_sockets', 'Este evento los veran todos los socket conectados MENOS el socket actual desde el que se envio el mensaje')

            
        //     socketServer.emit('evento_para_todos', 'Este mensaje lo reciben todos los sockets conectados')

        //})


    } catch (error) {
        
    }
})

()

export default handlebars;