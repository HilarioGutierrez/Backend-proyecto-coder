import mongoose, { Schema } from "mongoose";

const userCollection = 'users';

const userSchema = new Schema({

    firstName: { type: Schema.Types.String, required: true },
    LastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String,required: true },
});

export default mongoose.model(userCollection, userSchema);