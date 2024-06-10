import mongoose, { Schema, model, Types, Document } from 'mongoose';

interface IMessage extends Document {
  message: string;
  sentTime: string;
  sender: mongoose.Schema.Types.ObjectId;
  type: string;
  receiver: mongoose.Schema.Types.ObjectId;
}


const messageSchema = new Schema<IMessage>({
  message: { type: String, required: true },
  sentTime: { type: String, required: true },
  sender: { type: Types.ObjectId, ref:'User', required: true }, 
  type: { type: String, required: true },
  receiver: { type: Types.ObjectId, ref:'User', required: true }, 
});

// Create and export Message model
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema,"Message");

export default Message;
