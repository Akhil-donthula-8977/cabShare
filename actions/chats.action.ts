"use server"
import UserModel from "@/app/models/User"
import { connectDatabase } from "@/lib/db";
export const usersConnected=async (id:string)=>{
    try{
        await connectDatabase();
        const connectedusers=await UserModel.findById(id)
        .select("connectedUsers")
        .populate({
            path:"connectedUsers",
            select:"_id userName"
        });
        console.log(connectedusers)
        return JSON.parse(JSON.stringify(connectedusers)) 
    }
    catch(e){
        //@ts-ignore
        throw new Error(e?.message)
    }
}