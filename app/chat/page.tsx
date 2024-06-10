"use client";
import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { getuserSocketId } from "@/actions/user.actions";
import WebSocketContext from "@/components/context/WebsocketContext";
import { raleway } from "@/lib/fonts";
const MessageScreen: React.FC = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [socketId, setSocketId] = useState<string>("");
  const [activeChat, setActiveChat] = useState("");
  const params = useSearchParams();
  const socket = useContext(WebSocketContext)?.instance;
  const [paramsSelect, setParamSelect] = useState<boolean>(true);
  useEffect(() => {
    if (!socket) return;

    // socket.on("connect", () => {
    //   console.log("Connected to server:", socket.id);
    // });

    socket.on("message", (data: { message: string; sender: string; receiver: string }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          sentTime: "just now",
          sender: data.sender,
          direction: data.sender === session?.user?._id ? "outgoing" : "incoming",
          type: "text",
          receiver: data.receiver,
        },
      ]);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, [socket, session?.user?._id]);

  useEffect(() => {
    if (params.get("id") != null) {
      async function fetchOpp() {
        setParamSelect(false);
        const receiverId = params.get("id");
        const getSock = await getuserSocketId(receiverId);
        console.log("opp socket", getSock);
        setActiveChat(getSock);
      }
      fetchOpp();
    }
    else {
      setParamSelect(true);
    }
  }, [params]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && socket) {
      const messageData = {
        message: input,
        sentTime: "just now",
        sender: session?.user?._id!,
        direction: "outgoing",
        type: "text",
        receiver: activeChat,
      };
      socket.emit("sendMessage", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.direction === "outgoing" ? "justify-end" : "justify-start"} mb-2`}>
            <div
              className={`p-2 rounded-lg ${raleway.className} ${msg.direction === "outgoing" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-gray-300">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            className={`flex-grow p-2 border rounded ${raleway.className}`}
            placeholder="Type message here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={paramsSelect}
          />
          <button
            type="submit"
            className={`ml-2 p-2 ${raleway.className} rounded ${paramsSelect ? 'bg-gray-400 text-gray-700' : 'bg-blue-500 text-white'
              }`}
            disabled={paramsSelect}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageScreen;
