import chai from 'chai';
import { faker } from "@faker-js/faker";

import dotenv from 'dotenv';
dotenv.config();

import dbFactory from '../data/factories/dbFactory.js';
import userMongooseRepository from '../data/repositories/userMongooseRepository.js';
import appFactory from '../presentation/factories/appFactory.js';
import User from '../domain/entities/user.js';

const expect = chai.expect;

const db = dbFactory.create(process.env.DB);
const app = appFactory.create(process.env.APPLICATION);


describe('Testing userMongooseRepository', () => {
    before(function () {
        app.init();
        this.userRepository = new userMongooseRepository();
    });
    after(function () {
        db.disconnect();
    });
    beforeEach(function () {
        this.timeout(50000);
    });
    
    it('El repositorio debe ser una instancia de UserMongooseRepository', function () {
        expect(this.userRepository instanceof userMongooseRepository).to.be.ok;
    });
    // it('El repositorio debe devolver un arreglo', function () {
    //     return this.userRepository
    //         .paginate({ limit: 5, page: 1 })
    //         .then(result =>
    //         {
    //             expect(Array.isArray(result.user)).to.be.equals(true);
    //             expect(result.pagination.limit).to.be.equals(5);
    //         }
    //     );
    // });

    it('El repositorio debe poder crear un user', async function () {
        const user = {
            firstName: "Hilario",
            lastName: "Gutierrez",
            email: "Hialrio@gmail.com",
            age: 28,
            password: "12345678",
            isAdmin: false,
        };
    
        try {
            const result = await this.userRepository.create(user);
            console.log('result', user);
            // Realiza las expectativas aquí para verificar el resultado
            expect(result.firstName).to.be.equals(user.firstName);
        } catch (error) {
            // Si hay un error, imprímelo para obtener más información
            console.error(error);
            // Lanza el error para que la prueba falle explícitamente
            throw error;
        }
    });
    
    
});