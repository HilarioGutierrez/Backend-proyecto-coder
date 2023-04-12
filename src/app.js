import  express from "express";
import { engine } from "express-handlebars";
import { resolve } from "path";
import  { Server } from "socket.io";
import router from "./routes/index.js";
import productManager from "./classes/productManager.js";

const app = express();
//Port to listen
const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const view = resolve('src/views');

app.engine('handlebars', engine({
    layoutsDir: `${view}/layouts`,
    defaultLayout: `${view}/layouts/main.handlebars`,
}))

app.set('view engine', 'handlebars');
app.set('views', view);

app.use('/', router)

//Listen app(express) on port 8080. HTTP server
const httpServer = app.listen(PORT, () =>{console.log("Server running on port 8080")}) ;

const arrayProducts = new productManager();
const products = arrayProducts.getProducts();

//Socket.io
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
        console.log(`New client connected. ID: ${socket.id}`);

        socket.on('new-product', (data) => {
            console.log(data);
            arrayProducts.addProduct(data);
            socketServer.emit('listProducts', 
                arrayProducts.getProducts())
        })

        socket.on('delete-product', (data) => {
            console.log(data);
            arrayProducts.deleteProduct(data);
        })
});

export { socketServer };