import { Router } from "express";

const cookieRouter = Router();


cookieRouter.post('/', (req, res) => {
    
    const {key, value, maxAge} = req.body;
    
    res.cookie(key, value, {maxAge , signed:true}).send({key, value, maxAge});
})


cookieRouter.get('/', (req, res) => {
    res.send(req.signedCookies);
});
export default cookieRouter;