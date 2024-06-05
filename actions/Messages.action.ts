"use server"
import io from 'socket.io-client';

//@ts-ignore
export const sendMessage =async (data) => {
    const socket = io();
    try {
        console.log(data)
       // socket.emit("sendMessage",{message:data})
       
       

    }
    catch (e){
        console.log(e)

}
}