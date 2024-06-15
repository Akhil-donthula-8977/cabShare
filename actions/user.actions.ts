"use server"
import { connectDatabase } from "@/lib/db"
import UserModel from "@/app/models/User"
import mongoose from "mongoose"
import { redis } from "@/lib/redis"
// import ShareTransportRequest from './path/to/ShareTransportRequestModel'; // Adjust the path as per your file structure
import ShareTransportRequest from "@/app/models/ShareTransportRequest"
import { formToJSON } from "axios"
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
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
    userName: string
}) => {
    try {
        console.log(fromData)
        await connectDatabase();
        const userdata = new UserModel(fromData)
        await UserModel.create(fromData);
        console.log(userdata)
        return JSON.parse(JSON.stringify({ "message": "user Saved successfully" }))
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

export const userSetSocketID = async (socketId: string, userId: string) => {
    try {
        console.log(socketId, userId)
        const result = await redis.set(userId, socketId, 'EX', 3600);
        console.log(result)
        await UserModel.updateOne({ _id: userId }, { socketID: socketId });
        return;
    }
    catch (e) {

    }
}


export const getuserSocketId = async (userId: string) => {
    try {
        let check = null;
        const key = await redis.get(userId)
        return JSON.parse(JSON.stringify(key));
    }
    catch (e) {

    }
}

export const sendShareRequest = async (owner: string, requestId: string, user: string) => {
    try {
        if (owner == user) return;
        const updateOwner = {
            $addToSet: {
                requestsReceived: { userRequested: user, requestId: requestId, status: "pending" }
            }
        };

        const options = { new: true, projection: ["socketID"] }
        const options2 = { upsert: true, new: true, projection: ["socketID"] };
        const updateUser = { $addToSet: { requestSent: requestId } }
        const update = await Promise.all(
            [await UserModel.findOneAndUpdate({ _id: owner }, updateOwner, options2),
            await UserModel.updateOne({ _id: user }, updateUser)])
        const sockid = await getuserSocketId(update[0]._id);
        console.log("opp sockeyed", sockid)
        return JSON.parse(JSON.stringify({ _id: update[0]._id, socketID: sockid }));
    }
    catch (e) {
        console.log(e);

    }
}


export const userRequests = async (id: string) => {
    try {
        await connectDatabase();
        const data = await UserModel.findById(id)
            .populate({
                path: 'requestsReceived.userRequested',
                model: 'User',
                select: 'userName email socketID',
            })
            .populate({
                path: 'requestsReceived.requestId',
                model: 'ShareTransportRequest',
            })
            .exec();

        console.log("asdjaisfhiafhodi", data.requestsReceived);
        return JSON.parse(JSON.stringify(data.requestsReceived));
    } catch (e) {
        console.error(e);
    }
};

export const userRequestAccept = async (userIdToRemove: string, owner: string, reqid: string) => {
    try {
        await connectDatabase();
        console.log(owner._id)
        const updated = await UserModel.updateOne(
            { _id: owner },
            {
                $pull: { requestsReceived: { userRequested: userIdToRemove } },
                $addToSet: {
                    connectedUsers: userIdToRemove,
                    activeRequests: reqid
                }
            }
        );
        revalidatePath("/");
        return JSON.stringify(updated);
    } catch (e) {
        console.error("Error:", e);
        // Handle error if needed
    }
};

export const userActiveCabShares = async (id:string) => {
    try {
        await connectDatabase();
        // if(!id)throw new Error("null error")
        const actives = await UserModel.findById(id)
      .select("activeRequests")
      .populate({ path: "activeRequests", model: "ShareTransportRequest" });
      console.log(actives);
      return JSON.parse(JSON.stringify(actives.activeRequests));

      }
    catch (e) {
        throw new Error(e);

    }
}