// import mongoose from "mongoose"
// const MONGODB_URI = process.env.MONGO_URL
// let cached = (global as any).mongoose || { conn: null, promise: null };
// export const connectDatabase = async () => {
//     if (cached.conn){
//         console.log("connected")
//         return cached.conn
//     } 
//     if (!MONGODB_URI) throw new Error("URI IS MISSING")
//     cached.promise = cached.promise ||await mongoose.connect(MONGODB_URI, {
//         dbName: "evently",
//         bufferCommands: false
//     })
//     cached.conn=await cached.promise
//     console.log("done")
//     console.log(MONGODB_URI)
//     return cached.conn

// }
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URL;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDatabase = async () => {
  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      console.log("New database connection established");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
