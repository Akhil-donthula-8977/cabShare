import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMessage extends Document {
  message: string;
  sentTime: Date;
  sender: string;
  receiver: string;
  direction?:string
  type: string;
}

const MessageSchema: Schema = new Schema(
  {
    message: { type: String, required: true },
    sentTime: { type: Date, required: true, default: Date.now },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema,"Message");

export default Message;
