import userSchema from "../models/userSchema.js";

class userMongooseDao {

    //paginate: filter for view users 
    async paginate (criteria) {
        const { limit, page } = criteria;

        const users = await userSchema.paginate({},{limit: limit, page: page});
        users.docs= users.docs.map(user => {
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
                password: user.password

            }
        });
        return users;
    }

    //Take one user by email and return
    async getOne (email) {
        try {
            const user = await userSchema.findOne({email: email});
            
            if(!user) {
                throw new Error('User not found')
            }
            
            return{
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
                password: user.password
            }
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
            
            return{
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
                password: user.password
            }
        } catch (error) {
            console.log({error: error.message});
            throw new Error(error.message);
        }
    }
    //Create one user
    async create (user) {
        try {
            const newUser = await userSchema.create(user);
            return {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                age: newUser.age,
            }
        } catch (error) {
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
            const userNew = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
            }
            console.log({user: userNew});
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

export default userMongooseDao;