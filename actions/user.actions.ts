"use server"
import { connectDatabase } from "@/lib/db"
import UserModel from "@/app/models/User"
import mongoose from "mongoose"
import { formToJSON } from "axios"
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