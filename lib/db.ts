import mongoose from "mongoose"
const MONGODB_URI = process.env.MONGO_URL
let cached = (global as any).mongoose || { conn: null, promise: null };
export const connectDatabase = async () => {
    if (cached.conn){
        console.log("connected")
        return cached.conn
    } 
    if (!MONGODB_URI) throw new Error("URI IS MISSING")
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: "evently",
        bufferCommands: false
    })
    cached.conn=await cached.promise
    console.log("done")
    return cached.conn

}