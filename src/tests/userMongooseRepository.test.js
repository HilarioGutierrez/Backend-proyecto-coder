import chai from 'chai';

import dotenv from 'dotenv';
dotenv.config();

import dbFactory from '../data/factories/dbFactory.js';
import userMongooseRepository from '../data/repositories/userMongooseRepository.js';
import appFactory from '../presentation/factories/appFactory.js';
import { generateUser } from '../domain/utils/generateUser.js';

const expect = chai.expect;

const db = dbFactory.create(process.env.DB);
const app = appFactory.create(process.env.APPLICATION);

describe('Testing userMongooseRepository', () => {
    before(function () {
        db.connect(process.env.MONGO_DB_URI);
        this.userRepository = new userMongooseRepository();
    });
    after(function () {
        db.disconnect();
    });
    
    it('El repositorio debe ser una instancia de UserMongooseRepository', function () {
        expect(this.userRepository instanceof userMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.userRepository.paginate({limit: 5, page: 1})
            .then(result =>
            {
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });

    it('El repositorio debe poder crear un user', async function () {
        const user = generateUser();
        const result = await this.userRepository.create(user);

        expect(result.firstName).to.be.equals(user.firstName);
    });
    
    
});