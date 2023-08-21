import nodemailer from "nodemailer";
import { resolve } from 'path';
import fs from "fs";
import Handlebars from 'handlebars';
import dotenv from "dotenv";

dotenv.config();

class emailManager {
    constructor() {
        this.smtp_config = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT ,
            secure: false,
        }

        
    }
    
    async send (templateFile){
        const transport = nodemailer.createTransport(this.smtp_config);

        const templatePath = resolve(`src/presentation/views/${templateFile}`);
        const source = fs.readFileSync(templatePath).toString();
        const template = Handlebars.compile(source);
        const html = template({
            name: 'John Doe',
        });
    
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.SMTP_MAIL,
            subject: 'Test FORGOT PASSWORD',
            html,
        }
        
        await transport.sendMail(mailOptions);
    }

}

export default emailManager;