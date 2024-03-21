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

const ForumModel = mongoose.models.forum || mongoose.model<IForum>('forum', forumSchema);

export default ForumModel;
