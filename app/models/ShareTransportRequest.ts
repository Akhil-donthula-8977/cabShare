// import mongoose, { Schema, Document } from 'mongoose';
// // Define the Coordinates type
// interface Coordinates {
//   type: string;
//   coordinates: [number, number];
// }
// // Define the FormData interface
// export interface IShareTransportRequest extends Document {
//   name: string;
//   numberOfPeople: number;
//   anyone: boolean;
//   male: boolean;
//   female: boolean;
//   split: boolean;
//   splitMoney: number;
//   startLocation: string;
//   endLocation: string;
//   date: string;
//   startLocationCoords: Coordinates;
//   endLocationCoords: Coordinates;
//   userOwner: mongoose.Schema.Types.ObjectId; 
// }

// const ShareTransportRequestSchema: Schema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   numberOfPeople: {
//     type: Number,
//     required: true,
//     min: [1, 'Number of people must be at least 1']
//   },
//   anyone: {
//     type: Boolean,
//     required: true
//   },
//   male: {
//     type: Boolean,
//     required: true
//   },
//   female: {
//     type: Boolean,
//     required: true
//   },
//   split: {
//     type: Boolean,
//     required: true
//   },
//   splitMoney: {
//     type: Number,
//     min: [0, 'Split money must be a non-negative number']
//   },
//   startLocation: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   endLocation: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   startLocationCoords: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       default:"Point"
//     },
//     coordinates: {
//       type: [Number],
//       required: true
//     }
//   },
//   endLocationCoords: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       default:"Point"
//     },
//     coordinates: {
//       type: [Number],
//       required: true

//     },
//   },
//    userOwner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User model
//     required: true,
//   }
// });
// // Export the model
// ShareTransportRequestSchema.index({ startLocationCoords: '2dsphere' });
// ShareTransportRequestSchema.index({ endLocationCoords: '2dsphere' });
// ShareTransportRequestSchema.index({ date: 1 });
// const ShareTransportRequest =mongoose.models.ShareTransportRequest|| mongoose.model<IShareTransportRequest>('ShareTransportRequest', ShareTransportRequestSchema,'ShareTransportRequest');
// export default ShareTransportRequest;
import mongoose, { Schema, Document } from 'mongoose';

// Define the Coordinates type
interface Coordinates {
  type: string;
  coordinates: [number, number];
}

// Define the FormData interface
export interface IShareTransportRequest extends Document {
  name: string;
  numberOfPeople: number;
  anyone: boolean;
  male: boolean;
  female: boolean;
  split: boolean;
  splitMoney: number;
  startLocation: string;
  endLocation: string;
  date: string;
  startLocationCoords: Coordinates;
  endLocationCoords: Coordinates;
  userOwner: mongoose.Schema.Types.ObjectId; 
}

const ShareTransportRequestSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: [1, 'Number of people must be at least 1']
  },
  anyone: {
    type: Boolean,
    required: true
  },
  male: {
    type: Boolean,
    required: true
  },
  female: {
    type: Boolean,
    required: true
  },
  split: {
    type: Boolean,
    required: true
  },
  splitMoney: {
    type: Number,
    min: [0, 'Split money must be a non-negative number']
  },
  startLocation: {
    type: String,
    required: true,
    trim: true
  },
  endLocation: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
  },
  startLocationCoords: {
    type: {
      type: String,
      enum: ['Point'],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  endLocationCoords: {
    type: {
      type: String,
      enum: ['Point'],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

// Export the model
ShareTransportRequestSchema.index({ startLocationCoords: '2dsphere' });
ShareTransportRequestSchema.index({ endLocationCoords: '2dsphere' });
ShareTransportRequestSchema.index({ date: 1 });

const ShareTransportRequest = mongoose.models.ShareTransportRequest || mongoose.model<IShareTransportRequest>('ShareTransportRequest', ShareTransportRequestSchema, 'ShareTransportRequest');
export default ShareTransportRequest;
