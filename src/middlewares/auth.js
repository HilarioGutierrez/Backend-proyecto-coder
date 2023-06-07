import jwt from "jsonwebtoken";

const auth = (req, res, next) =>
{
    const authHeader = req.headers.authorization;

    if (!authHeader)
    {
        return res.status(401).send({ message: 'Empty authentication header!'});
    }

    const token = authHeader.split(' ')[1]; // Bearer tokenString

    jwt.verify(token, process.env.PRIVATE_KEY, (error, credentials) =>{
        if(error) return res.status(403).send({ error: 'Authentication error'});

        const iatDate = new Date(credentials.iat * 1000);
        const iatFormated = `${iatDate.getDate()}/${iatDate.getMonth()}/${iatDate.getFullYear()} ${iatDate.getHours()}:${iatDate.getMinutes()}:${iatDate.getSeconds()}`;
        const expDate = new Date(credentials.exp * 1000);
        const expFormated = `${expDate.getDate()}/${expDate.getMonth()}/${expDate.getFullYear()} ${expDate.getHours()}:${expDate.getMinutes()}:${expDate.getSeconds()}`;

        const user = {
            ...credentials,
            iat: iatFormated,
            exp: expFormated,
        }
        req.user = user;
        next();
    });
}

export default auth;