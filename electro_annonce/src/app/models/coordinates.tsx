import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICoordinate extends Document {
    wilaya: string;
    commune: string;
    phone_numbers: string[];
    emails: string[];
}

const coordinateSchema: Schema = new Schema({
    wilaya: { type: String, required: true },
    commune: { type: String, required: true },
    phone_numbers: [{ type: String }],
    emails: [{ type: String }]
});

const CoordinateModel = mongoose.models.coordinate || mongoose.model<ICoordinate>('coordinate', coordinateSchema);

export default CoordinateModel;
