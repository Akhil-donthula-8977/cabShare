"use client"
import WebSocketContext from "../context/WebsocketContext"
import { useState, useEffect } from "react"
import React from 'react'
import { ReactNode } from "react"
import { io, Socket } from "socket.io-client";
import UserModel from "@/app/models/User"
import { useSession } from "next-auth/react"
import socketIdContext from "../context/socketIdContext"

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebsocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const { data: session, status } = useSession()
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const [socketId, setSocketId] = useState("");
  
  useEffect(() => {
    const socketInstanced = io();// Ensure this URL matches your server
    setSocketInstance(socketInstanced);

    socketInstanced?.on("connect", () => {
      console.log(socketInstanced?.id);
      //@ts-ignore
      setSocketId(socketInstanced?.id );
    });

    // Cleanup function
    return () => {
      if (socketInstanced) {
        socketInstanced.disconnect();
      }
    };
  }, [])
  
  return (
    <WebSocketContext.Provider value={{ instance: socketInstance, id: socketId }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export default WebsocketProvider;
