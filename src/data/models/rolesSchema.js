import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const rolesColecction = 'roles';

const rolesSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    permissions: [{ type: Schema.Types.String, required: true }],
});

rolesSchema.plugin(mongoosePaginate);

export default mongoose.model(rolesColecction, rolesSchema);