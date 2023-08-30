// hacer test de delete getone y update de user

import chai from "chai";
import initServer from "./index.js";
import userManager from "../domain/manager/userManager.js";
import supertest from "supertest";
import { UserLogin } from "./utils/loginUser.js";
import { faker } from "@faker-js/faker";

const expect = chai.expect;
let jwt = "";

describe("User Tests", function () {
    
    before(async function () {
        const { app, db } = await initServer(); // inicia aplicacion y desestructura app y db. initServer es una funcion que se exporto de index.js. app es la aplicacion de express y db es la conexion a la base de datos
        const application = app.callback(); // callback devuelve express puro
        this.requester = supertest.agent(application); // crea un agente de supertest para hacer las peticiones
        this.app = app; // guarda la app que se desestructuro de initServer
        this.db = db; // guarda la db que se desestructuro de initServer
    });
    after(async function () {
        await this.db.disconnect();
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
            expect(result._body.email).to.be.equals(payload.email);
            jwt = _body.accessToken;
            
        }
        );
    });
    
    it("Update User", function () {
        const payload = {
            firstName: faker.person.firstName(),
            age:2222
        }
        return this.requester
        .put("/api/users/admin@mail.com")
        .set("Authorization", `Bearer ${jwt}`)
        .send(payload)
        .then((result) => {
            expect(result._body.payload.firstName).to.be.equals(payload.firstName);
            })
        });
});

