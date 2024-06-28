"use client";
import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import WebSocketContext from "@/components/context/WebsocketContext";
import { raleway } from "@/lib/fonts";
import { getAllMessages, sendMessage } from "@/actions/Messages.action";
import { getuserSocketId } from "@/actions/user.actions";
import { memo } from "react";

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

    socket.on("message", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          sentTime: new Date(data.sentTime),
          sender: data.sender,
          direction: data.sender === session?.user?._id ? "outgoing" : "incoming",
          type: "text",
          receiver: data.receiver,
        },
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket, session?.user?._id]);

  useEffect(() => {
    const fetchData = async () => {
      if (params.get("id") != null) {
        setParamSelect(false);
        const receiverId = params.get("id");
        const ownerId = session?.user?._id;

        if (ownerId && receiverId) {
          try {
            const getMessages = await getAllMessages(receiverId, ownerId);
            setMessages(getMessages || []);
          } catch (error) {
            console.error(error);
          }
        }

        const getSock = await getuserSocketId(receiverId);
        setActiveChat(getSock);
      } else {
        setParamSelect(true);
      }
    };

    fetchData();
  }, [params, session?.user?._id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && socket) {
      const messageData = {
        message: input,
        sentTime: new Date(),
        sender: session?.user?._id!,
        direction: "outgoing",
        type: "text",
        receiver: activeChat,
      };
      await sendMessage({ ...messageData, receiver: params.get("id") });
      setMessages((prevMessages) => [...prevMessages, messageData]);
      socket.emit("sendMessage", messageData);
      setInput("");
    }
  };

  const sortedMessages = messages.sort((a, b) => new Date(a.sentTime).getTime() - new Date(b.sentTime).getTime());

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto p-4">
        {sortedMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-2 ${msg.direction === "outgoing" ? "justify-end" : "justify-start"}`}
          >
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
            className={`ml-2 p-2 ${raleway.className} rounded ${paramsSelect ? 'bg-gray-400 text-gray-700' : 'bg-orange-500 text-white'}`}
            disabled={paramsSelect}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(MessageScreen);
