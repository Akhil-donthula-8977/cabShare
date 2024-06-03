import mongoose, { Schema, Document } from 'mongoose';

// Define interface for User document
export interface User extends Document {
  userName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  connectedUsers: mongoose.Types.ObjectId[];
  joinedRooms: mongoose.Types.ObjectId[];
  socketID: string;
  password: string;
  premiumUser: boolean;
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
  joinedRooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  socketID: {
    type: String,
    default:""
  },
  password: {
    type: String,
    required: true,
    minlength: 4, // Minimum password length
    maxlength: 100, // Maximum password length
  },
  premiumUser: {
    type: Boolean,
    default: false,
  },
});

// Create and export the User model
const UserModel =mongoose.models.User || mongoose.model<User>('User', UserSchema,'User');
export default UserModel;
