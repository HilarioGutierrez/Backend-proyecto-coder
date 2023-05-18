import userSchema from "../models/userSchema";

class userMongooseDao{

    async getOne (email) {
        try {
            const user = await userSchema.findOne({email: email});
            return{
                firstName: user.firstName,
                LastName: user.LastName,
                email: user.email,
            }
        } catch (error) {
            console.log({error: error.message});
            throw new Error(error.message);
        }
    }

    async addOne (user) {
        try {
            const newUser = await userSchema.create(user);
            return {
                NewUser: `Bienvenido ${newUser.firstName} ${newUser.LastName}`};
        } catch (error) {
            console.log({error: error.message});
        }
    }

    async getAll () {
        try {
            const users = await userSchema.find();
            return {
                users: users.map((user) => {
                    return {
                        firstName: user.firstName,
                        LastName: user.LastName,
                        email: user.email,
                    }
                })
            };
        } catch (error) {
            console.log({error: error.message});
            throw new Error(error.message);
        }
    }

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

    async updateOne (email, data) {
        try {
            const user = userSchema.findOneAndUpdate({email: email},data);
            return user
        } catch (error) {
            console.log({error: error.message});
        }
    }
}

export default userMongooseDao;