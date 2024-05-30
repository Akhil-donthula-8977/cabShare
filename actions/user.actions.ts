"use server"

import { connectDatabase } from "@/lib/db"

export const getServer=async ()=>{
    try{
       await connectDatabase();
    }
    catch(e){

    }
}