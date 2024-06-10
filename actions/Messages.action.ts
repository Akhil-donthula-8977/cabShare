"use server"
import Message from "@/app/models/message";
import { connectDatabase } from "@/lib/db"
import { IMessage } from "@/app/models/message";
//@ts-ignore
export const sendMessage = async (body) => {
    try {
        await connectDatabase();
        delete body.direction;
        const message=new Message(body);
        await message.save();
        return JSON.parse(JSON.stringify(message));
    }
    catch (e) {
        console.log(e)

    }
}

export const getAllMessages = async (receiverId: string, ownerId: string) => {
    try {
        await connectDatabase();
        const messages: IMessage[] = await Message.find({
            $or: [
                { sender: ownerId, receiver: receiverId },
                { sender: receiverId, receiver: ownerId },
            ],
        }).sort({ sentTime: 1 }).lean();

        const updatedMessages = messages.map(message => ({
            ...message,
            direction: ownerId === message.sender ? "outgoing" : "incoming"
        }));

        console.log(updatedMessages);

        return JSON.parse(JSON.stringify(updatedMessages));
    } catch (e) {
        console.error(e);
        throw new Error('Failed to fetch messages');
    }
};