const authorization = () => {
    
    return (req, res, next) => {

        const user = req.user;

        if(!user.isAdmin){
            return res.status(401).send({message: 'Unauthorized'});
        }

        next();
    }
}

export default authorization;