import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IComment extends Document {
    user_id: string;
    description: string;
    note: number;
    date: Date;
}

const commentSchema: Schema = new Schema({
    user_id: { type: String, required: true },
    description: { type: String, required: true },
    note: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Comment: Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
