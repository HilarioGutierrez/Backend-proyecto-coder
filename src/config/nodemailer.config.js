import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


export const nodemailerConfig = async (req, res, next) => {
    
    try {
        const { to, subject,name } = req.body;
        
        const body =     `
        <h1>Hi ${name}</h1>
        <br>
        <h3>Este es un mensaje de prueba enviado desde el codigo pegandole a un endpoint.</h3>
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

        await transport.sendMail({
            from: process.env.MAIL_USER,
            to: to,
            subject: subject,
            html:body ,
            attachments: []
        });

        res.status(200).json({ message: 'Mail sent successfully' });
    } catch (error) {
        // Manejar el error
    }
}