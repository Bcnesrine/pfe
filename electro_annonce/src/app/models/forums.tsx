import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IForum extends Document {
    subject: string;
    date: Date;
    participants: string[];
    messages: string[];
}

const forumSchema: Schema = new Schema({
    subject: { type: String, required: true },
    date: { type: Date, default: Date.now },
    participants: [{ type: String }],
    messages: [{ type: String }]
});

const Forum: Model<IForum> = mongoose.model<IForum>('Forum', forumSchema);

export default Forum;
