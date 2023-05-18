import { Router } from "express";
import { login, logout, singup } from "../../controllers/sessionController.js";

const sessionRouter = Router();

sessionRouter.post('/login', login );
sessionRouter.post('/logout', logout );
sessionRouter.post('/singup', singup );

// sessionRouter.get('/', (req, res) => {

//     if(req.session.counter){
//         req.session.counter++
//         res.send({counter: req.session.counter});
//     }else{
//         req.session.counter = 1;
//         res.send({'Bienvenido': req.session.counter});

//     }
// });

// sessionRouter.post('/', (req, res) => {

// });

export default sessionRouter