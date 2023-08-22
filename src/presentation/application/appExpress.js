import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import router from '../routes/index.js';

import errorHandler from '../middlewares/errorHandler.js';
import session from 'express-session';

import swaggerUiExpress from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { addLogger } from '../../domain/utils/logger.js';

import handlebars from 'express-handlebars';


dotenv.config()

class AppExpress 
{

    init() {
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
        
        this.app.use(addLogger)
    }

    build() {
        this.app.use('/', router);
        this.app.use(errorHandler)
    }
    
    close() {
        this.app.close();
    }

    listen() {
        this.server = this.app.listen(process.env.NODE_PORT, () => { console.log(`Server running on port ${process.env.NODE_PORT}`) 
    })

    return this.server;
    }

    swagger (){
        const swaggerOptions = {
            definition: {
                openapi: '3.0.1',
                info: {
                    title: 'Ecommerce API',
                    version: '1.0.0',
                    description: 'Ecommerce API Information'
                }
            },
            apis: ['./docs/**/*.yaml'],
        };

        const spect = swaggerJSDoc(swaggerOptions);
        
        this.app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(spect));
    }

    handlebars() {
        this.app.engine('handlebars', handlebars.engine());
        this.app.set('views','./src/presentation/views');
        this.app.set('view engine', 'handlebars');
    }

    callback() {
        return this.app;
    }
    
}

export default AppExpress;



