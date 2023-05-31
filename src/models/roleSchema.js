import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const roleSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    permissions: [{ type: Schema.Types.String, required: true }],
});

roleSchema.plugin(mongoosePaginate);

export default mongoose.model('roles', roleSchema);