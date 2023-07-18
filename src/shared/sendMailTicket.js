import { nodemailerConfig } from "../config/nodemailer.config.js"

export const sendMailTicket = (ticket) => {
    const nodemailer = nodemailerConfig();

    console.log(nodemailer);


}