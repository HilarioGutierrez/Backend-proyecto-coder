import jwt from 'jsonwebtoken';

export const generateToken =  (user) => {

    return jwt.sign({...user, password: undefined}, process.env.PRIVATE_KEY, {expiresIn: '1h'});
};