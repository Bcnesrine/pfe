import mongoose, { Document, Schema } from 'mongoose';

// Interface représentant les coordonnées
interface Coordinates {
    wilaya: string;
    commune: string;
    phone_numbers: string[];
    emails: string[];
}


interface UserDocument extends Document {
    user_id: string;
    username: string;
    email: string;
    sex: string;
    birthday: Date;
    creation_date: Date;
    type: string;
    profile_photo: string;
    coordinates: Coordinates;
}


const userSchema = new Schema<UserDocument>({
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    sex: { type: String, required: true },
    birthday: { type: Date, required: true },
    creation_date: { type: Date, default: Date.now },
    type: { type: String, required: true },
    profile_photo: { type: String, required: true },
    coordinates: {
        wilaya: { type: String, required: true },
        commune: { type: String, required: true },
        phone_numbers: [{ type: String, required: true }],
        emails: [{ type: String, required: true }]
    }
});


const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;