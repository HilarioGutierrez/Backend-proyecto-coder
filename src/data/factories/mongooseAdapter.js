import mongoose from "mongoose";

class MongooseAdapter {
    constructor() {
        this.mongoose = mongoose;
    }
    
    async connect(uri) {
        await this.mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
    }
    
    async disconnect() {
        await this.mongoose.disconnect();
    }
    
}

export default MongooseAdapter;