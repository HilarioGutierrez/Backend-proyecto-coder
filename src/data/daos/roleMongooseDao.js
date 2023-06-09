import rolesSchema from "../models/rolesSchema.js";

class roleMongooseDao {

    async paginate (criteria) {
        const { limit, page } = criteria;

        const roles = await rolesSchema.paginate({},{limit: limit, page: page});
        roles.docs= roles.docs.map(role => {
            return {
                id: role?._id,
                firstName: role?.firstName,
                permissions: role?.permissions,
            }
        });
        return roles;
    }

    async getOne (id) {
        try {
            const role = await rolesSchema.findOne({id: id});
            
            if(!role) {
                throw new Error('role not found')
            }
            
            return{
                id: role?._id,
                firstName: role?.firstName,
                permissions: role?.permissions,
            }
        } catch (error) {
            console.log({error: error.message});
            throw new Error(error.message);
        }
    }

    
    async create (role) {
        try {
            const newrole = await rolesSchema.create(role);
            return {
                id: role?._id,
                firstName: role?.firstName,
                permissions: role?.permissions,
            }
        } catch (error) {
            console.log({error: error.message});
        }
    }


    async updateOne (id, data) {
        try {
            const role = await rolesSchema.findOneAndUpdate( {id: id}, data, {new: true} );

            if(!role) {
                throw new Error('role not found');
            }
            const roleNew = {
                id: role?._id,
                firstName: role?.firstName,
                permissions: role?.permissions,
            }
            return roleNew
        } catch (error) {
            console.log({error: error.message});
        }
    }


    async deleteOne (id) {
        try {
            await rolesSchema.deleteOne({_id: id});

        } catch (error) {
            console.log({error: error.message});
        }
    }
}

export default roleMongooseDao;