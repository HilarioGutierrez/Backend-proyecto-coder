import Role from "../../domain/entities/role.js";
import rolesSchema from "../models/rolesSchema.js";

class roleMongooseRepository {

    async paginate (criteria) {
        const { limit, page } = criteria;

        const roleDocuments = await rolesSchema.paginate({},{limit: limit, page: page});
        const { docs, ...pagination } = roleDocuments

        const role = docs.map(document => new Role (
            document._id,
            document.name,
            document.permissions,
        ))

        return {role, pagination};
    }

    async getOne (id) {
        try {
            const document = await rolesSchema.findOne({id: id});
            
            if(!document) {
                throw new Error('role not found')
            }
            
            return new Role(
                document._id,
                document.name,
                document.permissions
            )
        } catch (error) {
            console.log({error: error.message});
            throw new Error(error.message);
        }
    }

    
    async create (role) {
        try {
            const newrole = await rolesSchema.create(role);
            return new Role(
                newrole._id,
                newrole.name,
                newrole.permissions
            )
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
            const roleNew = new Role(
                role._id,
                role.name,
                role.permissions
            )

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

export default roleMongooseRepository;