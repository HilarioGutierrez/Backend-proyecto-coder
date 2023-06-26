import { Router } from "express";
import { nodemailerConfig } from "../../../config/nodemailer.config.js";

const mailRouter = new Router();

mailRouter.get('/', nodemailerConfig);

export default mailRouter;