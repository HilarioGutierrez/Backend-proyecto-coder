import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const ticketColeccion = 'tickets';

const ticketSchema = new Schema({
    code: {type: Schema.Types.String, required: true, unique: true},
    purchaseDatetime:{type: Schema.Types.Date, required: true},
    product:{type: Schema.Types.ObjectId, ref: 'products', required: true},
    purchaser:{type: Schema.Types.ObjectId, ref: 'users', required: true},
});

ticketSchema.plugin(mongoosePaginate);

export default mongoose.model(ticketColeccion, ticketSchema);