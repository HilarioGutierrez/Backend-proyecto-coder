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
const socket = new Server(httpServer);

socket.on('connection', (socket) => {
        console.log(`New client connected. ID: ${socket.id}`);
        socket.emit('listProducts', products);

    socket.on('newProduct', (data) => {
        products.push(data);
        socket.emit('listProducts', products.map((product) => product));
    });
    socket.on('deleteProduct', (data) => {
        products = products.filter((products) => products.name !== data.name);

        socket.emit('listProducts', products);
    });
});

export { socket };