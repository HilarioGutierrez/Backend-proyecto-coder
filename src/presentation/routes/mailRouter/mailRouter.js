import { Router } from "express";
import { nodemailerConfig } from "../../../config/nodemailer.config.js";
import { sendMailTicket } from "../../../shared/sendMailTicket.js";
import auth from "../../middlewares/auth.js";

const mailRouter = new Router();

mailRouter.get('/:cid',auth, nodemailerConfig);

export default mailRouter;