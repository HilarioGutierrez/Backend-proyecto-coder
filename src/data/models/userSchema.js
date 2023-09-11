import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userCollection = 'users';

const userSchema = new Schema({

    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    age: { type: Schema.Types.Number, required: true },
    isAdmin: { type: Schema.Types.Boolean, required: true, default: false },
    cart: { type: Schema.Types.ObjectId, ref: 'carts'},
    permissions: [{ type: Schema.Types.ObjectId, ref: 'roles', index: true }],
    password: { type: Schema.Types.String,required: true },
    loginDate: { type: Schema.Types.Date, required: true, default: undefined}
});

userSchema.plugin(mongoosePaginate);

userSchema.pre('find', function(next) {
    this.populate('permissions');
    next();
});

userSchema.pre('findOne', function(next) {
    this.populate('permissions');
    next();
});

export default mongoose.model(userCollection, userSchema);