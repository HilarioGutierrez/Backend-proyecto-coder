import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userCollection = 'users';

const userSchema = new Schema({

    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    age: { type: Schema.Types.Number, required: true },
    password: { type: Schema.Types.String,required: true },
});

userSchema.plugin(mongoosePaginate);


export default mongoose.model(userCollection, userSchema);