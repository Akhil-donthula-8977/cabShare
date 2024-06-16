
import mongoose, { Schema, Document, Types } from 'mongoose';

import ShareTransportRequest from './ShareTransportRequest';
interface RequestsReceived {
  userRequested: mongoose.Schema.Types.ObjectId;
  requestId: mongoose.Types.ObjectId;
  status: 'accepted' | 'rejected' | 'pending';
}

export interface User extends Document {
  userName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  connectedUsers: mongoose.Types.ObjectId[];
  requestsReceived: RequestsReceived[];
  socketID: string;
  password: string;
  premiumUser: boolean;
  requestSent: mongoose.Types.ObjectId[];
  activeRequests: mongoose.Schema.Types.ObjectId[];
}

// Define schema for User document
const UserSchema: Schema<User> = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^\d{10}$/, // Assuming a 10-digit phone number format
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  connectedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  requestsReceived: [{
    userRequested: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    requestId: { type: Schema.Types.ObjectId, required: true, ref:ShareTransportRequest },
    status: {
      type: String,
      enum: ['accepted', 'rejected', 'pending'],
      default: 'pending',
    },
  }],
  activeRequests: [{ type: Schema.Types.ObjectId, ref:ShareTransportRequest }],
  requestSent: [{ type: Schema.Types.ObjectId, ref:ShareTransportRequest }],
  socketID: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100, 
  },
  premiumUser: {
    type: Boolean,
    default: false,
  },
});


const UserModel = mongoose.models.User || mongoose.model<User>('User', UserSchema, 'User');
export default UserModel;
