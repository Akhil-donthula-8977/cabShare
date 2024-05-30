import mongoose, { Document, Schema } from 'mongoose';
interface IShareTransportRequest extends Document {
  name: string;
  numberOfPeople: number;
  anyone: boolean;
  split: boolean;
  startLocation: [number, number]; 
  endLocation: [number, number]; 
  date: Date;
}
const ShareTransportRequestSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'], 
    unique: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must be less than 50 characters long']
  },
  numberOfPeople: { 
    type: Number, 
    required: [true, 'Number of people is required'],
    min: [1, 'There must be at least 1 person'],
    max: [10, 'Number of people must be less than or equal to 10']
  },
  anyone: { 
    type: Boolean, 
    required: [true, 'Anyone field is required'] 
  },
  split: { 
    type: Boolean, 
    required: [true, 'Split field is required'] 
  },
  startLocation: {
    
      type: [Number],
      required: [true, 'Start coordinates are required'],
      validate: {
        validator: function(value: [number, number]) {
          return value.length === 2;
        },
        message: 'Start coordinates must have two elements [longitude, latitude]'
      }
  },
  endLocation: {
      type: [Number],
      required: [true, 'End coordinates are required'],
      validate: {
        validator: function(value: [number, number]) {
          return value.length === 2;
        },
        message: 'End coordinates must have two elements [longitude, latitude]'
      }
  },
  date:{
    type:Date,
    required:[true,"date is mandatory"]
  }
});
ShareTransportRequestSchema.index({ startLocation: '2dsphere' });
ShareTransportRequestSchema.index({ endLocation: '2dsphere' });
ShareTransportRequestSchema.index({ date: 1 });
const ShareTransportRequest =mongoose.models.ShareTransportRequest|| mongoose.model<IShareTransportRequest>('ShareTransportRequest', ShareTransportRequestSchema,'ShareTransportRequest');

export default ShareTransportRequest;
