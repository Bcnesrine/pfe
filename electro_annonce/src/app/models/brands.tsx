import mongoose, { Schema, Document } from 'mongoose';

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

const BrandModel = mongoose.models.brands || mongoose.model<IBrand>('brands', brandSchema);



export default BrandModel;
