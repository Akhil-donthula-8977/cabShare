"use client";
import WebSocketContext from "../context/WebsocketContext";
import { useState, useEffect, useRef, ReactNode, FC } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import { getuserSocketId, userSetSocketID } from "@/actions/user.actions";

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebsocketProvider: FC<WebSocketProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [socketId, setSocketId] = useState("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (session?.user?._id) {
      const socket = io();
      socketRef.current = socket;

      socket.on("connect", async () => {
        if(session.user==undefined)return;
        setSocketId(socket.id);
        if (session.user._id) {
          await userSetSocketID(socket.id, session.user._id);
          const cid = await getuserSocketId(session.user._id);
          console.log(cid);
        }
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [session?.user?._id]);

  return (
    <WebSocketContext.Provider value={{ instance: socketRef.current, id: socketId }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebsocketProvider;
