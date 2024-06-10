"use client";
import React, { useEffect, useContext } from "react";
import { getLocation } from "@/utils/locationUtils";
import { useToast } from "../ui/use-toast";
import WebSocketContext from "../context/WebsocketContext";
export default function ClientApplication() {
    const socketInstance = useContext(WebSocketContext)
    const { toast } = useToast();
    useEffect(() => {
        socketInstance?.instance?.on("requestAccepted", (data) => {
            // console.log(data)
            toast({
                title: "Your cabshare request has been accepted , have a check",
            })
        })
        let socket = socketInstance?.instance;
        if (!socket) return;
        console.log("effect run",socket.id)
        socket.on('requestNotification', (data) => {
            if (typeof toast === 'function') {
                console.log('Received request notification:', data);
                toast({
                    title: "You received a cabshare request ",
                })
            }
        });
    },[]);
    

    return null;
}