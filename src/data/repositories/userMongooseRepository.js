import userSchema from "../models/userSchema.js";
import { creatHash } from "../../domain/utils/passwardHash.js";
import { userCreateValidation } from "../../domain/validations/user/userCreateValidation.js";
import User from "../../domain/entities/user.js";

class userMongooseRepository {

    //paginate: filter for view users 
    async paginate (criteria) {
        const { limit, page } = criteria;

        const usersDocuments = await userSchema.paginate({},{limit: limit, page: page});
        const { docs, ...pagination } = usersDocuments

        const users= usersDocuments.docs.map(user => new User ({
            id:user._id.toString(),
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            age:user.age,
            cart:user.cart,
            roles:user.roles,
            isAdmin:user.isAdmin    
            })
        );
        
        return {users, pagination};
    }

    //Take one user by email and return
    async getOne (email) {
        try {
            const user = await userSchema.findOne({email: email});
            
            if(!user) {
                throw new Error('User not found')
            }
            
            return new User({
                id:user._id.toString(),
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                age:user.age,
                cart:user.cart,
                roles:user.roles,
                isAdmin:user.isAdmin    
            })
        } catch (error) {
            console.log({error: error.message});
            throw new Error(error.message);
        }
    }
    //Take one user by email but this resturn password
    async getOneByEmail (email) {
        try {
            const user = await userSchema.findOne({email: email});
            
            if(!user) {
                throw new Error('User not found')
            }
            
            return new User({
                id:user._id.toString(),
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                age:user.age,
                cart:user.cart,
                roles:user.roles,
                password:user.password,
                isAdmin:user.isAdmin    
            })
        } catch (error) {
            console.log({error: error.message});
            throw new Error(error.message);
        }
    }
    //Create one user
    async create (user) {
        try {
            const dto = {...user, password: await creatHash(user.password,10)};
            userCreateValidation.parse(dto);
            const newUser = await userSchema.create(dto);
            
                return new User({
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    age:user.age,
                    cart:user.cart,
                    roles:user.roles,
                    isAdmin:user.isAdmin    
                })

            }catch (error) {
            console.log({error: error.message});
        }
    }

    //Update one user. Can update everyone property
    async updateOne (email, data) {
        try {
            const user = await userSchema.findOneAndUpdate( {email: email}, data, {new: true} );

            if(!user) {
                throw new Error('User not found');
            }
            const userNew = new User({
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                age:user.age,
                cart:user.cart,
                roles:user.roles,
                isAdmin:user.isAdmin    
            })
            return userNew
            
        } catch (error) {
            console.log({error: error.message});
        }
    }
    //Delete one user
    async deleteOne (email) {
        try {
            const user = await userSchema.find({email: email});

            if(!user) {
                throw new Error('User not found') 
            } 
            await userSchema.deleteOne({email: email});

        } catch (error) {
            console.log({error: error.message});
        }
    }
}

export default userMongooseRepository;