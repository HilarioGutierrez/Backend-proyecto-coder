import { faker } from "@faker-js/faker";

export const generateUser = () => {
    return {
        firstName : faker.person.firstName() ,
        lastName : faker.person.lastName() ,
        email : faker.internet.email(),
        age : faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        password : faker.internet.password(),
        cart :faker.database.mongodbObjectId(),
        isAdmin : false
    }
};