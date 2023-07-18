import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { create } from '../presentation/controllers/ticketController.js';

dotenv.config();


export const nodemailerConfig = async (req, res, next) => {
    
    try {
        const { email, firstName } = req.user;
        
        const ticket = await create(req, res, next);
        const {code, purchaseDatetime, product, amount, purchaser } = ticket;
        
        const body = `
        <h1>Hola, ${firstName}!</h1>
        <br>
        <h3>Tu resumen de compra es el siguiente:</h3>
        <br>
        <p>Orden de compra: ${code}</p>
        <p>Fecha de compra: ${purchaseDatetime}</p>
        <p>Producto: ${product}</p>
        <p>cantidad total: ${amount}</p>
        <p>Comprador: ${purchaser}</p>
        <br>
        <p>Gracias por tu compra!</p>
        `   
        
        const transport = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const mail = await transport.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "subject",
            html:body ,
            attachments: []
        });

        res.status(200).json({ message: 'Mail sent successfully' });
    } catch (error) {
        next()
        throw new Error(error);
    }
}