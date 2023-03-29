import  express from "express";
import productRouter from "./routes/productRouter.js";
//Port to listen
const PORT = 8080;
const app = express();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRouter);


//Listen app(express) on port 8080
app.listen(PORT, () =>{console.log("Server running on port 8080")}) ;