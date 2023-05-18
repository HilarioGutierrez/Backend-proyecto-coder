import { Router } from "express";

const sessionRouter = Router();

sessionRouter.get('/', (req, res) => {

    if(req.session.counter){
        req.session.counter++
        res.send({counter: req.session.counter});
    }else{
        req.session.counter = 1;
        res.send({'Bienvenido': req.session.counter});

    }
});

sessionRouter.post('/', (req, res) => {

});

export default sessionRouter