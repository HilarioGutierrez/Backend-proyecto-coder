import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import router from '../routes/index.js';

import errorHandler from '../middlewares/errorHandler.js';


dotenv.config()

class AppExpress 
{

    init()
    {
        this.app = express();
        //Create a new express application instance
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        //Cookies
        this.app.use(cookieParser(process.env.SECRET_KEY));
    }

    build()
    {
        this.app.use('/', router);
        this.app.use(errorHandler)
    }

    listen()
    {
        const server = this.app.listen(process.env.NODE_PORT, () => { console.log(`Server running on port ${process.env.NODE_PORT}`) 
    })

    return server;
    }
}

export default AppExpress;



