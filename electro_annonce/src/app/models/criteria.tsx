import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICriteria extends Document {
    price_range: string;
    condition: string;
    wilaya: string;
    brand: string;
}

const criteriaSchema: Schema = new Schema({
    price_range: { type: String, required: true },
    condition: { type: String, required: true },
    wilaya: { type: String, required: true },
    brand: { type: String, required: true }
});

const Criteria: Model<ICriteria> = mongoose.model<ICriteria>('Criteria', criteriaSchema);

export default Criteria;
