import dotenv from 'dotenv';
dotenv.config();

import { createContainer, asClass, Lifetime } from 'awilix';
import userMongooseRepository from '../data/repositories/userMongooseRepository.js';
import roleMongooseRepository from '../data/repositories/roleMongooseRepository.js';
import productsMongooseRepository from '../data/repositories/productsMongooseRepository.js';
import cartMongooseRepository from '../data/repositories/cartsMongooseRepository.js';

const container = createContainer();

container.register('userRepository', asClass(userMongooseRepository), { lifetime: Lifetime.SINGLETON });
container.register('roleRepository', asClass(roleMongooseRepository), { lifetime: Lifetime.SINGLETON });
container.register('cartRepository', asClass(cartMongooseRepository), { lifetime: Lifetime.SINGLETON });
container.register('productsRepository', asClass(productsMongooseRepository), { lifetime: Lifetime.SINGLETON });


export default container;