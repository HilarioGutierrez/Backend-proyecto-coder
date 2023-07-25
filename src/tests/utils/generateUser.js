import { faker } from "@faker-js/faker";
import User from "../../domain/entities/user.js";

export const generateUser = () => {
    const user = new User({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        age: 25 ,
        isAdmin: false,
        cart: null,
        permissions: [],
        password: faker.internet.password()
    });

    return user;
};