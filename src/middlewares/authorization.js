const authorization = (permissions) => {
    
    return (req, res, next) => {

        const user = req.user;

        if(!user.isAdmin || !user.permissions.includes(permissions)){
            return res.status(401).send({message: 'Unauthorized'});
        }

        next();
    }
}

export default authorization;