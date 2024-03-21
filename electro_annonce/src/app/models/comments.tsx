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

const CommentModel = mongoose.models.comment || mongoose.model<IComment>('comment', commentSchema);

export default CommentModel;
