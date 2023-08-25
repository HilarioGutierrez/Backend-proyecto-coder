import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const nodemailerForgotPassword = async (jwt, nameUser, email) => {
    try {
        const body = `
        <!DOCTYPE html>
        <html lang="es">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cambio de Contraseña</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #121212; /* Cambio de darkgray a #121212 para un fondo más oscuro */
                    color: #ffffff; /* Cambio de color de fuente a blanco */
                    padding: 20px;
                }
        
                .container {
                    background-color: #1f1f1f; /* Cambio de background-color a un gris más oscuro */
                    border-radius: 5px;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }
        
                .btn-primary {
                    background-color: #007bff;
                    border-color: #007bff;
                }
        
                .btn-primary:hover {
                    background-color: #0056b3;
                    border-color: #0056b3;
                }
        
                a {
                    color: #ffffff; /* Cambio de color del enlace a blanco */
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <h1>Hola ${nameUser}!</h1>
                <br>
                <h3>Para cambiar tu contraseña ingresa al siguiente link:</h3>
                <hr>
                <a href="${process.env.URL_FRONT}api/sessions/change-password?token=${jwt}&email=${email}"
                    class="btn btn-primary">Recuperar Contraseña</a>
                <br>
                <br>
                <p>Gracias!</p>
            </div>
        </body>
        
        </html>
        
            `;

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "d6b879f08a8edf",
        pass: "2b62b43769294b",
        },
    });

    const mail = await transport.sendMail({
        from: process.env.MAIL_USER,
        to: "72aeaeb2ce-935582+1@inbox.mailtrap.io",
        subject: "Recupera tu contraseña",
        html: body,
        attachments: [],
    });
    } catch (error) {
    console.log(error);
    }
};
