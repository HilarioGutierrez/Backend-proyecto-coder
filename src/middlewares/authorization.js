const authorization = (permissions) => {
    
    return (req, res, next) => {

        const user = req.user;

        if(!user && !user.permissions.includes(permissions)){
            return res.status(401).send({message: 'Unauthorized'});
        }

        next();
    }
}