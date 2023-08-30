import chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';
dotenv.config();

import { generateUser } from './utils/generateUser.js';
import initServer from './index.js';
import { UserLogin } from './utils/loginUser.js';

const expect = chai.expect; //guarda chai.expect en una variable expect.Chai es una libreria de asserts donde expect es un metodo que se usa para comparar valores. Utiliza cadena de texto.
let jwt = '';

describe('Testing User Endpoints', () => {
    before(async function () {
        const { app, db } = await initServer(); // inicia aplicacion y desestructura app y db. initServer es una funcion que se exporto de index.js. app es la aplicacion de express y db es la conexion a la base de datos
        const application = app.callback(); // callback devuelve express puro
        this.requester = supertest.agent(application); // crea un agente de supertest para hacer las peticiones
        this.app = app // guarda la app que se desestructuro de initServer
        this.db = db; // guarda la db que se desestructuro de initServer
    });

    
    it('Creacion de un Usuario /api/sessions/singup', function () { //test funcional
        const payload = generateUser(); // genera usuario. this.payload es para usarlo en otro it y poder hacer login con el usuario creado
        return this.requester 
        .post('/api/sessions/singup') //metodo post donde se hace el req
        .send(payload)// envia el payload
        .then(result => // espera el resultado
        {
             const {_body, status} = result; //desestructira el resultado en body y status
            expect(status).to.be.equals(201); //espera que el status sea 201
            expect(_body.newUser.email).to.be.equals(payload.email); //espera que el email delnuevo usuario sea igual al delpayload
        }
        );

    });

    it('Login de un Usuario /api/sessions/login', function () {
        const payload = UserLogin()
        return this.requester 
        .post('/api/sessions/login') //metodo post donde se hace el req
        .send(payload)// envia el payload
        .then(result => // espera el resultado
        {
            const {_body, status} = result; //desestructira el resultado en body y status

            expect(status).to.be.equals(200);
            expect(_body.email).to.be.equals(payload.email);
            jwt = _body.accessToken;
            
        }
        );
    });

    it('Current User /api/sessions/current', function () { //test funcional
        const payload = UserLogin(); // loguea usuario
        return this.requester
        .get('/api/sessions/current')
        .set('Authorization', `Bearer ${jwt}`) // setea el header con el auth jwt que se obtuvo en el login
        .then(result => {
            const { _body, status } = result; //desestructira el resultado en body y status
            expect(status).to.be.equals(200);
            expect(_body.user.email).to.be.equals(payload.email);
        })
    }); 
    
    
});