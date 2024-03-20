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

const Coordinate: Model<ICoordinate> = mongoose.model<ICoordinate>('Coordinate', coordinateSchema);

export default Coordinate;
