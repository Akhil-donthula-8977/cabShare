"use server"
import { connectDatabase } from "@/lib/db"
import UserModel from "@/app/models/User"
import mongoose from "mongoose"
import ShareTransportRequest from './path/to/ShareTransportRequestModel'; // Adjust the path as per your file structure

import { formToJSON } from "axios"
import { revalidatePath } from "next/cache";
export const handleError = (error: unknown) => {
    console.error(error)
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}
export const getServer = async () => {
    try {
        await connectDatabase();
    }
    catch (e) {

    }
}

export const AddUser = async (fromData: {
    email: string,
    password: string,
    phoneNumber: string,
    gender: string,
    userName:string
}) => {
    try {
        console.log(fromData)
        await connectDatabase();
        const userdata = new UserModel(fromData)
        await UserModel.create(fromData);
        console.log(userdata)
        return JSON.parse(JSON.stringify({"message":"user Saved successfully"}))
    }
    catch (error) {
        console.log(error)
        if (error instanceof mongoose.Error.ValidationError) {
            const errors = Object.keys(error.errors).map(key => ({
              field: key,
              //@ts-ignore
              message: error.errors[key].message
            }));
            console.log(errors)
            return errors
          }
    }
}

export const  userSetSocketID=async (socketId:string,userId:string)=>{
    try{
    console.log(socketId,userId) 
    await UserModel.updateOne({_id:userId},{socketID:socketId});
    return;
    }
    catch(e){
        
    }
}


export const getuserSocketId=async(userId:string)=>{
    try{
      const socketId= await UserModel.findById(userId).select("socketID");
      return JSON.parse(JSON.stringify(socketId));
    }
    catch(e){

    }
}

export const sendShareRequest=async(owner:string,requestId:string,user:string)=>{
 try{
    if(owner==user)return;
    const updateOwner = {
        $addToSet: {
            requestsReceived:{ userRequested: user, requestId: requestId, status: "pending" }
        }
      };
  
    const options = { new: true, projection: ["socketID"] }
    const options2 = { upsert: true, new: true, projection: ["socketID"] };
    const updateUser={ $addToSet: {requestSent:requestId}}
    const update=await Promise.all(
        [await UserModel.findOneAndUpdate({_id:owner}, updateOwner,options2),
        await UserModel.updateOne({_id:user},updateUser)])
      
        return JSON.parse(JSON.stringify(update[0]));
 }
 catch(e){
    console.log(e);

 }
}


export const userRequests = async (id: string) => {
    try {
        await connectDatabase();
        const data = await UserModel.findById(id).populate({
            path: 'requestsReceived',
            populate: [
                { path: 'userRequested',model:'User',select:"userName email socketID"  },
            ]
        }).exec();
    console.log(data.requestsReceived[0]);
    return JSON.parse(JSON.stringify(data.requestsReceived))

        
    } catch(e) {
        console.error(e);
    }
}

export const userRequestAccept = async (userIdToRemove: string, owner: string) => {
    try {
      const updated = await UserModel.updateOne(
        { _id: owner },
        {
          $pull: { requestsReceived: { userRequested: userIdToRemove } }, // Remove documents where userRequested matches
          $addToSet: { connectedUsers: userIdToRemove }, // Add the user ID to connectedUsers
        }
      );
      revalidatePath("/"); 
      return JSON.stringify(updated); 
    } catch (e) {
      console.error("Error:", e);
      // Handle error if needed
    }
  };