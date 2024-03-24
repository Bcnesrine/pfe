import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {

  date: Date;
  content: string;
  author: string;
}

const messageSchema: Schema = new Schema({

  date: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

const MessageModel = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

export default MessageModel;





