import mongoose, { Schema, Document, Model } from 'mongoose';

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

let Message: Model<IMessage>;

try {
  // Essaie de récupérer le modèle Message
  Message = mongoose.model<IMessage>('Message');
} catch (error) {
  // Si le modèle n'existe pas encore, le définit
  Message = mongoose.model<IMessage>('Message', messageSchema);
}

export default Message;

