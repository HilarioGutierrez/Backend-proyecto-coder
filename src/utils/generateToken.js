import jwt from 'jsonwebtoken';

export const generateToken = async (user) => {

    return await jwt.sign({...user, password: undefined}, process.env.PRIVATE_KEY, {expiresIn: '1h'})
};