import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBrand extends Document {
    brand_id: string;
    name: string;
    image: string;
}

const brandSchema: Schema = new Schema({
    brand_id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true }
});

const Brand: Model<IBrand> = mongoose.model<IBrand>('Brand', brandSchema);

export default Brand;
