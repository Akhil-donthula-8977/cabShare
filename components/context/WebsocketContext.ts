// context/WebSocketContext.ts
import { createContext } from 'react';
import { Socket } from 'socket.io-client';

const WebSocketContext = createContext<{instance:Socket|null,id:string} | null>(null);

export default WebSocketContext;
