"use client";
import React, { useState, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { io } from "socket.io-client";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";

import { useContext } from "react";
import { sendMessage } from "@/actions/Messages.action";
import WebSocketContext from "@/components/context/WebsocketContext";
interface ChatMessage extends MessageModel {
  message: string;
  sentTime: string;
  sender: string;
  direction: "incoming" | "outgoing";
  receiver:string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const selfUserId="1"; // use session()
  const check=useContext(WebSocketContext)?.instance
  useEffect(() => {
   if(!check)return ;
   let socketInstance=check
   setSocket(check)
    socketInstance.on("connect", () => {
      console.log("Connected to server:", socketInstance.id);
    });
  
    socketInstance.on("message", (data: { message: string; sender: string }) => {
     //@ts-ignore
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          sentTime: "just now",
          sender: data.sender,
          direction: "incoming",
          type: "text",
        },
      ]);
    });
  }, []);

  const handleSendMessage =async () => {
    if (input.trim() && socket) {
      const messageData: ChatMessage = {
        message: input,
        sentTime: "just now",
        sender: "You",
        direction: "outgoing",
        type: "text",
        position:1,
        receiver:selfUserId
      };
     // socket.emit('sendMessage', { message: input, sender: "You" });
   //await sendMessage(input) 
     check?.emit("sendMessage",{ message: input, sender: "You" });
     setMessages((prevMessages) => [...prevMessages, messageData]);
      setInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, index) => (
              <div>
              <Message
                key={index}
                model={{
                  message: msg.message,
                  sentTime: msg.sentTime,
                  sender: msg.sender,
                  direction: msg.direction,
                  type: msg.type,
                  position:2
                }}
              />
              </div>
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            fancyScroll={true}
            value={input}
            onChange={(val) => setInput(val)}
            attachButton={false}
            onSend={handleSendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default App;
