import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import router from '../routes/index.js';

import errorHandler from '../middlewares/errorHandler.js';
import session from 'express-session';

import swaggerUiExpress from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


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

        this.app.use(session({
            secret: process.env.SECRET_KEY,
            resave: false,
            saveUninitialized: false,
        }))
    }

    build()
    {
        const swaggerOptions = {
            definition: {
                openapi: '3.0.1',
                info: {
                    title: 'API de Usuarios',
                    version: '1.0.0',
                    description: 'API para gestionar entidades de usuarios'
                }
            },
            apis: ['./docs/**/*.yaml'],
        };

        const spect = swaggerJSDoc(swaggerOptions);
        
        this.app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(spect));
        this.app.use('/', router);
        this.app.use(errorHandler)
    }
    
    close()
    {
        this.app.close();
    }

    listen()
    {
        this.server = this.app.listen(process.env.NODE_PORT, () => { console.log(`Server running on port ${process.env.NODE_PORT}`) 
    })

    return this.server;
    }

    callback()
    {
        return this.app;
    }
}    

export default AppExpress;



