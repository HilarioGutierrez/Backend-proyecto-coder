import MongooseAdapter from "./mongooseAdapter.js";

class dbFactory{

    static create(dbType = 'MongooseAdapter'){
        const dbs = new Map();
        dbs.set('MongooseAdapter', MongooseAdapter);

        if(!dbs.has(dbType)){
            throw new Error(`db type ${dbType} is not supported`);
        }

        const db = dbs.get(dbType);
        return new db();
    }
}

export default dbFactory;